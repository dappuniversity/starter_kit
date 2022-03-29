import { FC } from 'react';
import { Space, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import classnames from 'classnames';

import theme from 'config/theme';
import { header } from 'content/home';

import styles from './HeaderSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const HeaderSection: FC<Props> = ({ className, id }) => {
  const [headerRef, headerObserver] = useIntersection({ rootMargin: '0px', threshold: 0.6 });
  const headerSectionClassNames = classnames(styles.HeaderSection, className);
  const pathClassNames = classnames(styles.Path, { [styles.HiddenEffect]: !headerObserver?.isIntersecting });

  return (
    <div
      ref={ headerRef }
      className={ headerSectionClassNames }
      id={ id }
    >
      <div className={ styles.Content }>
        <Text
          align="center"
          className={ styles.Title }
          color={ theme.mantine.primaryColor }
          component="span"
          size="xl"
          style={ { fontFamily: 'Blessed Light' } }
        >
          { header.title }
        </Text>
        <Space className={ styles.Space } h="xs" />
        <div className={ styles.Subtitle }>
          { header.subtitle.map(text => (
            <Text
              key={ `text-${text}` }
              align="center"
              color="white"
              component="span"
              size="xl"
              style={ { fontFamily: 'Blessed Light' } }
            >
              { text }
            </Text>
          )) }
        </div>
      </div>
      { /*
      <
        className={ pathClassNames }
        height="640"
        preserveAspectRatio="none"
        viewbox="0 0 100 100"
        width="640"
      >
        <path
          d="M34,10 Q80,10 30,30 T260,100"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
      */ }
    </div>
  );
};

HeaderSection.defaultProps = defaultProps;

export default HeaderSection;
