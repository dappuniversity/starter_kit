import { FC } from 'react';
import { Badge, MantineSize } from '@mantine/core';
import classnames from 'classnames';

import styles from './BreadBadge.module.scss';

type Props = {
    className?: string,
    size?: MantineSize,
    children?: number,
  };

const defaultProps: Props = {
  className: '',
  size: 'md',
  children: undefined,
};

const BreadBadge: FC<Props> = ({ className, children, size }) => {
  const badgeClassName = classnames(styles.BreadBadge, className);
  const text = children !== undefined ? `${children} BREAD` : 'BREAD';

  return (
    <Badge
      className={ badgeClassName }
      gradient={ { from: 'orange', to: 'red', deg: 45 } }
      size={ size }
      variant="gradient"
    >
      { text }
    </Badge>
  );
};

BreadBadge.defaultProps = defaultProps;

export default BreadBadge;
