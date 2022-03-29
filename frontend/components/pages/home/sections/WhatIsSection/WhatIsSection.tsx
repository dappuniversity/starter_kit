import { FC } from 'react';
import { Text } from '@mantine/core';
import classnames from 'classnames';

import Link from 'components/elements/Link';
import theme from 'config/theme';
import { banner } from 'content/home';

import styles from './WhatIsSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const WhatIsSection: FC<Props> = ({ className, id }) => {
  const whatIsSectionClassNames = classnames(styles.WhatIsSection, className);

  return (
    <div
      className={ whatIsSectionClassNames }
      id={ id }
    >
      <div className={ styles.Content } />
      <div className={ styles.Diamond } />
      <div className={ styles.Diamond } />
      <div className={ styles.Diamond } />
      <div className={ styles.Diamond } />
    </div>
  );
};

WhatIsSection.defaultProps = defaultProps;

export default WhatIsSection;
