import { FC, MouseEventHandler, ReactNode, useState } from 'react';
import { AppShell } from '@mantine/core';

import Footer from '../Footer';
import Header from '../Header';
import Navbar from '../Navbar';

import styles from './AppLayout.module.scss';

interface Props {
    children: ReactNode,
}

const AppLayout: FC<Props> = ({ children }) => {
  const [isNavbarOpened, setNavbarOpened] = useState(false);

  const toggleNavbar: MouseEventHandler = () => setNavbarOpened(!isNavbarOpened);

  return (
    <>
      <AppShell
        className={ styles.AppLayout }
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
        fixed
      // fixed prop on AppShell will be automatically added to Header and Navbar
        header={ (
          <Header
            isBurgerOpened={ isNavbarOpened }
            onBurgerClick={ toggleNavbar }
          />
      ) }
        navbar={ (
          <Navbar isOpened={ isNavbarOpened } />
      ) }
        navbarOffsetBreakpoint="xs"
      >
        { children }
      </AppShell>
      <Footer />
    </>
  );
};

export default AppLayout;
