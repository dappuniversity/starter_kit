import { Contract } from 'web3-eth-contract';

import Baskets from '../../../backend/abis/Baskets.json';

import useContract from './useContract';

const useBasketsContract = (): Contract | undefined => useContract(Baskets);

export default useBasketsContract;
