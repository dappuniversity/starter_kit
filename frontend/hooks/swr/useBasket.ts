import useSWR, { SWRResponse } from 'swr';

import { contracts } from 'config/routing';
import useAccountContext from 'contexts/account';
import useBasketsService from 'hooks/services/useBasketsService';
import * as basketSite from 'pages/api/baskets/[domain]';
import { BasketType } from 'types';
import { fromWei } from 'utils/web3';

const useBasket = (domain: string): SWRResponse & {
    basket: BasketType,
} => {
  const { account } = useAccountContext();
  const basketsService = useBasketsService();
  const fetchBasket = (_: any, _address: string) => basketsService.getBasket(domain);
  const fetchBasketSite = () => basketSite.get(domain);
  const shouldFetch = account?.address && domain;

  const result: SWRResponse = useSWR(
    shouldFetch ? [contracts.baskets.getBasket, account.address, domain] : null,
    fetchBasket,
  );

  let basket: BasketType = result.data;

  const siteResult: SWRResponse = useSWR(
    basket ? [basketSite.path(domain), account.address, domain] : null,
    fetchBasketSite,
  );

  const site: basketSite.SiteType = siteResult.data || {};

  if (basket) {
    basket = {
      ...result.data,
      amount: fromWei(basket.amount),
      price: fromWei(basket.price),
      title: site?.title || site.domain,
      image: site?.image,
    };
  }

  return {
    ...result,
    basket,
  };
};

export default useBasket;
