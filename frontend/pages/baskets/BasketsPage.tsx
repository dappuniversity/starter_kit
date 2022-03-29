import { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import {
  Button, Drawer, Group, Space, Title,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import Basket, { BasketSkeleton } from 'components/entities/Basket';
import BasketForm from 'components/forms/BasketForm';
import GridGroup from 'components/groups/GridGroup';
import theme from 'config/theme';
import useAccountContext from 'contexts/account/accountContext';
import useBasketsContext from 'contexts/baskets/basketsContext';
import { useFunctionAtInterval, useScreenSize } from 'hooks';

import styles from './BasketsPage.module.scss';

const BasketsPage: NextPage = () => {
  const { account } = useAccountContext();
  const basketsContext = useBasketsContext();
  const [createOpened, setCreateOpened] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string>();
  const createDisabled = !account.address;
  const { isSM } = useScreenSize();
  const notifications = useNotifications();

  const openCreateBasket = () => setCreateOpened(true);
  const closeCreateBasket = () => setCreateOpened(false);

  const createBasket = useCallback(async (values: {
    domain: string,
    amount: any,
    price: any,
  }) => {
    setCreateLoading(true);

    const { domain } = values;

    basketsContext.createBasket(domain, values.amount, values.price)
      .then(() => {
        setCreateLoading(false);
        setCreateError(undefined);
        closeCreateBasket();
        notifications.showNotification({
          title: 'Basket created',
          message: `'${domain}' basket is now available`,
          color: 'green',
        });
      }).catch((error: Error) => {
        setCreateError(error.message);
        setCreateLoading(false);
        notifications.showNotification({
          title: 'Basket was not created',
          message: `Error creating the basket. '${domain}' basket is not available`,
          color: 'red',
        });
      });
  }, [basketsContext, notifications]);

  useFunctionAtInterval(basketsContext.getBaskets);

  return (
    <div className={ styles.BasketsPage }>
      <Title order={ 1 }>BASKETS</Title>
      <Space h="xl" />
      <GridGroup
        data={ basketsContext.accountBaskets }
        isLoading={ basketsContext.isLoading }
        Item={ Basket }
        itemClassName={ styles.Basket }
        Skeleton={ BasketSkeleton }
      />
      <Group mt="xl" position="right">
        <Button
          color={ theme.mantine.primaryColor }
          disabled={ createDisabled }
          variant="outline"
          onClick={ openCreateBasket }
        >
          Create Basket
        </Button>
      </Group>
      <Drawer
        opened={ createOpened }
        padding="xl"
        position={ isSM ? 'bottom' : 'left' }
        size="xl"
        title="Create Basket"
        onClose={ closeCreateBasket }
      >
        <BasketForm
          error={ createError }
          isDisabled={ createDisabled }
          isLoading={ createLoading }
          onSubmit={ createBasket }
        />
      </Drawer>
    </div>
  );
};
export default BasketsPage;
