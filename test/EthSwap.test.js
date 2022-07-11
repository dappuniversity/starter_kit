const { assert } = require('chai');


const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('EthSwap',(accounts)=>{
    let token,ethSwap
    before(async ()=>{
        token = await Token.new()
        ethSwap = await EthSwap.new()
        await token.transfer(ethSwap.address,'1000000000000000000000000')
    })

    describe('Token deployment',async()=>{
        it('contract has a name',async()=>{
            const name=await token.name()
            assert.equal(name,'DApp Token')
        })
    })
    describe('EthSwap deployment',async()=>{
        it('contract has a name',async()=>{
            const name=await ethSwap.name()
            assert.equal(name,'EthSwap Instant Exchange')
        })

        it('contract has tokens',async()=>{
            let balance=await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(),'1000000000000000000000000')
        })
    })
})