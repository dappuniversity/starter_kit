const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = function (deployer) {
    deployer.deploy(Token);

    deployer.deploy(EthSwap);
};
