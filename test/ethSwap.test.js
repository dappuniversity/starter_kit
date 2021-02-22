const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function etherToWei(n) {
  return web3.utils.toWei(n, "ether");
}

contract("EthSwap", ([deployer, investor]) => {
  let token, ethSwap;
  const tokenValue = etherToWei("1000000");
  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
    // ethSwap = await EthSwap.new(token.address);
    await token.transfer(ethSwap.address, tokenValue); //transfer 1 million tokens
  });
  describe("Token deployment", async () => {
    it("contract has a name", async () => {
      const name = await token.name();
      assert.equal(name, "DApp Token");
    });
  });
  describe("EthSwap deployment", async () => {
    it("contract has a name", async () => {
      const name = await ethSwap.name();
      assert.equal(name, "EthSwap Instants exchange");
    });
    it("contract has token", async () => {
      let balance = await token.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), tokenValue);
    });
  });
  describe('buyTokens()', async() => {
    let result;
    before(async()=>{
      //purchase tokens before each example
      result =  await ethSwap.buyTokens({from:investor, value:etherToWei('1')})
    })
    it('Allows users to instantly purchase tokens from ethSwap for a fixed price', async()=>{
      // check investor's token balance after purchase
      const  investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), etherToWei('100'));

      //check EthSwap balance after purchase
      const ethSwapTokenBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapTokenBalance.toString(), etherToWei('999900'));
      const ethSwapEtherBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapEtherBalance.toString(), etherToWei('1'))

     // check logs to ensure events was emitted with correct data 
      const events = result.logs[0].args;
      assert.equal(events.account,investor);
      assert.equal(events.token,token.address);
      assert.equal(events.amount.toString(), etherToWei('100').toString());
      assert.equal(events.rate.toString(),"100")
    })
  });
  describe('sellTokens()', async() => {
    let soldTokenResult;
    before(async()=>{
      // Investor must approve tokens before the seeling them.
      await token.approve(ethSwap.address,etherToWei('100'), {from:investor});
      // Investor sells tokens
     soldTokenResult = await ethSwap.sellTokens(etherToWei('100'), {from:investor});
     })
    it('Allows users to instantly sell tokens from ethSwap for a fixed price', async()=>{
     // check investor's balance
      const  investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), etherToWei('0'));

     //check EthSwap balance after purchase
      const ethSwapTokenBalance = await token.balanceOf(ethSwap.address);
      assert.equal(ethSwapTokenBalance.toString(), etherToWei('1000000'));
      const ethSwapEtherBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapEtherBalance.toString(), etherToWei('0'))

     // check logs to ensure events was emitted with correct data 
      const events = soldTokenResult.logs[0].args;
      assert.equal(events.account,investor);
      assert.equal(events.token,token.address);
      assert.equal(events.amount.toString(), etherToWei('100').toString());
      assert.equal(events.rate.toString(),"100");

      // FAILUR: Investor can't sell more tokens than they have
      await ethSwap.sellTokens(etherToWei('500'), {from:investor}).should.be.rejected
    })
    });  
});
