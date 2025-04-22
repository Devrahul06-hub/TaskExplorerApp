import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const DetailScreen = ({ route }) => {
  const [task, setTask] = useState(route.params.task);

  const toggleStatus = () => {
    setTask(prev => ({ ...prev, completed: !prev.completed }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>User ID: {task.userId}</Text>
      <Text>Status: {task.completed ? '✓ Completed' : '✗ Incomplete'}</Text>
      <Button title="Toggle Completion" onPress={toggleStatus} />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});
