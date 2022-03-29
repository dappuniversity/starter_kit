import { FC } from 'react';
import {
  Card, Group, Skeleton, Space, Title,
} from '@mantine/core';

import styles from './Crumb.module.scss';

type Props = {
  };

const defaultProps = {
};

const CrumbSkeleton: FC<Props> = () => (
  <Card className={ styles.Crumb } padding="lg">
    <Skeleton visible width="40%">
      <Title order={ 4 }>empty</Title>
    </Skeleton>
    <Space h="md" />
    <Skeleton visible>
      <Space h="xl" />
      <Space h="xl" />
    </Skeleton>
    <Skeleton visible />
    <Space h="md" />
    <Group className={ styles.Payments } direction="column">
      <Skeleton visible>
        <Space h="xl" />
        <Space h="xl" />
      </Skeleton>
    </Group>
  </Card>
);

CrumbSkeleton.defaultProps = defaultProps;

export default CrumbSkeleton;
