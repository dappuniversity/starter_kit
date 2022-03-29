import { Context } from 'react';

import { createContext } from 'utils/context';

import CrumbsContextType from './crumbsContextType';

const CONTEXT_NAME = 'Crumbs';

const defaultState: CrumbsContextType = {
  crumbs: [],
  accountCrumbs: [],
  crumb: undefined,
  isLoading: false,
  setDomain: () => {},
  setSessionId: () => {},
  getCrumbs: () => {},
  createCrumb: () => {},
};

const {
  Context: CrumbsContext,
  useContext: useCrumbsContext,
}: {
  Context: Context<CrumbsContextType>,
  useContext: Function,
} = createContext(CONTEXT_NAME, defaultState);

export default useCrumbsContext;
export {
  CrumbsContext,
};
