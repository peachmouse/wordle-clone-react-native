import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

// Helper functions to mimic MMKV behavior with AsyncStorage
export const storage = {
  set: async (key: string, value: string | number | boolean) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  get: async (key: string): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  getBoolean: async (key: string): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : false;
    } catch (error) {
      console.error('Storage getBoolean error:', error);
      return false;
    }
  },

  setBoolean: async (key: string, value: boolean) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage setBoolean error:', error);
    }
  },

  delete: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage delete error:', error);
    }
  },
};

// Custom hook to replace useMMKVBoolean
export const useAsyncStorageBoolean = (key: string, defaultValue: boolean = false): [boolean, (value: boolean) => void] => {
  const [value, setValue] = useState<boolean>(defaultValue);

  useEffect(() => {
    const loadValue = async () => {
      const storedValue = await storage.getBoolean(key);
      setValue(storedValue !== null ? storedValue : defaultValue);
    };
    loadValue();
  }, [key, defaultValue]);

  const setStoredValue = async (newValue: boolean) => {
    setValue(newValue);
    await storage.setBoolean(key, newValue);
  };

  return [value, setStoredValue];
};
