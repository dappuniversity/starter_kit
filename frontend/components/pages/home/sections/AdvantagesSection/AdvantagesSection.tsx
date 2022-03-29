import { FC } from 'react';
import {
  List, ThemeIcon,
} from '@mantine/core';
import { StarFilledIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';

import HighlightText from 'components/elements/HighlightText';
import theme from 'config/theme';
import players, { Player } from 'content/home/players';

import styles from './AdvantagesSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const ICON_GRADIENTS = [
  theme.darkGradient,
  theme.accentGradient,
  theme.whiteGradient,
];

const AdvantagesSection: FC<Props> = ({ className, id }) => {
  const advantagesSectionClassNames = classnames(styles.AdvantagesSection, className);

  const getIcon = (player: Player, index: number) => {
    const Icon = (player?.icons?.length > index) ? player?.icons[index] : StarFilledIcon;
    return <Icon />;
  };

  return (
    <div
      className={ advantagesSectionClassNames }
      id={ id }
    >
      <div className={ styles.Layout }>
        { [players[2], players[0], players[1]]
          .map((player: Player, playerIndex: number) => (
            <div
              key={ `player-${player.title}` }
            >
              <div
                className={ styles.Content }
              >
                <List
                  center
                  size="sm"
                  spacing="sm"
                >
                  { (player.advantages || []).map((advantage: string, index: number) => (
                    <List.Item
                      key={ `advantage-${advantage}` }
                    >
                      <ThemeIcon
                        className={ styles.Icon }
                        color="white"
                        gradient={ ICON_GRADIENTS[playerIndex] }
                        radius="xl"
                        size={ 70 }
                        variant="gradient"
                      >
                        { getIcon(player, index) }
                      </ThemeIcon>
                      <HighlightText
                        highlightClassName={ styles.Highlight }
                        highlightWords={
                        (player?.highlights?.length > index) ? player?.highlights[index] : []
                      }
                        size="xl"
                      >
                        { advantage }
                      </HighlightText>
                    </List.Item>
                  ))}
                </List>
              </div>
            </div>
          )) }
      </div>
    </div>
  );
};

AdvantagesSection.defaultProps = defaultProps;

export default AdvantagesSection;
