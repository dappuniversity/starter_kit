const TetherToken = artifacts.require("TetherToken");
const RewardToken = artifacts.require("RewardToken");
const CustomToken = artifacts.require("CustomToken");
const DBank = artifacts.require("DBank");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(TetherToken);
  const tether = await TetherToken.deployed();

  //deploy reward contract
  await deployer.deploy(RewardToken);
  const rewardToken = await RewardToken.deployed();

  //deploy custom token
  await deployer.deploy(CustomToken);
  const customToken = await CustomToken.deployed();

  // deploy decentral bank contract
  await deployer.deploy(
    DBank,
    rewardToken.address,
    tether.address,
    customToken.address
  );
  const dBank = await DBank.deployed();

  //transfer all reward tokens to decentral bank
  await rewardToken.transfer(dBank.address, "1000000000000000000000000");
  const bankBalanceRWT = await rewardToken.balanceOf(dBank.address);
  console.log("Bank balance (RWD): " + bankBalanceRWT);
  // distribute 1000 tether tokens to investor
  await tether.transfer(accounts[1], "1000000000000000000000");
};
