import {
  createContext as createReactContext,
  useContext as useReactContext,
} from 'react';

const createContext = (contextName: string, defaultState: any): {
  Context: any,
  useContext: Function,
} => {
  const Context = createReactContext(defaultState);

  const useContext = () => {
    const context = useReactContext(Context);
    if (context === undefined) {
      throw new Error(`use${contextName}Context must be used within related ${contextName}Provider`);
    }
    return context;
  };

  return {
    Context,
    useContext,
  };
};

export {
  createContext,
};
