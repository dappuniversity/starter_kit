import { FC } from 'react';
import { Badge, MantineSize } from '@mantine/core';
import classnames from 'classnames';

import styles from './EtherBadge.module.scss';

type Props = {
    className?: string,
    size?: MantineSize,
  };

const defaultProps: {
  className: string,
  size: MantineSize,
} = {
  className: '',
  size: 'md',
};

const EtherBadge: FC<Props> = ({ className, size }) => {
  const badgeClassName = classnames(styles.EtherBadge, className);

  return (
    <Badge
      className={ badgeClassName }
      gradient={ { from: 'violet', to: 'green', deg: 135 } }
      size={ size }
      variant="gradient"
    >
      ETHER
    </Badge>
  );
};

EtherBadge.defaultProps = defaultProps;

export default EtherBadge;
