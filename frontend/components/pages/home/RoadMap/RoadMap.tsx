import { FC } from 'react';
import {
  Card, List,
  Space, Text, ThemeIcon, Timeline,
} from '@mantine/core';
import { CheckIcon, TimerIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';

import theme from 'config/theme';
import { Road, RoadStep } from 'content/home/roadMap';

import styles from './RoadMap.module.scss';

type Props = {
  road: Road,
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const COLOR_TO_GRADIENT = {
  [String(theme.mantine.primaryColor)]: theme.primaryGradient,
  [theme.accentColor]: theme.accentGradient,
};

const RoadMap: FC<Props> = ({ road, className, id }) => {
  const roadMapClassNames = classnames(styles.RoadMap,
    { [styles.Accent]: road.color === theme.accentColor },
    className);

  return (
    <Card
      className={ roadMapClassNames }
      id={ id }
      padding="xl"
      radius="xl"
    >
      <Text
        className={ styles.Target }
        gradient={ road.color ? COLOR_TO_GRADIENT[road.color] : undefined }
        size="xl"
        style={ { fontFamily: 'Blessed Light' } }
        variant="gradient"
        weight={ 700 }
      >
        { road.target }
      </Text>
      <Space h="xl" />
      <Timeline
        active={ road.steps.length }
        bulletSize={ 20 }
        className={ styles.TimeLine }
        color="white"
        lineWidth={ 2 }
      >
        { road.steps.map((roadStep: RoadStep, roadIndex: number) => (
          <Timeline.Item
            key={ `roadStep-${roadStep.title}` }
            title={ roadStep.title }
          >
            { roadStep.date && (
              <Text
                color={ road.color }
                size="lg"
                weight={ 700 }
              >
                { roadStep.date }
              </Text>
            ) }
            <Space h="sm" />
            <List
              center
              size="sm"
              spacing="sm"
            >
              { roadStep.features.map((feature: string) => (
                <List.Item
                  key={ `feature-${feature}` }
                  className={ styles.Feature }
                  icon={ (
                    <ThemeIcon
                      color={ road.color }
                      radius="xl"
                      size={ 24 }
                      variant="light"
                    >
                      { roadIndex === 0 ? <CheckIcon /> : <TimerIcon />}
                    </ThemeIcon>
                ) }
                >
                  { feature }
                </List.Item>
              ))}
            </List>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

RoadMap.defaultProps = defaultProps;

export default RoadMap;
