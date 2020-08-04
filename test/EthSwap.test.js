const Token = artifacts.require('Token')
const EhtSwap = artifacts.require("EhtSwap");

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}


contract('EhtSwap', ([deployer, investor])=> {
  let token, ehtSwap

  before(async () => {
    token = await Token.new()
    ehtSwap = await EhtSwap.new(token.address)
    //
    await token.transfer(ehtSwap.address, tokens('1000000'))

  })
  describe('Token deployment', async() => {
    it('contract has a name', async () => {
      let token = await Token.new()
      const name = await token.name()
      assert.equal(name, 'DApp Token')
    })
  })

  describe('EhtSwap deployment', async() => {
    it('contract has a name', async () => {8
      const name = await ehtSwap.name()
      assert.equal(name, 'EhtSwap Instant Exchange')
    })

  it('contract has tokens', async () => {
    let balance = await token.balanceOf(ehtSwap.address)
    assert.equal(balance.toString(), tokens('1000000'))
  })

  })
  describe('buytokens()', async () => {
    let result

    before(async () => {
      result = await ehtSwap.buyTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    //
    })

    it('Allows user to instantly purchase tokens from ethSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await token.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'))

      let ehtSwapBalance
      ehtSwapBalance = await token.balanceOf(ehtSwap.address)
      assert.equal(ehtSwapBalance.toString(), tokens('999900'))
      ehtSwapBalance = await web3.eth.getBalance(ehtSwap.address)
      assert.equal(ehtSwapBalance.toString(), web3.utils.toWei('1', 'Ether'))

      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, token.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
    })
  })

})

