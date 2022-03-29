/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import { Grid } from '@mantine/core';

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
};

const defaultProps = {
  className: '',
  isLoading: false,
  itemClassName: '',
  itempProps: {},
  span: undefined,
};

const GridGroup: FC<Props> = ({
  data, Item, Skeleton, className, isLoading, itemClassName, itempProps, span,
}) => {
  const { isSM, isXS } = useScreenSize();

  let finalSpan = span;
  if (span === undefined) finalSpan = isSM ? 6 : 4;
  if (!span === undefined) finalSpan = isXS ? 12 : span;

  return (
    <div className={ className }>
      <Grid align="stretch" gutter="xl" justify="flex-start">
        { !isLoading && data.map((item: any, index: number) => (
          <Grid.Col
            key={ `$item-${index}` }
            span={ finalSpan }
          >
            <Item
              className={ itemClassName }
              data={ item }
              { ...itempProps }
            />
          </Grid.Col>
        ))}
        { isLoading && (<Grid.Col span={ finalSpan }><Skeleton /></Grid.Col>)}
        { isLoading && (<Grid.Col span={ finalSpan }><Skeleton /></Grid.Col>)}
        { isLoading && (<Grid.Col span={ finalSpan }><Skeleton /></Grid.Col>)}
      </Grid>
    </div>
  );
};
GridGroup.defaultProps = defaultProps;

export default GridGroup;
