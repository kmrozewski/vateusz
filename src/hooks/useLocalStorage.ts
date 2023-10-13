import {useCallback, useState} from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const parse = useCallback((item: string, initialValue: T) => {
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      return initialValue;
    }
  }, []);

  const [stored, setStored] = useState<T>(() => {
    // Fixes issues with SSR
    if (typeof window === 'undefined') {
      return initialValue;
    }

    const item = window.localStorage.getItem(key) ?? '';

    if (item === '') {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }

    return parse(item, initialValue);
  });

  const setValue = (value: T) => {
    try {
      setStored(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [stored, setValue];
};
