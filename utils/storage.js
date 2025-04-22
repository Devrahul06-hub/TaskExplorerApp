import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error('Saving error', e);
  }
};

export const getTasks = async () => {
  try {
    const data = await AsyncStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Loading error', e);
    return [];
  }
};
