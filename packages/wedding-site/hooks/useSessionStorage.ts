import { useState, useEffect } from "react";

const useSessionStorage = (name: string) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const res = sessionStorage.getItem(name)
    if (res) {
        setValue(res)
    }
  }, [])

  return value
}

export default useSessionStorage