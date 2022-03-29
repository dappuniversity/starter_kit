import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Crumb from 'components/entities/Crumb';
import useCrumbsContext from 'contexts/crumbs/crumbsContext';
import { domainToUrl } from 'utils/string';

import styles from './CrumbPage.module.scss';

const CrumbPage: NextPage = () => {
  const router = useRouter();
  const { domain, account } = router.query;
  const crumbsContext = useCrumbsContext();
  const { crumb } = crumbsContext;
  const [crumbCreated, setCrumbCreated] = useState<boolean>(false);

  const createFingerPrint = async () => {
    const { ClientJS } = (await import('clientjs')).default;

    const client = new ClientJS();
    const fingerPrint = client.getFingerprint();
    return String(fingerPrint);
  };

  const createCrumb = useCallback(async () => {
    const _sessionId = await createFingerPrint();

    if (!_sessionId || !account) return;

    try {
      const isCrumbcreated = await crumbsContext.createCrumb(_sessionId, domain, account);
      if (isCrumbcreated) alert(domainToUrl(domain));
      setCrumbCreated(isCrumbcreated);
      crumbsContext.setSessionId(_sessionId);
      crumbsContext.getCrumbs(); // Trigger crumbs update for selected domain and filter with sessionId in CrumbsContext
    } catch (error) {
      console.error(error);
    }
  }, [crumbsContext, domain, account]);

  useEffect(() => {
    crumbsContext.setDomain(domain); // Use this domain to retrieve related crumbs

    if (domain && account && !crumbCreated) {
      createCrumb();
      router.replace(domainToUrl(domain));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, crumbCreated]);

  return (
    <div className={ styles.CrumbPage }>
      <h1>Crumb</h1>
      { !!crumb && (
        <Crumb className={ styles.Crumb } data={ crumb } />
      )}
    </div>
  );
};

export default CrumbPage;
