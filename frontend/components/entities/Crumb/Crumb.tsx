import { FC } from 'react';
import {
  Avatar, Badge, Divider, Group, Space, Text,
} from '@mantine/core';
import classnames from 'classnames';
import { useIntersection } from '@mantine/hooks';
import Link from 'components/elements/Link';
import config from 'config';
import useAccountContext from 'contexts/account';
import { CrumbType, PaymentType } from 'types';
import { formatDate } from 'utils/date';

import Payment from '../Payment';

import styles from './Crumb.module.scss';
import { paths } from 'config/routing';

type Props = {
  data: CrumbType,
  originDomain?: string,
  className?: string,
  useAnimations?: boolean,
};

const defaultProps = {
  originDomain: 'Your domain',
  className: '',
  useAnimations: false,
};

const Crumb: FC<Props> = ({ data: crumb, originDomain, className, useAnimations }) => {
  const [userTravelRef, userTravelObserver] = useIntersection({ rootMargin: '40px', threshold: 0.5 });
  const [paymentsRef, paymentsObserver] = useIntersection({ rootMargin: '40px', threshold: 0.5 });
  const crumbClassName = classnames(styles.Crumb, className);
  const userTravelClassName = classnames(styles.UserTravelChart, { 
    [styles.PreTransition]: useAnimations,
    [styles.Transition]: useAnimations && userTravelObserver?.isIntersecting,
  });
  const paymentsClassName = classnames(styles.Payments, { 
    [styles.PreTransition]: useAnimations,
    [styles.Transition]: useAnimations && paymentsObserver?.isIntersecting,
  });
  const { account } = useAccountContext();

  const crumbLink = useAnimations ? paths.market : config.routing.paths.crumb(crumb?.domain, account?.address);

  return (
    <Link
      key={ crumb.domain }
      className={ crumbClassName }
      to={ crumbLink }
    >
      <div 
        ref={ userTravelRef }
        className={ userTravelClassName }
      >
        <Badge
          className={ styles.Domain }
          size="xl"
          variant="light"
        >
          { originDomain }
        </Badge>
        <Divider
          className={ styles.Divider }
          color={ config.theme.mantine.primaryColor }
          label={ (
            <Group align="center" spacing="xs">
              <Avatar color="cyan" radius="xl" />
              <Group align="center" direction="column" spacing={ 0 }>
                <Group spacing="xs">
                  <Text size="xs">User ID: </Text>
                  <Text size="xs" weight={ 700 }>{ crumb?.sessionId }</Text>
                </Group>
                <Group spacing="xs">
                  <Text size="xs">Date: </Text>
                  <Text size="xs" weight={ 700 }>{ formatDate(crumb?.date) }</Text>
                </Group>
              </Group>
            </Group>
            ) }
          labelPosition="center"
          size="md"
        />
        <Badge
          className={ styles.Domain }
          size="xl"
          variant="light"
        >
          { crumb.domain }
        </Badge>
      </div>
      <Space h="md" />
      <Group 
      ref={ paymentsRef } className={ paymentsClassName } direction="column">
        { crumb?.payments.map((payment: PaymentType, index: number) => (
          <Payment key={ `payment-${index}` } data={ payment } />
        ))}
      </Group>
    </Link>
  );
};

Crumb.defaultProps = defaultProps;

export default Crumb;
