require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: 'ganache',
      port: 8545,
      network_id: '*', // Match any network id
      // gasPrice: 100000000000,
      // gas: 6721975, // gas limit,
    },
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './abis/',
  migrations_directory: './migrations/',
  test_directory: './tests',
  compilers: {
    solc: {
      version: '0.8.10',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    useColors: true,
  },
};
