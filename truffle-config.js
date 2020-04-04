// `require("@babel/register")({
//   // This will override `node_modules` ignoring - you can alternatively pass
//   // an array of strings to be explicitly matched or a regex / glob
//   ignore: [],
// });
// require("@babel/polyfill");`

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
