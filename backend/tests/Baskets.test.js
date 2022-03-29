import { assert } from 'chai';
import { nanoid } from 'nanoid';
import truffleAssert from 'truffle-assertions';

import { toWei } from './utils';

const Bread = artifacts.require('Bread');
const Baskets = artifacts.require('Baskets');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('Baskets', accounts => {
  let breadToken;
  let basketsContract;

  // Initial data
  const domain0 = {
    name: 'test0.com',
    account: accounts[0],
  };
  const basket0 = {
    account: domain0.account,
    domain: domain0.name,
    amount: toWei(1000),
    price: toWei(1),
  };

  // Fixtures
  const domain1 = {
    name: 'test1.com',
    account: accounts[1],
  };
  const domain2 = {
    name: 'test2.es',
    account: accounts[2],
  };
  const domain3 = {
    name: 'test1.es',
    account: accounts[3],
  };

  const basket1 = {
    account: domain1.account,
    domain: domain1.name,
    amount: toWei(100),
    price: toWei(5),
  };

  const basket2 = {
    account: domain2.account,
    domain: domain2.name,
    amount: toWei(100),
    price: toWei(2),
  };

  const basket3 = {
    account: domain3.account,
    domain: domain3.name,
    amount: toWei(10000),
    price: toWei(1000),
  };

  const basket4 = {
    account: accounts[4],
    domain: domain1.name,
    amount: toWei(100),
    price: toWei(8),
  };

  const userAccount1 = accounts[5];

  const crumb1 = {
    sessionId: nanoid(8),
    domain: basket0.domain,
    date: '123456789',
    paymentsCount: 2,
  };

  const crumbWP1 = {
    ...crumb1,
    payments: [{
      fromAccount: basket0.account,
      toAccount: userAccount1,
      price: basket0.price,
      paid: false,
    },
    {
      fromAccount: basket2.account,
      toAccount: userAccount1,
      price: basket2.price,
      paid: false,
    }],
  };

  before(async () => {
  });

  beforeEach(async () => {
    breadToken = await Bread.new();
    basketsContract = await Baskets.new(breadToken.address);

    // Transfer 1000 BREAD to Crumbs contract
    await breadToken.transfer(basketsContract.address, toWei(1000));

    // Transfer 100 BREAD to first demo account
    await breadToken.transfer(accounts[1], toWei(100), { from: accounts[0] });

    // Transfer 100 BREAD to second demo account
    await breadToken.transfer(accounts[2], toWei(100), { from: accounts[0] });

    // Transfer 100 BREAD to fourth demo account
    await breadToken.transfer(accounts[4], toWei(100), { from: accounts[0] });

    await basketsContract.createBasket(basket0.domain, basket0.amount, basket0.price, { from: basket0.account });
  });

  describe('Bread token deployment', async () => {
    it('has the name "Bread"', async () => {
      const name = await breadToken.name();
      assert.equal(name, 'Bread');
    });
  });

  describe('Baskets contract deployment', async () => {
    it('has the name "Baskets Contract" ', async () => {
      const name = await basketsContract.name();
      assert.equal(name, 'Baskets Contract');
    });

    it('has initial BREAD tokens', async () => {
      const balance = await breadToken.balanceOf(basketsContract.address);
      assert.equal(balance.toString(), toWei(1000));
    });
  });

  describe('Basket creation', async () => {
    it('can create a new basket', async () => {
      const createBasketTx = await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });

      truffleAssert.eventEmitted(createBasketTx,
        'CreateBasketEvent',
        event => event.account === basket1.account
        && event.domain === basket1.domain
        && event.amount.toString() === basket1.amount
        && event.price.toString() === basket1.price);
    });

    it('basket creation persists', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });

      const basket = await basketsContract.getBasket.call(basket1.domain, { from: basket1.account });

      assert.equal(basket[0], basket1.account);
      assert.equal(basket[1], basket1.domain);
      assert.equal(basket[2], basket1.amount);
      assert.equal(basket[3], basket1.price);
    });

    it('can create a second basket', async () => {
      const createBasketTx = await basketsContract.createBasket(basket2.domain, basket2.amount, basket2.price, { from: basket2.account });

      truffleAssert.eventEmitted(createBasketTx,
        'CreateBasketEvent',
        event => event.account === basket2.account
        && event.domain === basket2.domain
        && event.account.toString() === basket2.account
        && event.price.toString() === basket2.price);
    });

    it('can create a basket in same domain', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });

      const createBasketTx = await basketsContract.createBasket(basket1.domain, basket1.amount, basket2.price, { from: basket2.account });

      truffleAssert.eventEmitted(createBasketTx,
        'CreateBasketEvent',
        event => event.account === basket2.account
        && event.domain === basket1.domain
        && event.account.toString() === basket2.account
        && event.price.toString() === basket2.price);

      const basketAccount1 = await basketsContract.getBasket.call(basket1.domain, { from: basket1.account });
      const basketAccount2 = await basketsContract.getBasket.call(basket1.domain, { from: basket2.account });

      assert(basketAccount1.account === accounts[1]);
      assert(basketAccount2.account === accounts[2]);
      assert(basketAccount1.domain === basketAccount2.domain);
    });

    it('basket count is being increased', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });

      const basketsCount = await basketsContract.countBaskets.call();

      assert.equal(basketsCount, 2);
    });

    it('cannot create a new basket with no amount', async () => {
      await basketsContract.createBasket(basket2.domain, 0, basket2.price, { from: basket2.account })
        .should.be.rejectedWith('Baskets Contract: Basket amount should be greater than 0');
    });

    it('cannot create a new basket with no price', async () => {
      await basketsContract.createBasket(basket2.domain, basket1.amount, 0, { from: basket2.account })
        .should.be.rejectedWith('Baskets Contract: Basket price should be greater than 0');
    });

    it('cannot create a new basket with a price greater than the amount', async () => {
      await basketsContract.createBasket(basket2.domain, basket1.amount, basket1.amount + toWei(1), { from: basket2.account })
        .should.be.rejectedWith('Baskets Contract: Basket amount should be greater or equal than price');
    });

    it('cannot create a new basket with no BREAD', async () => {
      await basketsContract.createBasket(basket3.domain, basket3.amount, basket3.price, { from: basket3.account })
        .should.be.rejectedWith('Baskets Contract: Insufficient BREAD to create a bread basket');
    });

    it('cannot create a new basket with previous start date', async () => {
      await basketsContract.createBasket(basket3.domain, basket3.amount, basket3.price, { from: basket3.account })
        .should.be.rejectedWith('Baskets Contract: Insufficient BREAD to create a bread basket');
    });

    it('cannot create existing basket', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });

      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account })
        .should.be.rejectedWith('Baskets Contract: Basket already exists');
    });
  });

  describe('Basket retrieval', async () => {
    it('can retrieve an existing basket', async () => {
      const basket = await basketsContract.getBasket.call(basket0.domain, { from: basket0.account });

      assert.equal(basket[0], basket0.account);
      assert.equal(basket[1], basket0.domain);
      assert.equal(basket[2], basket0.amount);
      assert.equal(basket[3], basket0.price);

      const getBasketTx = await basketsContract.getBasket(basket0.domain, { from: basket0.account });
      truffleAssert.eventEmitted(getBasketTx,
        'RetrieveBasketEvent',
        event => (event.account === basket0.account
          && event.domain === basket0.domain
          && event.amount.toString() === basket0.amount
          && event.price.toString() === basket0.price
        ));
    });

    it('can retrieve a new basket', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });

      const basket = await basketsContract.getBasket.call(basket1.domain, { from: basket1.account });

      assert.equal(basket[0], basket1.account);
      assert.equal(basket[1], basket1.domain);
      assert.equal(basket[2], basket1.amount);
      assert.equal(basket[3], basket1.price);

      const getBasketTx = await basketsContract.getBasket(basket1.domain, { from: basket1.account });
      truffleAssert.eventEmitted(getBasketTx,
        'RetrieveBasketEvent',
        event => (event.account === basket1.account
          && event.domain === basket1.domain
          && event.amount.toString() === basket1.amount
          && event.price.toString() === basket1.price
        ));
    });

    it('can not retrieve non existing basket', async () => {
      await basketsContract.getBasket(basket1.domain, { from: basket1.account })
        .should.be.rejectedWith('Baskets Contract: Basket not found');
    });
  });

  describe('Basket update', async () => {
    it('can update a basket', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });
      const updateAmount = toWei(80);
      const updatePrice = toWei(8);

      const basket = await basketsContract.updateBasket.call(basket1.domain, updateAmount, basket1.price, { from: basket1.account });

      assert.equal(basket[0], basket1.account);
      assert.equal(basket[1], basket1.domain);
      assert.equal(basket[2], updateAmount);
      assert.equal(basket[3], basket1.price);

      const updateBasketTx = await basketsContract.updateBasket(basket1.domain, basket1.amount, updatePrice, { from: basket1.account });
      truffleAssert.eventEmitted(updateBasketTx,
        'UpdateBasketEvent',
        event => (event.account === basket1.account
          && event.domain === basket1.domain
          && event.amount.toString() === basket1.amount
          && event.price.toString() === updatePrice
        ));
    });

    it('basket update persists', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });
      const updatePrice = toWei(8);

      await basketsContract.updateBasket(basket1.domain, basket1.amount, updatePrice, { from: basket1.account });
      const basket = await basketsContract.getBasket.call(basket1.domain, { from: basket1.account });

      assert.equal(basket[0], basket1.account);
      assert.equal(basket[1], basket1.domain);
      assert.equal(basket[2], basket1.amount);
      assert.equal(basket[3], updatePrice);
    });

    it('can not update non existing basket', async () => {
      const updatePrice = toWei(7);

      await basketsContract.updateBasket(basket1.domain, basket1.amount, updatePrice, { from: basket1.account })
        .should.be.rejectedWith('Baskets Contract: Basket not found');
    });

    it('cannot update a new basket with no amount', async () => {
      await basketsContract.createBasket(basket2.domain, basket2.amount, basket2.price, { from: basket2.account });

      await basketsContract.createBasket(basket2.domain, 0, basket2.price, { from: basket2.account })
        .should.be.rejectedWith('Baskets Contract: Basket amount should be greater than 0');
    });

    it('cannot update a new basket with no price', async () => {
      await basketsContract.createBasket(basket2.domain, basket2.amount, basket2.price, { from: basket2.account });

      await basketsContract.createBasket(basket2.domain, basket2.amount, 0, { from: basket2.account })
        .should.be.rejectedWith('Baskets Contract: Basket price should be greater than 0');
    });

    it('cannot update a new basket with a price greater than the amount', async () => {
      await basketsContract.createBasket(basket2.domain, basket2.amount, basket2.price, { from: basket2.account });

      await basketsContract.createBasket(basket2.domain, basket2.amount, basket2.amount + toWei(8), { from: basket2.account })
        .should.be.rejectedWith('Baskets Contract: Basket amount should be greater or equal than price');
    });

    it('cannot update a new basket with no BREAD', async () => {
      await basketsContract.createBasket(basket2.domain, basket2.amount, basket2.price, { from: basket2.account });
      await breadToken.transfer(accounts[0], toWei(100), { from: basket2.account });

      await basketsContract.updateBasket(basket2.domain, basket2.amount, basket2.price, { from: basket2.account })
        .should.be.rejectedWith('Baskets Contract: Insufficient BREAD to update a bread basket');
    });
  });

  describe('Basket delete', async () => {
    it('can delete an existing basket', async () => {
      const deleted = await basketsContract.deleteBasket.call(basket0.domain, { from: basket0.account });

      assert.equal(deleted, true);
    });

    it('can delete a new basket', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });

      const updateBasketTx = await basketsContract.deleteBasket(basket1.domain, { from: basket1.account });
      truffleAssert.eventEmitted(updateBasketTx,
        'DeleteBasketEvent',
        event => (event.account === basket1.account
          && event.domain === basket1.domain
        ));
    });

    it('basket deletion persists', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });
      await basketsContract.deleteBasket(basket1.domain, { from: basket1.account });

      await basketsContract.getBasket(basket1.domain, { from: basket1.account })
        .should.be.rejectedWith('Baskets Contract: Basket not found');
    });

    it('basket count is being decreased', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });
      const initialBasketCount = await basketsContract.countBaskets.call();

      await basketsContract.deleteBasket(basket1.domain, { from: basket1.account });
      const finalBasketCountt = await basketsContract.countBaskets.call();

      assert.equal(initialBasketCount, 2);
      assert.equal(finalBasketCountt, 1);
    });

    it('can not delete non existing basket', async () => {
      await basketsContract.deleteBasket(basket1.domain, { from: basket1.account })
        .should.be.rejectedWith('Baskets Contract: Basket not found');
    });
  });

  describe('Basket listing', async () => {
    it('can retrieve a list with all baskets', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });
      await basketsContract.createBasket(basket2.domain, basket2.amount, basket2.price, { from: basket2.account });
      await basketsContract.createBasket(basket4.domain, basket4.amount, basket4.price, { from: basket4.account });

      const baskets = await basketsContract.getAllBaskets.call({ from: basket0.account });

      assert.equal(baskets.length, 4);
      assert.isTrue(baskets.some(basket => (basket.account === basket0.account
        && basket.domain === basket0.domain
        && basket.amount === basket0.amount
        && basket.price === basket0.price)));
      assert.isTrue(baskets.some(basket => (basket.account === basket1.account
        && basket.domain === basket1.domain
        && basket.amount === basket1.amount
        && basket.price === basket1.price)));
      assert.isTrue(baskets.some(basket => (basket.account === basket2.account
        && basket.domain === basket2.domain
        && basket.amount === basket2.amount
        && basket.price === basket2.price)));
      assert.isTrue(baskets.some(basket => (basket.account === basket4.account
        && basket.domain === basket4.domain
        && basket.amount === basket4.amount
        && basket.price === basket4.price)));
    });

    it('can retrieve an empty list with no baskets', async () => {
      await basketsContract.deleteBasket(basket0.domain, { from: basket0.account });

      const baskets = await basketsContract.getAllBaskets.call({ from: basket0.account });

      assert.equal(baskets.length, 0);
    });
  });

  describe('Basket search', async () => {
    it('can find all baskets from a domain', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });
      await basketsContract.createBasket(basket4.domain, basket4.amount, basket4.price, { from: basket4.account });

      const baskets = await basketsContract.findBaskets.call(basket1.domain, { from: basket1.account });

      assert.isTrue(baskets.some(basket => (basket[0] === basket1.account
        && basket[1] === basket1.domain
        && basket[2] === basket1.amount
        && basket[3] === basket1.price)));
      assert.isTrue(baskets.some(basket => (basket[0] === basket4.account
         && basket[1] === basket4.domain
         && basket[2] === basket4.amount
         && basket[3] === basket4.price)));

      const findBasketsTx = await basketsContract.findBaskets(basket1.domain, { from: basket0.account });
      truffleAssert.eventEmitted(findBasketsTx,
        'BasketsFoundEvent',
        event => (event.domain === basket1.domain
          && event.count.toString() === '2'));
    });

    it('find baskets from a domain with zero baskets returns no results', async () => {
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });
      await basketsContract.createBasket(basket4.domain, basket4.amount, basket4.price, { from: basket4.account });

      const baskets = await basketsContract.findBaskets.call(basket2.domain, { from: basket1.account });

      assert.equal(baskets.length, 0);
    });
  });

  describe('Crumb payment', async () => {
    it('can pay a crumb from basket owner account', async () => {
      await breadToken.approve.sendTransaction(basketsContract.address, basket0.amount, { from: basket0.account });
      const payTx = await basketsContract.pay(crumb1, crumbWP1.payments[0]);

      truffleAssert.eventEmitted(payTx,
        'PaymentEvent',
        event => (event.fromAccount === basket0.account
          && event.toAccount === userAccount1
          && event.price.toString() === basket0.price
          && event.paid === true
        ));
    });

    it('cannnot pay a crumb if crumb and basket prices mismatch', async () => {
      await basketsContract.pay(crumb1, { ...crumbWP1.payments[0], price: toWei(3) })
        .should.be.rejectedWith('Baskets Contract: Crumb payment and basket price mismatch');
    });

    it('cannnot pay a crumb with no BREAD in basket', async () => {
      await breadToken.approve.sendTransaction(basketsContract.address, basket0.amount, { from: basket0.account });
      await basketsContract.updateBasket(basket0.domain, toWei(1.5), basket0.price, { from: basket0.account });
      await basketsContract.pay(crumb1, crumbWP1.payments[0]);

      await basketsContract.pay(crumb1, crumbWP1.payments[0])
        .should.be.rejectedWith('Baskets Contract: Not enought BREAD in basket to perform the payment');
    });

    it('cannnot pay a crumb with no BREAD in origin account', async () => {
      await breadToken.approve.sendTransaction(basketsContract.address, basket1.amount, { from: basket1.account });
      await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });
      await breadToken.transfer(accounts[0], toWei(100), { from: basket1.account });

      await basketsContract.pay(
        { ...crumb1, domain: basket1.domain },
        { ...crumbWP1.payments[0], fromAccount: basket1.account, price: basket1.price },
      )
        .should.be.rejectedWith('Baskets Contract: Not enought BREAD in origin account to perform the payment');
    });

    it('cannnot pay a crumb if contract account is not allowed by origin account', async () => {
      await basketsContract.pay(crumb1, crumbWP1.payments[0])
        .should.be.rejectedWith('Returned error: VM Exception while processing transaction: revert');
    });
  });
});
