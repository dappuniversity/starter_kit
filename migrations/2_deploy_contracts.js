const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

module.exports = async function(deployer) {

    await deployer.deploy(Token);
    const token=await Token.deployed();

    await deployer.deploy(EthSwap);
    const ethSwap=await Token.deployed();

    await token.transfer(ethSwap.address,'1000000000000000000000000')
};
