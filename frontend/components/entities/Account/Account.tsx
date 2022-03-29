import { FC, MouseEventHandler } from 'react';
import {
  Avatar, Button, Group, Space, Text,
} from '@mantine/core';
import classnames from 'classnames';

import theme from 'config/theme';
import WEB3 from 'config/web3';
import useAccountContext from 'contexts/account/accountContext';
import { round } from 'utils/number';

import Address from '../Address';
import BreadBadge from '../BreadBadge';
import EtherBadge from '../EtherBadge';

import styles from './Account.module.scss';

type Props = {
    className?: string,
    onLogout?: Function
  };

const defaultProps = {
  className: '',
  onLogout: () => {},
};

const Account: FC<Props> = ({ className, onLogout }) => {
  const { account, logout } = useAccountContext();
  const accountClassNames = classnames(styles.Account, className);
  const ether = round(account?.balances.ether, 4);
  const bread = round(account?.balances.bread, 4);

  const logoutButtonClickHandler: MouseEventHandler = event => {
    logout();
    if (onLogout) onLogout(event);
  };
  const chainName = WEB3.SUPPORTED_CHAIN_NAMES[Number(account.chainId)];

  return (
    <div className={ accountClassNames }>
      <Group>
        <Avatar radius="xl" size="md" />
        <Address size="xl">{ account?.address }</Address>
      </Group>
      <Space h="lg" />
      <Text>
        { 'Chain: ' }
        <b>{chainName}</b>
      </Text>
      <Space h="lg" />
      <Group>
        <EtherBadge size="lg" />
        <Text weight={ 700 }>{ ether }</Text>
      </Group>
      <Space h="xs" />
      <Group>
        <BreadBadge size="lg" />
        <Text weight={ 700 }>{ bread }</Text>
      </Group>
      <Space h="lg" />
      <Button
        disabled={ !account.active }
        gradient={ theme.accentGradient }
        variant="gradient"
        onClick={ logoutButtonClickHandler }
      >
        LOGOUT
      </Button>
      <Space h="lg" />
    </div>
  );
};

Account.defaultProps = defaultProps;

export default Account;
