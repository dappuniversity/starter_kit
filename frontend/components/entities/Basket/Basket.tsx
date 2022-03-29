import { FC, MouseEventHandler, useMemo, useState } from 'react';
import {
  Badge, Button, Card, Group, Image,
  Modal, Space, Text, Title,
} from '@mantine/core';
import classnames from 'classnames';

import Link from 'components/elements/Link';
import BreadBadge from 'components/entities/BreadBadge';
import CrumbLinks from 'components/entities/CrumbLinks';
import config from 'config';
import theme from 'config/theme';
import useAccountContext from 'contexts/account';
import useCrumbs from 'hooks/swr/useCrumbs';
import { BasketType, CrumbType, PaymentType } from 'types';
import { round } from 'utils/number';

import Address from '../Address';

import styles from './Basket.module.scss';

const MIN_PAID_PERC_GREEN = 95;

type Props = {
  data: BasketType,
  className?: string,
  isDisabled?: boolean,
};

const defaultProps = {
  className: '',
  isDisabled: false,
};

const Basket: FC<Props> = ({ data: basket, className, isDisabled }) => {
  const basketClassName = classnames(styles.Basket, className);
  const { data: crumbs = [] }: { data?: CrumbType[]} = useCrumbs(basket.domain);

  const [modalLinkOpened, setLinkModalOpened] = useState(false);
  const { account } = useAccountContext();

  const title = basket.title || basket.domain;

  const toggleLinkModalOpened: MouseEventHandler = event => {
    if (event) event.preventDefault();

    setLinkModalOpened(!modalLinkOpened);
  };

  const closeLinkModal = () => setLinkModalOpened(false);

  const paidPaymentsPerc = useMemo(() => {
    const basketPayments: PaymentType[] = (crumbs || [])
      .filter((crumb: CrumbType) => crumb.domain === basket.domain)
      .reduce((allPayments: PaymentType[], crumb: CrumbType) => [
        ...allPayments,
        ...crumb.payments.filter(payment => payment.fromAccount === basket.account),
      ], []);

    if (!basketPayments.length) return undefined;
    const paidPayments = basketPayments.filter(payment => payment.paid);

    return round((paidPayments.length / basketPayments.length) * 100);
  }, [basket, crumbs]);

  const showPaidBadge = !isDisabled && paidPaymentsPerc !== undefined;
  const paidPercGradient = paidPaymentsPerc && paidPaymentsPerc > MIN_PAID_PERC_GREEN
    ? config.theme.primaryGradient
    : config.theme.deleteGradient;

  const isBasketEmpty = basket.amount < basket.price;
  const accountColor = isBasketEmpty ? 'red' : undefined;

  return (
    <>
      <Link
        key={ basket.domain }
        className={ basketClassName }
        isDisabled={ isDisabled }
        to={ config.routing.paths.basket(basket) }
      >
        <Card padding="xl">
          <Card.Section>
            <Image
              alt={ basket.title }
              height={ basket.image ? undefined : 200 }
              src={ basket.image }
              width="100%"
              withPlaceholder
            />
          </Card.Section>
          <Space h="md" />
          <Group>
            <Title className={ styles.Title } order={ 3 }>{ title }</Title>
            { isDisabled && (
              <Badge
                gradient={ config.theme.primaryGradient }
                variant="gradient"
              >
                UPCOMING
              </Badge>
            ) }
            { showPaidBadge && (
              <Badge
                gradient={ paidPercGradient }
                variant="gradient"
              >
                { `${paidPaymentsPerc} % paid`}
              </Badge>
            ) }
          </Group>
          <Space h="md" />
          <Group>
            <Text>Domain: </Text>
            <Text weight={ 700 }>{ basket.domain }</Text>
          </Group>
          <Group>
            <Text>Account: </Text>
            <Address>{ basket.account }</Address>
          </Group>
          <Group>
            <Text color={ accountColor }>Amount: </Text>
            <Text color={ accountColor } weight={ 700 }>{ basket.amount }</Text>
            <BreadBadge size="xs" />
          </Group>
          <Group>
            <Text>Price: </Text>
            <Text weight={ 700 }>{ basket.price }</Text>
            <BreadBadge size="xs" />
          </Group>
          <Space h="md" />
          <Group grow>
            <Button
              className={ styles.LinkButton }
              disabled={ !account?.address }
              fullWidth
              gradient={ theme.primaryGradient }
              variant="gradient"
              onClick={ toggleLinkModalOpened }
            >
              Get link
            </Button>
          </Group>
        </Card>
      </Link>
      <Modal
        centered
        opened={ modalLinkOpened }
        padding="xl"
        title={ `Your referal link to ${basket.title}` }
        onClose={ closeLinkModal }
      >
        <CrumbLinks domain={ basket.domain } onCopyLink={ closeLinkModal } />
      </Modal>
    </>
  );
};

Basket.defaultProps = defaultProps;

export default Basket;
