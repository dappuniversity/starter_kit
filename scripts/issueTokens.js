const decentralBank = artifacts.require("DBank");

module.exports = async function issueRewards(callback) {
  let dBank = await decentralBank.deployed();
  await dBank.issueRewardTokens();
  console.log("Reward tokens have been issued successfully");
  callback();
};
