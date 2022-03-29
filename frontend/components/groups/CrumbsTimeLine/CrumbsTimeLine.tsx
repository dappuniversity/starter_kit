/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import { FC, useCallback } from 'react';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';

import Crumb, { CrumbSkeleton } from 'components/entities/Crumb';
import theme from 'config/theme';
import { CrumbType, PaymentType } from 'types';
import { formatDate } from 'utils/date';

import TimeLineGroup from '../TimeLineGroup';

type Props = {
    crumbs: CrumbType[],
    className?: string,
    isLoading?: boolean,
    itemClassName?: string,
    itempProps?: Object,
};

const defaultProps = {
  className: '',
  isLoading: false,
  itemClassName: '',
  itempProps: {},
};

const CrumbsTimeLine: FC<Props> = ({
  crumbs, className, isLoading, itemClassName, itempProps,
}) => {
  const getCrumbTitle = useCallback((crumb: CrumbType) => formatDate(crumb.date), []);

  const getCrumbColor = useCallback((crumb: CrumbType) => {
    const cumbPaid = crumb.payments.every((pay: PaymentType) => pay.paid);
    return cumbPaid ? undefined : 'red';
  }, []);

  const getCrumbIcon = useCallback((crumb: CrumbType) => {
    const cumbPaid = crumb.payments.every((pay: PaymentType) => pay.paid);
    return cumbPaid ? <CheckIcon /> : <Cross1Icon />;
  }, []);

  const getCrumbIconGradient = useCallback((crumb: CrumbType) => {
    const cumbPaid = crumb.payments.every((pay: PaymentType) => pay.paid);
    return cumbPaid ? theme.primaryGradient : theme.deleteGradient;
  }, []);

  return (
    <TimeLineGroup
      className={ className }
      data={ crumbs }
      getItemColor={ getCrumbColor }
      getItemIcon={ getCrumbIcon }
      getItemIconGradient={ getCrumbIconGradient }
      getItemTitle={ getCrumbTitle }
      isLoading={ isLoading }
      Item={ Crumb }
      itemClassName={ itemClassName }
      itempProps={ itempProps }
      Skeleton={ CrumbSkeleton }
    />
  );
};

CrumbsTimeLine.defaultProps = defaultProps;

export default CrumbsTimeLine;
