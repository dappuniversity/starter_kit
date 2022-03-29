import { FC } from 'react';
import { Text } from '@mantine/core';
import classnames from 'classnames';

import Link from 'components/elements/Link';
import theme from 'config/theme';
import { banner } from 'content/home';

import styles from './BannerSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const BannerSection: FC<Props> = ({ className, id }) => {
  const bannerSectionClassNames = classnames(styles.BannerSection, className);

  return (
    <div
      className={ bannerSectionClassNames }
      id={ id }
    >
      <div className={ styles.Content }>
        <div className={ styles.Title }>
          <Text
            align="center"
            color={ theme.mantine.primaryColor }
            size="xl"
          >
            { banner.title.slice(0, -4) }
          </Text>
          <Text
            align="center"
            color={ theme.mantine.primaryColor }
            size="xl"
          >
            { banner.title.slice(-4) }
          </Text>
        </div>
        <Text
          align="center"
          className={ styles.Subtitle }
          color="white"
          component="span"
          size="xl"
        >
          { banner.subtitle }
        </Text>
        <div className={ styles.Buttons }>
          <Link
            className={ styles.Button }
            isButton
            size="xl"
            to={ banner.button.to }
            variant="outline"
          >
            { banner.button.text }
          </Link>
          <Link
            className={ styles.Button }
            isButton
            size="xl"
            to={ banner.accentButton.to }
            variant="filled"
          >
            { banner.accentButton.text }
          </Link>
        </div>
      </div>
      <div className={ styles.BreadShape }>
        <div />
        <div />
      </div>
    </div>
  );
};

BannerSection.defaultProps = defaultProps;

export default BannerSection;
