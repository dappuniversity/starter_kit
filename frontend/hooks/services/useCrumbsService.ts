import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import { connector } from 'config/web3';

import defaultCrumbsService, { CrumbsService } from '../../services/crumbsService';

const useCrumbsService = (): CrumbsService => {
  const { chainId } = useWeb3React();

  const [crumbsService, setCrumbService] = useState<CrumbsService>(defaultCrumbsService);

  const loadCrumbsService = useCallback(async () => {
    const { provider } = await connector.activate();

    setCrumbService(new CrumbsService(provider, chainId));
  }, [chainId]);

  useEffect(() => {
    loadCrumbsService();
  }, [loadCrumbsService, chainId]);

  return crumbsService;
};

export default useCrumbsService;
