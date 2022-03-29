/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import {
  Space, ThemeIcon,
  Timeline,
} from '@mantine/core';

import { useScreenSize } from 'hooks';

type Props = {
    data: any[],
    Item: FC<any>,
    Skeleton: FC<any>,
    className?: string,
    isLoading?: boolean,
    itemClassName?: string,
    itempProps?: Object,
    span?: number,
    getItemColor: Function,
    getItemIcon: Function,
    getItemIconGradient: Function,
    getItemTitle: Function,
};

const defaultProps = {
  className: '',
  isLoading: false,
  itemClassName: '',
  itempProps: {},
  span: undefined,
  getItemColor: () => undefined,
  getItemIcon: () => undefined,
  getItemIconGradient: () => undefined,
  getItemTitle: () => undefined,
};

const TimeLineGroup: FC<Props> = ({
  data, Item, Skeleton, className, isLoading, itemClassName, itempProps,
  getItemColor, getItemIcon, getItemIconGradient, getItemTitle,
}) => {
  const { isSM, isXS } = useScreenSize();

  return (
    <div className={ className }>
      <Timeline
        active={ data.length }
        bulletSize={ 24 }
        color="cyan"
        lineWidth={ 2 }
        reverseActive
      >
        { !isLoading && data.map((item: any, index: number) => (
          <Timeline.Item
            key={ `item-${index}` }
            bullet={ (
              <ThemeIcon
                gradient={ getItemIconGradient(item) }
                radius="xl"
                size="sm"
                variant="gradient"
              >
                { getItemIcon(item) }
              </ThemeIcon>
              ) }
            color={ getItemColor(item) }
            lineVariant="dotted"
            title={ getItemTitle ? getItemTitle(item) : index }
          >
            <Space h="xl" />
            <Item
              className={ itemClassName }
              data={ item }
              { ...itempProps }
            />
            <Space h="xl" />
            <Space h="xl" />
          </Timeline.Item>
        ))}
        { isLoading && (<Timeline.Item><Skeleton /></Timeline.Item>)}
        { isLoading && (<Timeline.Item><Skeleton /></Timeline.Item>)}
        { isLoading && (<Timeline.Item><Skeleton /></Timeline.Item>)}
      </Timeline>
    </div>
  );
};

TimeLineGroup.defaultProps = defaultProps;

export default TimeLineGroup;
