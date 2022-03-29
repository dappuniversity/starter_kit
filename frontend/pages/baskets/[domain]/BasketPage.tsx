/* eslint-disable react/forbid-dom-props */
import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Button, Grid, Group, Image,
  LoadingOverlay, Modal, Space, Text, Title,
  Transition,
} from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

import Link from 'components/elements/Link';
import BasketForm from 'components/forms/BasketForm';
import CrumbsTimeLine from 'components/groups/CrumbsTimeLine';
import { paths } from 'config/routing';
import theme from 'config/theme';
import useAccountContext from 'contexts/account';
import useBasketContext from 'contexts/basket/basketContext';
import useCrumbsContext from 'contexts/crumbs/crumbsContext';
import { useToggleOpened } from 'hooks';

import styles from './BasketPage.module.scss';

const BasketPage: NextPage = () => {
  const router = useRouter();
  const { domain } = router.query;
  const { account } = useAccountContext();
  const basketContext = useBasketContext();
  const crumbsContext = useCrumbsContext();
  const { crumbs, isLoading: isGetCrumbsLoading, error: getCrumbsError } = crumbsContext;
  const { basket, error: getBasketError } = basketContext;
  const notifications = useNotifications();

  const {
    opened: editOpened,
    open: openEdit,
    close: closeEdit,
  } = useToggleOpened();
  const {
    opened: deleteOpened,
    open: openDelete,
    close: closeDelete,
  } = useToggleOpened();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string>();
  const [deleteError, setDeleteError] = useState<string>();

  const updateDisabled = !account.address;
  const deleteDisabled = updateDisabled;

  const updateBasket = useCallback(async (values: {
    domain: string,
    amount: any,
    price: any,
  }) => {
    setDeleteError(undefined);

    if (values.domain === basket?.domain
      && values.amount === basket?.amount
      && values.price === basket?.price) {
      setUpdateError(undefined);
      closeEdit();
      return;
    }

    setUpdateLoading(true);

    basketContext.updateBasket(values.domain, values.amount, values.price)
      .then(() => {
        setUpdateLoading(false);
        setUpdateError(undefined);
        closeEdit();
        notifications.showNotification({
          title: 'Basket update',
          message: `'${basket?.domain}' basket values were updated`,
          color: 'green',
        });
      }).catch((_error: Error) => {
        setUpdateError(_error.message);
        setUpdateLoading(false);
        notifications.showNotification({
          title: 'Basket was not deleted',
          message: `Error updating the basket?. '${basket?.domain}' basket values were not updated`,
          color: 'red',
        });
      });
  }, [basketContext, basket, closeEdit, notifications]);

  const deleteBasket = () => basketContext.deleteBasket(String(domain))
    .then(() => {
      router.push(paths.baskets);
      setDeleteError(undefined);
      closeDelete();
      notifications.showNotification({
        title: 'Basket delete',
        message: `'${basket?.domain}' basket is no longer available`,
        color: 'green',
      });
    })
    .catch((_error: Error) => {
      setDeleteError(_error.message);
      closeDelete();
      notifications.showNotification({
        title: 'Basket was not deleted',
        message: `Error deleting the basket?. '${basket?.domain}' basket is still available`,
        color: 'red',
      });
    });

  useEffect(() => {
    crumbsContext.setDomain(domain);
    basketContext.setDomain(domain);
  }, [domain]);

  return (
    <div className={ styles.BasketPage }>
      <Title order={ 1 }>BASKET</Title>
      <Space h="xl" />
      <div className={ styles.Content }>
        <div className={ styles.Basket }>
          { basket?.image && basket?.title && (
          <Image
            alt={ basket.title }
            height={ basket.image ? undefined : 300 }
            radius="md"
            src={ basket.image }
            width="100%"
            withPlaceholder
          />
        ) }
          <Space h="xl" />
          <div className={ styles.BasketData }>
            <LoadingOverlay visible={ basketContext.isLoading } />
            <Transition
              duration={ theme.transitionDuration }
              mounted={ !editOpened }
              transition="fade"
            >
              { style => (
                <div style={ style }>
                  <Text size="sm">Domain</Text>
                  <Link isBlank to={ `https://${domain}` }>
                    <Group>
                      <Text color="cyan" size="xl">{ basket?.domain }</Text>
                      <ExternalLinkIcon />
                    </Group>
                  </Link>
                  <Space h="xl" />
                  <Text size="sm">Amount</Text>
                  <Text color="dimmed" size="xs">Total BREAD amount that can be spent on this referal campaign</Text>
                  <Text color="cyan" size="xl">{ basket?.amount }</Text>
                  <Space h="xl" />
                  <Text size="sm">Price</Text>
                  <Text color="dimmed" size="xs">BREAD units payed per crumb created to publishers</Text>
                  <Text color="cyan" size="xl">{ basket?.price }</Text>
                  <Space h="sm" />
                  <Grid align="center" justify="space-between" mt="md">
                    <Grid.Col grow>
                      <Text color="red" mt="sm" size="sm">
                        { deleteError }
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={ 4 }>
                      <Group>
                        <Button
                          disabled={ deleteDisabled }
                          gradient={ theme.deleteGradient }
                          variant="gradient"
                          onClick={ openDelete }
                        >
                          Delete
                        </Button>
                        <Button
                          disabled={ updateDisabled }
                          gradient={ theme.primaryGradient }
                          variant="gradient"
                          onClick={ openEdit }
                        >
                          Edit
                        </Button>
                      </Group>
                    </Grid.Col>
                  </Grid>
                </div>
              ) }
            </Transition>
            <Transition
              duration={ theme.transitionDuration }
              mounted={ editOpened }
              transition="fade"
            >
              { style => (
                <div style={ style }>
                  <BasketForm
                    basket={ basket }
                    error={ updateError }
                    isDisabled={ updateDisabled }
                    isLoading={ updateLoading }
                    onSubmit={ updateBasket }
                  />
                </div>
              ) }
            </Transition>
            { !!getBasketError && <Text color="red">{ String(getBasketError) }</Text> }
            <Modal
              centered
              opened={ deleteOpened }
              title={ `Delete basket with domain ${basket?.domain}` }
              onClose={ closeDelete }
            >
              <Group mt="xl" position="right">
                <Button
                  variant="outline"
                  onClick={ closeDelete }
                >
                  Cancel
                </Button>
                <Button
                  gradient={ theme.deleteGradient }
                  variant="gradient"
                  onClick={ deleteBasket }
                >
                  Delete
                </Button>
              </Group>
            </Modal>
          </div>
        </div>
        <div className={ styles.Crumbs }>
          <CrumbsTimeLine
            crumbs={ crumbs }
            isLoading={ isGetCrumbsLoading }
          />
        </div>
        { /* !!getCrumbsError && <Text color="red">{ String(getCrumbsError) }</Text> */}
      </div>
    </div>
  );
};

export default BasketPage;
