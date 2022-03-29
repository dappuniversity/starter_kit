import { FC, MouseEventHandler } from 'react';
import {
  Burger,
  Button,
  Drawer,
  Grid,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Text,
} from '@mantine/core';
import { CardStackIcon } from '@radix-ui/react-icons';

import Link from 'components/elements/Link';
import { Account, Address } from 'components/entities';
import config from 'config';
import { paths } from 'config/routing';
import theme from 'config/theme';
import useAccountContext from 'contexts/account';
import { useToggleOpened } from 'hooks';

import Navigator from '../Navigator';

import styles from './Header.module.scss';

interface Props {
  isBurgerOpened: boolean,
  onBurgerClick: MouseEventHandler,
}

const defaultProps = {
  isBurgerOpened: false,
  onBurgerClick: () => {},
};

const Header: FC<Props> = ({ isBurgerOpened, onBurgerClick }: Props) => {
  const { account, login, disabled, isLoading } = useAccountContext();

  const {
    opened: accountDrawerOpened,
    open: openAccountDrawer,
    close: closeAccountDrawer,
  } = useToggleOpened();

  const loginButtonClickHandler: MouseEventHandler = () => {
    login();
    openAccountDrawer();
  };

  const isLogged = !!account?.address;
  const buttonHandler = isLogged ? openAccountDrawer : loginButtonClickHandler;

  return (
    <MantineHeader height={ 80 } padding="xl">
      <Grid
        align="center"
        className={ styles.Header }
        columns={ 24 }
        gutter="md"
        justify="space-between"
      >
        <MediaQuery largerThan="sm" styles={ { display: 'none' } }>
          <Grid.Col span={ 1 }>
            <Burger
              mr="xl"
              opened={ isBurgerOpened }
              size="sm"
              onClick={ onBurgerClick }
            />
          </Grid.Col>
        </MediaQuery>
        <Grid.Col sm={ 3 } span={ 4 }>
          <Link to={ paths.home }>
            <Group
              align="baseline"
              direction="row"
              spacing={ 0 }
            >
              <Text
                align="center"
                className={ styles.Title }
                component="span"
                gradient={ theme.accentGradient }
                size="xl"
                style={ { fontFamily: 'Anurati' } }
                transform="uppercase"
                variant="gradient"
              >
                { config.site.NAME.split(' ')[0] }
              </Text>
              <Text
                align="center"
                className={ styles.Title }
                component="span"
                gradient={ theme.accentGradient }
                size="xs"
                style={ { fontFamily: 'Anurati' } }
                transform="uppercase"
                variant="gradient"
              >
                { config.site.NAME.split(' ')[1] }
              </Text>
            </Group>
          </Link>
        </Grid.Col>
        <MediaQuery smallerThan="sm" styles={ { display: 'none' } }>
          <Grid.Col sm={ 20 } span={ 6 }>
            <div>
              <Navigator />
            </div>
          </Grid.Col>
        </MediaQuery>
        <Grid.Col sm={ 3 } span={ 6 }>
          <Button
            className={ styles.LoginButton }
            color="orange"
            disabled={ disabled }
            gradient={ theme.accentGradient }
            leftIcon={ isLogged && <CardStackIcon /> }
            loading={ isLoading }
            variant="outline"
            onClick={ buttonHandler }
          >
            { isLogged
              ? (
                <MediaQuery smallerThan="sm" styles={ { display: 'none' } }>
                  <Address>{account?.address}</Address>
                </MediaQuery>
              ) : 'Login'}
          </Button>
        </Grid.Col>
      </Grid>
      <Drawer
        opened={ accountDrawerOpened }
        padding="xs"
        size="md"
        onClose={ closeAccountDrawer }
      >
        <Account onLogout={ closeAccountDrawer } />
      </Drawer>
    </MantineHeader>
  );
};

Header.defaultProps = defaultProps;

export default Header;
