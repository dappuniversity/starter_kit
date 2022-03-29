import { FC, useCallback, useMemo, useState } from 'react';

import useAccountContext from 'contexts/account';
import useCrumbsService from 'hooks/services/useCrumbsService';
import useCrumbs from 'hooks/swr/useCrumbs';
import { CrumbType, PaymentType } from 'types';

import { CrumbsContext } from './crumbsContext';
import CrumbsContextType from './crumbsContextType';

const CrumbsProvider: FC = ({ children }) => {
  const crumbsService = useCrumbsService();
  const { account } = useAccountContext();
  const [listDomain, setListDomain] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');

  const {
    data, crumbs, error, mutate,
  } = useCrumbs(listDomain);

  const isLoading = !data && !error;

  const accountCrumbs: CrumbType[] = (account.address && crumbs)
    ? crumbs.filter(crumb => crumb.payments
      .some((payment: PaymentType) => payment.toAccount.toUpperCase() === account.address?.toUpperCase()
      || payment.fromAccount.toUpperCase() === account.address?.toUpperCase()))
    : [];

  const crumb = useMemo(() => crumbs
    .find((_crumb: CrumbType) => _crumb.sessionId === sessionId), [crumbs, sessionId]);

  const createCrumb = useCallback(async (
    _sessionId: string,
    _domain: string,
    _account: string,
  ) => {
    // Update local crumbs temporally without revalidation
    const tempCrumbs: CrumbType[] = [
      ...crumbs,
      {
        sessionId: _sessionId,
        domain: _domain,
        date: new Date(),
        payments: [],
        paymentsCount: 0,
      },
    ];
    mutate(tempCrumbs, false);

    try {
      // Revalidate data with a client request
      const result = await crumbsService.createCrumb(_sessionId, _domain, _account);

      // Update data with a client request
      mutate();

      return result;
    } catch (createError) {
      // Local data rollback
      mutate(crumbs, false);
      throw (createError);
    }
  }, [crumbsService, crumbsService.createCrumb, mutate, crumbs]);

  const contextValue: CrumbsContextType = {
    crumbs,
    accountCrumbs,
    crumb,
    error,
    isLoading,
    setDomain: setListDomain,
    setSessionId,
    getCrumbs: mutate,
    createCrumb,
  };

  return (
    <CrumbsContext.Provider
      value={ contextValue }
    >
      { children }
    </CrumbsContext.Provider>
  );
};

export default CrumbsProvider;
