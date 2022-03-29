import { FC } from 'react';
import { Space, Text } from '@mantine/core';
import classnames from 'classnames';

import Link from 'components/elements/Link';
import players, { Player } from 'content/home/players';

import styles from './PlayersSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const PlayersSection: FC<Props> = ({ className, id }) => {
  const playersSectionClassNames = classnames(styles.PlayersSection, className);

  return (
    <div
      className={ playersSectionClassNames }
      id={ id }
    >
      { players.map((player: Player) => (
        <div
          key={ `player-${player.title}` }
          className={ classnames(styles.PlayersCard, player.className) }
        >
          <div className={ styles.Title }>
            <Text size="xl">
              { 'BreadCrumbs for ' }
            </Text>
            <Text size="xl">
              { player.title }
            </Text>
          </div>
          <Text className={ styles.Subtitle } size="lg">
            { player.subtitle }
          </Text>
          <Space h="xl" />

          { /*
          <List
            center
            size="sm"
            spacing="sm"
          >
            { (player.advantages || []).map((advantage: string) => (
              <List.Item
                key={ `advantage-${advantage}` }
                className={ styles.Advantage }
                icon={ (
                  <ThemeIcon
                    color="white"
                    radius="xl"
                    size={ 24 }
                    variant="light"
                  >
                    <StarFilledIcon />
                  </ThemeIcon>
                ) }
              >
                { advantage }
              </List.Item>
            ))}
          </List>

                */ }
          { player.buttonText && player.buttonLink && (
            <Link
              className={ styles.LinkButton }
              color="dark"
              isButton
              to={ player.buttonLink }
            >
              { player.buttonText }
            </Link>
          ) }
        </div>
      ))}
    </div>
  );
};

PlayersSection.defaultProps = defaultProps;

export default PlayersSection;
