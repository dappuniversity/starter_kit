import { KeyedMutator } from 'swr';

import BasketType from 'types/basketType';

interface BasketsContextType {
  baskets: BasketType[],
  activeBaskets: BasketType[],
  accountBaskets: BasketType[],
  error: any,
  isLoading: boolean,
  getBaskets: KeyedMutator<BasketType[]>,
  createBasket: Function,
}

export default BasketsContextType;
