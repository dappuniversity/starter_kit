const Signatures = artifacts.require('./Signatures.sol')

contract('Signatures', (accounts) => {
  let Signatures

  before(async () => {
    Signatures = await Signatures.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await Signatures.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await Signatures.name()
      assert.equal(name, 'Contract Deployed')
    })

  })
})