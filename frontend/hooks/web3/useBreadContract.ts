import { Contract } from 'web3-eth-contract';

import Bread from '../../../backend/abis/Bread.json';

import useContract from './useContract';

const useBreadContract = (): Contract | undefined => useContract(Bread);

export default useBreadContract;
