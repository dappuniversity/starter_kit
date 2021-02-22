const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
  //deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  //deploy EthSwap
  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed();

  //transfer all tokens to EthSwap (1 million)
  token.transfer(ethSwap.address, "1000000000000000000000000");
};
