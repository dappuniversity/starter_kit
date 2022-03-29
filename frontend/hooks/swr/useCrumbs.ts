import useSWR, { SWRResponse } from 'swr';

import { contracts } from 'config/routing';
import useCrumbsService from 'hooks/services/useCrumbsService';
import { CrumbType } from 'types';
import { bigNumberToDate } from 'utils/date';
import { fromWei } from 'utils/web3';

const CRUMBS_REFRESH_INTERVAL = 60000;

const useCrumbs = (domain: string): SWRResponse & {
    crumbs: CrumbType[],
} => {
  const crumbsService = useCrumbsService();
  const fetchCrumbs = (_: any, _domain: string) => crumbsService.getCrumbs(_domain);

  const result: SWRResponse = useSWR(
    [contracts.crumbs.getCrumbs, domain],
    fetchCrumbs,
    { refreshInterval: CRUMBS_REFRESH_INTERVAL },
  );

  let crumbs: CrumbType[] = result.data || [];

  if (crumbs) {
    crumbs = crumbs
      .sort((crumb: any) => crumb.date - crumb.date)
      .map((crumb: any) => ({
        ...crumb,
        date: bigNumberToDate(crumb.date),
        payments: crumb.payments.map((payment: any) => ({
          ...payment,
          price: fromWei(String(payment.price)),
          date: bigNumberToDate(crumb.date),
        })),
      }));
  }

  return {
    ...result,
    crumbs,
  };
};

export default useCrumbs;
