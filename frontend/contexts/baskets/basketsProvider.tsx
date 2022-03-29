import { FC, useCallback } from 'react';

import useAccountContext from 'contexts/account';
import useBasketsService from 'hooks/services/useBasketsService';
import useBaskets from 'hooks/swr/useBaskets';
import { BasketType } from 'types';
import { toWei } from 'utils/web3';

import { BasketsContext } from './basketsContext';
import BasketsContextType from './basketsContextType';

const BasketsProvider: FC = ({ children }) => {
  const basketsService = useBasketsService();
  const { account } = useAccountContext();
  const {
    data, baskets, error, mutate,
  } = useBaskets();

  const isLoading = !data && !error;

  const activeBaskets = baskets.filter(basket => basket.amount > 0);

  const accountBaskets: BasketType[] = (account.address && baskets)
    ? baskets.filter(basket => basket.account.toUpperCase() === account.address?.toUpperCase())
    : [];

  const createBasket = useCallback(async (
    domain: string,
    amount: any,
    price: any,
  ) => {
    // Update local baskets temporally without revalidation
    const tempBaskets = [
      ...baskets,
      { account: account.address, domain, amount, price },
    ];
    mutate(tempBaskets, false);

    // Update data with a client request
    const weiAmount = toWei(amount);
    const weiPrice = toWei(price);

    try {
      // Revalidate data with a client request
      const result = await basketsService.createBasket(domain, weiAmount, weiPrice);

      // Update data with a client request
      mutate();

      return result;
    } catch (createError) {
      // Local data rollback
      mutate(baskets, false);
      throw (createError);
    }
  }, [basketsService, account.address, mutate, baskets]);

  const contextValue: BasketsContextType = {
    baskets,
    activeBaskets,
    accountBaskets,
    error,
    isLoading,
    getBaskets: mutate,
    createBasket,
  };

  return (
    <BasketsContext.Provider
      value={ contextValue }
    >
      { children }
    </BasketsContext.Provider>
  );
};

export default BasketsProvider;
