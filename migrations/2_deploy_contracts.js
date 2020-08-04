const Token = artifacts.require("Token");
const EhtSwap = artifacts.require("EhtSwap");

module.exports = async function(deployer) {
  // DEPLOY
  await deployer.deploy(Token);
  const token = await Token.deployed()
// DEPLOY
  await deployer.deploy(EhtSwap, token.address);
  const ehtSwap = await EhtSwap.deployed()

// TRANSFER
  await token.transfer(ehtSwap.address, '1000000000000000000000000')
};
