import { FC } from 'react';
import { Text } from '@mantine/core';
import classnames from 'classnames';

import Crumb from 'components/entities/Crumb';
import theme from 'config/theme';
import { example } from 'content/home';

import styles from './ExampleSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const ExampleSection: FC<Props> = ({ className, id }) => {
  const exampleSectionClassNames = classnames(styles.ExampleSection, className);

  return (
    <div
      className={ exampleSectionClassNames }
      id={ id }
    >
      <div className={ styles.Title }>
        <Text
          color="white"
          size="xl"
          weight={ 700 }
        >
          { example.title }
        </Text>
      </div>
      <div className={ styles.Title }>
        <Text
          color="white"
          size="md"
        >
          { example.description }
        </Text>
      </div>
      <div className={ styles.Example }>
        <Text
          gradient={ theme.primaryGradient }
          size="xl"
          variant="gradient"
          weight={ 700 }
        >
          { example.exampleTitle[0] }
        </Text>
        <Text
          color="white"
          size="xl"
          weight={ 700 }
        >
          { example.exampleTitle[1] }
        </Text>
        <Text
          gradient={ theme.primaryGradient }
          size="xl"
          variant="gradient"
          weight={ 700 }
        >
          { example.exampleTitle[2] }
        </Text>
      </div>
      <Crumb
        className={ styles.Crumb }
        data={ example.crumb }
        originDomain="picker-domain.com"
        useAnimations
      />
    </div>
  );
};

ExampleSection.defaultProps = defaultProps;

export default ExampleSection;
