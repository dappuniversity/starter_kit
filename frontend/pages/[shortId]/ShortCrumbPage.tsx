import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Crumb from 'components/entities/Crumb';
import useCrumbsContext from 'contexts/crumbs/crumbsContext';
import { LinkType } from 'pages/api/links/[account]/[domain]';
import { getLink } from 'pages/api/links/short/[shortId]';
import { domainToUrl } from 'utils/string';

import styles from './ShortCrumbPage.module.scss';

const ShortCrumbPage: NextPage = () => {
  const router = useRouter();
  const { shortId } : { shortId: string } = router.query;
  const crumbsContext = useCrumbsContext();
  const { crumb } = crumbsContext;
  const [crumbCreated, setCrumbCreated] = useState<boolean>(false);
  const [link, setLink] = useState<LinkType>();

  const createFingerPrint = async () => {
    const { ClientJS } = (await import('clientjs')).default;

    const client = new ClientJS();
    const fingerPrint = client.getFingerprint();
    return String(fingerPrint);
  };

  const createCrumb = useCallback(async () => {
    const _sessionId = await createFingerPrint();

    if (!_sessionId || !shortId) return;

    try {
      const _link = await getLink(shortId);
      setLink(_link);
      if (!_link) throw Error(`no link id found fort short ID '${shortId}'`);
      crumbsContext.setDomain(_link.domain); // Use this domain to retrieve related crumbs

      const isCrumbcreated = await crumbsContext.createCrumb(_sessionId, _link.domain, _link.account);
      if (isCrumbcreated) alert(domainToUrl(_link.domain));

      setCrumbCreated(isCrumbcreated);
      crumbsContext.setSessionId(_sessionId);
      crumbsContext.getCrumbs(); // Trigger crumbs update for selected domain and filter with sessionId in CrumbsContext
    } catch (error) {
      console.error(error);
    }
  }, [crumbsContext, shortId]);

  useEffect(() => {
    if (shortId && !crumbCreated) {
      createCrumb();
      router.replace(domainToUrl(link?.url));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortId, crumbCreated]);

  return (
    <div className={ styles.CrumbPage }>
      <h1>Crumb</h1>
      { !!crumb && (
        <Crumb className={ styles.Crumb } data={ crumb } />
      )}
    </div>
  );
};

export default ShortCrumbPage;
