import { FC } from 'react';
import { MantineSize, Text } from '@mantine/core';
import classnames from 'classnames';

import styles from './Address.module.scss';

type Props = {
    children?: string,
    className?: string,
    size?: MantineSize,
  };

const defaultProps = {
  children: undefined,
  className: '',
  size: undefined,
};

const Address: FC<Props> = ({ children, className, size }) => {
  const addressClassName = classnames(styles.Address, className);
  const address = children ? `${children.slice(0, 4)}...${children.slice(-4)}` : '';

  return (
    <Text
      className={ addressClassName }
      size={ size }
      weight={ 700 }
    >
      { address }
    </Text>
  );
};

Address.defaultProps = defaultProps;

export default Address;
