import { useState } from "react";

export const useLocalStorage = <T>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = getFromLocalStorage<T>(keyName);

      if (value) return value;
      else {
        window.localStorage.setItem(`${keyName}`, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    console.log(newValue);
    try {
      window.localStorage.setItem(`${keyName}`, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue] as const;
};

export const getFromLocalStorage = <T>(keyName: string): T | null => {
  const value = window.localStorage.getItem(`${keyName}`);

  if (value !== "undefined" && value !== null) {
    return JSON.parse(value);
  }

  return null;
};
