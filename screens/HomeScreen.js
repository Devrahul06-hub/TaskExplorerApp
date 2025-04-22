import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FILTERS = ['All', 'Completed', 'Incomplete'];

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      setTasks(data);
      await AsyncStorage.setItem('tasks', JSON.stringify(data));
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
  });

  const toggleFilter = () => {
    const currentIndex = FILTERS.indexOf(filter);
    const nextIndex = (currentIndex + 1) % FILTERS.length;
    setFilter(FILTERS[nextIndex]);
  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error) return <View style={styles.center}><Text>Failed to fetch tasks.</Text><Button title="Retry" onPress={fetchTasks} /></View>;

  return (
    <View style={styles.container}>
      <Button title={`Filter: ${filter}`} onPress={toggleFilter} />
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Task Details', { task: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.completed ? '✓ Completed' : '✗ Incomplete'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, borderBottomWidth: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
