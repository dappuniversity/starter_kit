import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import { paths, routes } from 'config/routing';
import useAccountContext from 'contexts/account';
import RouteType from 'types/routeType';

interface Props {
    children: ReactNode,
}

const defaultProps = {
};

const AuthRouter: FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  const { account, error } = useAccountContext();

  const checkPathIsPrivate = (path: string) => {
    const r = Object.values(routes).find((route: RouteType) => {
      if (typeof route.path === 'string') {
        return path === route.path;
      }
      return false;
    });
  };

  useEffect(() => {
    const isHomePath = router.pathname === paths.home;

    if (!isHomePath && (!account?.address || error)) {
      // router.replace(paths.home);
    }
  }, [router, account?.address, error]);

  return (
    <>
      { children }
    </>
  );
};

AuthRouter.defaultProps = defaultProps;

export default AuthRouter;
