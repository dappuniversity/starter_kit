import { FC, useCallback, useState } from 'react';

import useBasketsService from 'hooks/services/useBasketsService';
import useBasket from 'hooks/swr/useBasket';
import { toWei } from 'utils/web3';

import { BasketContext } from './basketContext';
import BasketContextType from './basketContextType';

const BasketProvider: FC = ({ children }) => {
  const basketsService = useBasketsService();
  const [domain, setDomain] = useState<string>('');

  const {
    data, basket, error, mutate,
  } = useBasket(domain);

  const isLoading = !data && !error;

  const updateBasket = useCallback(async (
    _domain: string,
    _amount: number,
    _price: number,
  ) => {
    // Update local basket temporally without revalidation
    const tempBasket = {
      ...basket,
      amount: _amount,
      price: _price,
    };
    mutate(tempBasket, false);

    // Update data with a client request
    const weiAmount = toWei(_amount);
    const weiPrice = toWei(_price);

    try {
      // Revalidate data with a client request
      const result = await basketsService.updateBasket(domain, weiAmount, weiPrice);

      // Update data with a client request
      mutate();

      return result;
    } catch (updateError) {
      // Local data rollback
      mutate(basket, false);
      throw (updateError);
    }
  }, [basketsService, domain, mutate, basket]);

  const deleteBasket = useCallback(async () => {
    try {
      return basketsService.deleteBasket(domain);
    } catch (deleteError) {
      setDomain('');
      throw (deleteError);
    }
  }, [basketsService, domain]);

  const contextValue: BasketContextType = {
    basket,
    error,
    isLoading,
    setDomain,
    getBasket: mutate,
    updateBasket,
    deleteBasket,
  };

  return (
    <BasketContext.Provider
      value={ contextValue }
    >
      { children }
    </BasketContext.Provider>
  );
};

export default BasketProvider;
