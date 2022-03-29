import { KeyedMutator } from 'swr';

import CrumbType from 'types/crumbType';

interface CrumbsContextType {
  crumbs: CrumbType[],
  accountCrumbs: CrumbType[],
  crumb?: CrumbType,
  error?: any,
  isLoading: boolean,
  setDomain: Function,
  setSessionId: Function,
  getCrumbs: KeyedMutator<CrumbType[]> | Function,
  createCrumb: Function,
}

export default CrumbsContextType;
