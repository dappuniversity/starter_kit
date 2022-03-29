import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Space, Text,
  Title,
} from '@mantine/core';

import CrumbsTimeLine from 'components/groups/CrumbsTimeLine';
import useCrumbsContext from 'contexts/crumbs/crumbsContext';

import styles from './CrumbsPage.module.scss';

const CrumbsPage: NextPage = () => {
  const router = useRouter();
  const crumbsContext = useCrumbsContext();
  const { accountCrumbs, isLoading: isGetCrumbsLoading, error: getCrumbsError } = crumbsContext;
  const { domain } = router.query;

  if (accountCrumbs.length) {
    accountCrumbs[0].payments[1].paid = false;
    accountCrumbs = [...accountCrumbs, ...accountCrumbs];
  }

  useEffect(() => {
    crumbsContext.setDomain(domain);
  }, [domain]);

  return (
    <div className={ styles.CrumbsPage }>
      <Title order={ 1 }>CRUMBS</Title>
      <Space h="xl" />
      <div className={ styles.Content }>
        <CrumbsTimeLine
          crumbs={ accountCrumbs }
          isLoading={ isGetCrumbsLoading }
        />
        { !!getCrumbsError && <Text color="red">{ String(getCrumbsError) }</Text> }
      </div>
    </div>
  );
};

export default CrumbsPage;
