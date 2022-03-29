import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import { connector } from 'config/web3';
import useAccountContext from 'contexts/account/accountContext';

import defaultBasketsService, { BasketsService } from '../../services/basketsService';

const useBasketsService = (): BasketsService => {
  const { chainId } = useWeb3React();
  const { account } = useAccountContext();

  const [basketsService, setBasketService] = useState<BasketsService>(defaultBasketsService);

  const loadBasketsService = useCallback(async () => {
    const { provider } = await connector.activate();

    if (account?.address) setBasketService(new BasketsService(provider, chainId, account));
    else setBasketService(defaultBasketsService);
  }, [chainId, account]);

  useEffect(() => {
    loadBasketsService();
  }, [loadBasketsService, chainId, account]);

  return basketsService;
};

export default useBasketsService;
