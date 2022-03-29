import { FC } from 'react';
import {
  Button, Card, Group, Skeleton, Space, Text, Title,
} from '@mantine/core';

import Address from '../Address';

import styles from './Basket.module.scss';

type Props = {
  };

const defaultProps = {
};

const BasketSkeleton: FC<Props> = () => (
  <Card className={ styles.Basket }>
    <Skeleton visible>
      <Title order={ 3 }>empty</Title>
    </Skeleton>
    <Space h="xl" />
    <Skeleton visible>
      <Group>
        <Text>Domain: </Text>
        <Address>empty</Address>
      </Group>
    </Skeleton>
    <Space h="xs" />
    <Skeleton visible>
      <Group>
        <Text>Account: </Text>
        <Address>empty</Address>
      </Group>
    </Skeleton>
    <Space h="xs" />
    <Skeleton visible width="75%">
      <Group>
        <Text>Amount: </Text>
        <Text weight={ 700 }>50</Text>
      </Group>
    </Skeleton>
    <Space h="xs" />
    <Skeleton visible width="50%">
      <Group>
        <Text>Price: </Text>
        <Text weight={ 700 }>0</Text>
      </Group>
    </Skeleton>
    <Space h="md" />
    <Skeleton>
      <Group grow>
        <Button fullWidth>
          Get link
        </Button>
      </Group>
    </Skeleton>
  </Card>
);

BasketSkeleton.defaultProps = defaultProps;

export default BasketSkeleton;
