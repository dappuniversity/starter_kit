import { Context } from 'react';

import { createContext } from 'utils/context';

import BasketsContextType from './basketsContextType';

const CONTEXT_NAME = 'Baskets';

const defaultState = {
  baskets: [],
  accountBaskets: [],
  loggedOut: undefined,
  isLoading: false,
  getBaskets: () => {},
  createBasket: () => {},
};

const {
  Context: BasketsContext,
  useContext: useBasketsContext,
}: {
  Context: Context<BasketsContextType>,
  useContext: Function,
} = createContext(CONTEXT_NAME, defaultState);

export default useBasketsContext;
export {
  BasketsContext,
};
