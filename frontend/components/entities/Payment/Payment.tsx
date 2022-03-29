import { FC } from 'react';
import {
  Badge, Divider, Group, Text,
  ThemeIcon,
} from '@mantine/core';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import classnames from 'classnames';

import Address from 'components/entities/Address';
import BreadBadge from 'components/entities/BreadBadge';
import theme from 'config/theme';
import { PaymentType } from 'types';
import { formatDate } from 'utils/date';

import styles from './Payment.module.scss';

type Props = {
    data: PaymentType,
    className?: string,
  };

const defaultProps = {
  className: '',
};

const Payment: FC<Props> = ({ data: payment, className }) => {
  const paymentClassName = classnames(styles.Payment, className);

  const dividerColor = payment.paid ? theme.mantine.primaryColor : 'red';
  const dividerClassNames = classnames(styles.Divider, { [styles.Negative]: !payment.paid });
  const Icon = payment.paid ? CheckIcon : Cross1Icon;
  const iconGradient = payment.paid ? theme.primaryGradient : theme.deleteGradient;

  return (
    <div className={ paymentClassName }>
      <div className={ styles.Chart }>
        <Badge size="md" variant="light">
          <Address size="xs">{ payment.toAccount }</Address>
        </Badge>
        <Divider
          className={ dividerClassNames }
          color={ dividerColor }
          label={ (
            <Group align="center" spacing="xs">
              <BreadBadge size="md">{ payment.price }</BreadBadge>
              <ThemeIcon
                gradient={ iconGradient }
                radius="xl"
                size="sm"
                variant="gradient"
              >
                <Icon />
              </ThemeIcon>
              <Text size="xs" weight={ 700 }>{ formatDate(payment.date) }</Text>
            </Group>
          ) }
          labelPosition="center"
          size="md"
        />
        <Badge size="md" variant="light">
          <Address size="xs">{ payment.fromAccount }</Address>
        </Badge>
      </div>
    </div>
  );
};

Payment.defaultProps = defaultProps;

export default Payment;
