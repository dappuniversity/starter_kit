import { FC } from 'react';
import {
  Card, Group, Space, Text,
} from '@mantine/core';
import classnames from 'classnames';

import Link from 'components/elements/Link';
import theme from 'config/theme';
import { HowItWorksCardInfo } from 'content/home/howItWorks';

import styles from './HowItWorksCard.module.scss';

type Props = {
  className?: string,
  info: HowItWorksCardInfo,
};

const defaultProps = {
  className: '',
};

const GRADIENT_TO_COLOR = {
  [theme.primaryGradient.from]: 'cyan',
  [theme.accentGradient.from]: 'orange',
  [theme.whiteGradient.from]: 'cyan',
};

const GRADIENT_TO_BUTTON_CLASSNAME = {
  [theme.primaryGradient.from]: styles.LinkButtonPrimary,
  [theme.accentGradient.from]: styles.LinkButtonAccent,
  [theme.whiteGradient.from]: styles.LinkButtonPrimary,
};

const HowItWorksCard: FC<Props> = ({ className, info }) => {
  const bakerClassnames = classnames(styles.HowItWorksCard, className);
  const shapeClassName = styles[info.shapeClassName || 'BreadShape'] || styles.BreadShape;

  return (
    <Card
      className={ bakerClassnames }
      padding="xl"
      radius="lg"
    >
      <div className={ styles.Title }>
        <Text
          gradient={ info.gradient }
          size="xl"
          variant="gradient"
          weight={ 700 }
        >
          { info.title }
        </Text>
      </div>
      <Text
        color="dimmed"
        weight={ 700 }
      >
        { info.subtitle }
      </Text>
      <Space h="sm" />
      { info.steps.map(step => (
        <>
          <Space h="lg" />
          <Group className={ styles.Step }>
            <Text
              gradient={ info.gradient }
              size="xl"
              variant="gradient"
              weight={ 700 }
            >
              { step.step }
            </Text>
            <Text>{ step.text }</Text>
          </Group>
        </>
      ))}
      <Space h="lg" />
      <Space h="md" />
      { info.linkButton && (
        <Group grow>
          <Link
            className={ info.gradient?.from ? GRADIENT_TO_BUTTON_CLASSNAME[info.gradient?.from] : undefined }
            color={ info.gradient?.from ? GRADIENT_TO_COLOR[info.gradient?.from] : undefined }
            isButton
            to={ info.linkButton.to }
            variant="outline"
          >
            { info.linkButton.label }
          </Link>
        </Group>
      ) }
      <div className={ shapeClassName }>
        <div />
        <div />
      </div>
    </Card>
  );
};

HowItWorksCard.defaultProps = defaultProps;

export default HowItWorksCard;
