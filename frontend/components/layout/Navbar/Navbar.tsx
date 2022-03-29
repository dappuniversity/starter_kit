import { FC } from 'react';
import { Divider, Group, Navbar as MantineNavbar, ScrollArea } from '@mantine/core';

import Link from 'components/elements/Link';
import { Account } from 'components/entities';
import { navigatorRoutes } from 'config/routing/routes';
import useAccountContext from 'contexts/account/accountContext';

import styles from './Navbar.module.scss';

interface Props {
  isOpened: boolean,
}

const defaultProps = {
  isOpened: false,
};

const Navbar: FC<Props> = ({ isOpened }) => {
  const { account } = useAccountContext();

  return (
    <MantineNavbar
      className={ styles.Navbar }
      fixed
      hidden={ !isOpened }
      hiddenBreakpoint={ 4096 } // Hides navbar when viewport size is less than value specified in hiddenBreakpoint (always)
      padding="xs" // Breakpoint at which navbar will be hidden if hidden prop is true
      position={ { top: 80, left: 0 } }
      width={ { base: 400, sm: 200 } }
    >
      { account.address && (
        <>
          <MantineNavbar.Section>
            <Account />
          </MantineNavbar.Section>
          <Divider />
        </>
      ) }
      <MantineNavbar.Section
        component={ ScrollArea }
        grow
        mt="lg"
      >
        <Group direction="column">
          { navigatorRoutes.map(route => (
            <Link
              key={ `nav-${route.path}` }
              isButton
              isDisabled={ route.isPrivate && !account?.address }
              to={ route.path }
            >
              { route.label }
            </Link>
          ))}
        </Group>
      </MantineNavbar.Section>

    </MantineNavbar>
  );
};

Navbar.defaultProps = defaultProps;

export default Navbar;
