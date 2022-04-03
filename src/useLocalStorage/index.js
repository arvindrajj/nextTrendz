/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'

const getStoredValue = (key, initialValue) => {
  const storedValue = JSON.parse(localStorage.getItem(key))
  if (storedValue) return storedValue
  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => getStoredValue(key, initialValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])
  return [setValue]
}

export default useLocalStorage
