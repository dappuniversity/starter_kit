const EthSwap = artifacts.require("EthSwap"); //import contracts (name is the contract name)
const Token = artifacts.require("Token");

module.exports =  async function(deployer) { 

  deployer.deploy(EthSwap); 
  const ethSwapContract = await EthSwap.deployed() //getting the contract json

  deployer.deploy(Token);
  const tokenContract = await Token.deployed() //getting the contract json
  await tokenContract.transfer(ethSwapContract.address,'1000000000000000000000000')
};
