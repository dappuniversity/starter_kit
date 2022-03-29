import { useEffect } from 'react';

const useFunctionAtInterval = (func: Function, ms: number = 60000000, args: any[] = []) => {
  useEffect(() => {
    func(...args);
    const interval = setInterval(() => {
      func(...args);
    }, ms);
    return () => clearInterval(interval);
  }, [func, ms]);
};

export default useFunctionAtInterval;
