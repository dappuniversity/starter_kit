import type RouteType from 'types/routeType';

import paths from './paths';

const routes: {
    home: RouteType,
    market: RouteType,
    baskets: RouteType,
    basket: RouteType,
    crumbs: RouteType,
    crumb: RouteType,
} = {
  home: {
    path: paths.home,
    label: 'Home',
  },
  market: {
    path: paths.market,
    label: 'Market',
  },
  baskets: {
    path: paths.baskets,
    label: 'Bakers',
    isPrivate: true,
  },
  basket: {
    path: paths.basket,
    label: 'Basket',
    isPrivate: true,
  },
  crumbs: {
    path: paths.crumbs,
    label: 'Pickers',
    isPrivate: true,
  },
  crumb: {
    path: paths.crumb,
    label: 'Crumbs',
    isPrivate: true,
  },
};

const navigatorRoutes = [
  routes.market,
  routes.baskets,
  routes.crumbs,
];

export default routes;

export {
  navigatorRoutes,
};
