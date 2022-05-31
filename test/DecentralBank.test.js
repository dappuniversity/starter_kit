const { assert } = require("chai");

const TetherToken = artifacts.require("TetherToken");
const RewardToken = artifacts.require("RewardToken");
const CustomToken = artifacts.require("CustomToken");
const DBank = artifacts.require("DBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

// contract("DBank", (accounts) => { below is a better way to right this

contract("DBank", async ([owner, investor]) => {
  //all dBank testing code will go here

  let tether, rewardToken, dBank, customToken, investorInitialBalance;
  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    // load contracts
    tether = await TetherToken.new();
    rewardToken = await RewardToken.new();
    customToken = await CustomToken.new();
    dBank = await DBank.new(
      rewardToken.address,
      tether.address,
      customToken.address
    ); // need to specify the params!
    investorInitialBalance = tokens("1000");
    // transfer all reward tokens to dBank
    await rewardToken.transfer(dBank.address, tokens("1000000"), {
      from: owner,
    });

    // transfer 1000 Tether to investor (accounts[1]?)
    await tether.transfer(investor, investorInitialBalance, {
      from: owner,
    });
  });

  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      console.log("name: " + name);
      assert.equal(name, "Tether");
    });
  });

  describe("Reward Token Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await rewardToken.name();
      assert.equal(name, "RewardToken");
    });
  });

  describe("DBank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await dBank.name();
      assert.equal(name, "Decentral Bank");
    });

    it("has all reward tokens", async () => {
      const dBankSupply = await rewardToken.balanceOf(dBank.address);
      assert.equal(dBankSupply, tokens("1000000"));
    });
  });

  describe("Yield Farming", async () => {
    // it("successful deposit", async () => {

    // });
    it("rewards tokens for staking", async () => {
      //simulate staking event
      // must approve token usage for DBank
      // then dBank can deposit

      let result;
      //check investor balance
      result = await tether.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("1000"),
        "customer mock wallet balance error"
      );

      //check staking for customer of 100 tokens
      await tether.approve(dBank.address, tokens("1000"), { from: investor });
      await dBank.depositTokens(tokens("1000"), {
        from: investor,
      });

      // check updated balance of customer
      result = await tether.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "customer mock wallet balance after staking 1000 tokens"
      );

      // check updated balance of bank
      result = await tether.balanceOf(dBank.address);
      assert.equal(
        result.toString(),
        tokens("1000"),
        "bank mock wallet balance after depositing 1000 tokens"
      );

      // issue reward tokens
      await dBank.issueRewardTokens({ from: owner });

      // investor should not be able to issue reward tokens, only owner can
      await dBank.issueRewardTokens({ from: investor }).should.be.rejected;

      // unstake tokens
      await dBank.unstakeTokens({ from: investor });

      // check unstaking balances
      result = await tether.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("1000"),
        "customer mock wallet balance after unstaking"
      );

      result = await dBank.isStaking(investor);
      assert.equal(
        result.toString(),
        "false",
        "customer staking status after unstaking"
      );

      result = await tether.balanceOf(dBank.address);
      assert.equal(
        result.toString(),
        "0",
        "dbank balance after investor unstaked"
      );
    });
  });
});
