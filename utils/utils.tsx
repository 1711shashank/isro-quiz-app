import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocalStorage = async (key: string, value: any) => {
  try {
    const result = JSON.stringify(value);
    await AsyncStorage.setItem(key, result);
  } catch (error) {
    console.error(error);
  }
}

export const getLocalStorage = async (key: string) => {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      const value = JSON.parse(result);
      return value;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}