import { useEffect } from 'react';
import type { NextPage } from 'next';
import { Space, Text, Title } from '@mantine/core';
import useSWR, { SWRConfig } from 'swr';

import Basket, { BasketSkeleton } from 'components/entities/Basket';
import GridGroup from 'components/groups/GridGroup';
import { api, contracts } from 'config/routing';
import useBasketsContext from 'contexts/baskets/basketsContext';
import useFunctionAtInterval from 'hooks/useFunctionAtInterval';
import * as basketSite from 'pages/api/baskets/[domain]';
import * as upcomingBasketsRequest from 'pages/api/baskets/upcoming';
import { basketServiceOnServer } from 'services/basketsService';
import { BasketType } from 'types';

import styles from './Market.module.scss';

const MAX_SSR_BASKETS = 9;

export const getServerSideProps = async (_context: any) => {
  const baskets: BasketType[] = (await basketServiceOnServer.getBaskets())
    .slice(0, MAX_SSR_BASKETS)
    .map((basket: BasketType): BasketType => ({
      account: basket.account,
      domain: basket.domain,
      amount: String(basket.amount),
      price: String(basket.price),
    }));

  const domains = baskets.map((basket: BasketType) => basket.domain);

  const sites: basketSite.SiteType[] = await basketSite
    .getManySitesData(domains);

  return {
    props: {
      fallback: {
        [contracts.baskets.getAllBaskets]: baskets,
        [basketSite.manyPath]: sites,
        [upcomingBasketsRequest.path]: upcomingBasketsRequest.initialData,
      },
    },
  };
};

type Props = {
  fallback?: any,
  onSetSWRfallback: Function,
};

const defaultProps = {
  fallback: {
    [api.baskets]: [],
  },
  onSetSWRfallback: () => {},
};

const Market: NextPage<Props> = ({ fallback, onSetSWRfallback }) => {
  const { activeBaskets, isLoading: getBasketsLoading, getBaskets } = useBasketsContext();
  useFunctionAtInterval(getBaskets);

  const {
    data: upcomingBaskets = [],
    error: upcomingBasketsError,
  } = useSWR(upcomingBasketsRequest.path, upcomingBasketsRequest.get);

  useEffect(() => {
    onSetSWRfallback(fallback);
  }, [fallback, onSetSWRfallback]);

  const isUpcomingBasketsLoading = (!upcomingBaskets && !upcomingBasketsError);

  return (
    <div className={ styles.Market }>
      <SWRConfig value={ { fallback } }>
        <div className={ styles.Baskets }>
          <Title order={ 1 }>MARKET</Title>
          <Space h="xl" />
          <Title order={ 2 }>Current baskets</Title>
          <Space h="xl" />
          <GridGroup
            data={ activeBaskets }
            isLoading={ getBasketsLoading }
            Item={ Basket }
            itemClassName={ styles.Basket }
            Skeleton={ BasketSkeleton }
          />
          <Space h="xl" />
          <Title order={ 2 }>Upcoming baskets</Title>
          <Space h="xl" />
          <GridGroup
            data={ upcomingBaskets }
            isLoading={ isUpcomingBasketsLoading }
        // eslint-disable-next-line react/jsx-props-no-spreading
            Item={ Basket }
            itemClassName={ styles.Basket }
            itempProps={ {
              isDisabled: true,
            } }
            Skeleton={ BasketSkeleton }
          />
          <Text color="red">{ upcomingBasketsError }</Text>
        </div>
      </SWRConfig>
    </div>
  );
};

Market.defaultProps = defaultProps;

export default Market;
