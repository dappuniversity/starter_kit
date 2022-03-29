import { Context } from 'react';

import { createContext } from 'utils/context';

import BasketContextType from './basketContextType';

const CONTEXT_NAME = 'Basket';

const defaultState = {
  basket: undefined,
  loggedOut: undefined,
  isLoading: false,
  getBasket: () => {},
  setDomain: () => {},
  updateBasket: () => {},
  deleteBasket: () => {},
};

const {
  Context: BasketContext,
  useContext: useBasketContext,
}: {
  Context: Context<BasketContextType>,
  useContext: Function,
} = createContext(CONTEXT_NAME, defaultState);

export default useBasketContext;
export {
  BasketContext,
};
