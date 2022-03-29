import { FC } from 'react';
import { Group } from '@mantine/core';

import Link from 'components/elements/Link';
import { navigatorRoutes } from 'config/routing/routes';
import useAccountContext from 'contexts/account/accountContext';

import styles from './Navigator.module.scss';

type Props = {
};

const Navigator: FC<Props> = () => {
  const { account } = useAccountContext();

  return (
    <nav key="navLinks" className={ styles.Navigator }>
      <div>
        <Group position="right" spacing="xl">
          { navigatorRoutes.map(route => (
            <div key={ `nav-${route.path}` }>
              <Link
                isButton
                isDisabled={ route.isPrivate && !account?.address }
                to={ String(route.path) }
              >
                { route.label }
              </Link>
            </div>
          ))}
        </Group>
      </div>
    </nav>
  );
};

export default Navigator;
