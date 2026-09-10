import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }

      return initialValue;
    } catch (error) {
      console.error(`Error reading ${key} from Local Storage`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to Local Storage`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;