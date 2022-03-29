import { useState } from 'react';

const useToggle = (value1: any = false, value2: any = true) => {
  const [value, setValue] = useState<typeof value1>(value1);

  const toggle = () => setValue(value === value1 ? value2 : value1);
  const setFirst = () => setValue(value1);
  const setSecond = () => setValue(value2);

  return {
    value,
    toggle,
    setFirst,
    setSecond,
  };
};

export default useToggle;
