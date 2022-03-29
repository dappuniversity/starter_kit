import { assert } from 'chai';
import { nanoid } from 'nanoid';
import truffleAssert from 'truffle-assertions';

import * as time from './time';
import { fromWei, toWei } from './utils';

const Bread = artifacts.require('Bread');
const Baskets = artifacts.require('Baskets');
const Crumbs = artifacts.require('Crumbs');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('Crumbs', accounts => {
  // Init
  let snapShot;
  let snapshotId;

  let breadToken;
  let basketsContract;
  let crumbsContract;

  // Fixtures
  const domain1 = 'test1.com';
  const domain2 = 'test2.com';
  const domain4 = 'test4.com';

  const basket1 = {
    account: accounts[1],
    domain: domain1,
    amount: toWei(100),
    price: toWei(5),
  };

  const basket2 = {
    account: accounts[2],
    domain: domain2,
    amount: toWei(100),
    price: toWei(2),
  };

  const basket3 = {
    account: accounts[3],
    domain: domain1,
    amount: toWei(100),
    price: toWei(8),
  };

  const basket4 = {
    account: accounts[4],
    domain: domain4,
    amount: toWei(500),
    price: toWei(50),
  };

  const baskets = [basket1, basket2, basket3, basket4];

  const userAccount1 = accounts[5];
  const userAccount2 = accounts[6];

  const sessionId1 = nanoid(8);
  const sessionId2 = nanoid(8);

  const initialAccountsAmount = 100;

  const waitingTime4h = 60 * 60 * 4; // 4 hours
  const waitingTime30h = 60 * 60 * 30; // 30 hours

  beforeEach(async () => {
    // Save blockchain snapshot
    snapShot = await time.takeSnapshot();
    snapshotId = snapShot.result;

    breadToken = await Bread.new();
    basketsContract = await Baskets.new(breadToken.address);
    crumbsContract = await Crumbs.new(breadToken.address, basketsContract.address);

    // Transfer 1000 BREAD to Crumbs contract
    await breadToken.transfer(crumbsContract.address, toWei(1000));

    // Transfer 100 BREAD to 1-5 demo accounts
    await breadToken.transfer(accounts[1], toWei(initialAccountsAmount), { from: accounts[0] });
    await breadToken.transfer(accounts[2], toWei(initialAccountsAmount), { from: accounts[0] });
    await breadToken.transfer(accounts[3], toWei(initialAccountsAmount), { from: accounts[0] });
    await breadToken.transfer(accounts[4], toWei(initialAccountsAmount), { from: accounts[0] });
    await breadToken.transfer(accounts[5], toWei(initialAccountsAmount), { from: accounts[0] });

    // Autorize spender and create basket 1
    await breadToken.approve.sendTransaction(basketsContract.address, basket1.amount, { from: basket1.account });
    await basketsContract.createBasket(basket1.domain, basket1.amount, basket1.price, { from: basket1.account });

    // Autorize spender and create basket 2
    await breadToken.approve.sendTransaction(basketsContract.address, basket2.amount, { from: basket2.account });
    await basketsContract.createBasket(basket2.domain, basket2.amount, basket2.price, { from: basket2.account });

    // Autorize spender and create basket 3
    await breadToken.approve.sendTransaction(basketsContract.address, basket3.amount, { from: basket3.account });
    await basketsContract.createBasket(basket3.domain, basket3.amount, basket3.price, { from: basket3.account });

    // Create basket 4 without autorization to spend BREAD tokens
    await basketsContract.createBasket(basket4.domain, basket4.amount, basket4.price, { from: basket4.account });
  });

  afterEach(async () => {
    await time.revertToSnapShot(snapshotId);
  });

  describe('Bread token deployment', async () => {
    it('has the name "Bread"', async () => {
      const name = await breadToken.name();
      assert.equal(name, 'Bread', 'Bread token deployed and with right name');
    });
  });

  describe('Baskets contract deployment', async () => {
    it('has the name "Baskets Contract" ', async () => {
      const name = await basketsContract.name();
      assert.equal(name, 'Baskets Contract', 'Baskets contract deployed and with right name');
    });
  });

  describe('Crumbs contract deployment', async () => {
    it('has the name "Crumbs Contract" ', async () => {
      const name = await crumbsContract.name();
      assert.equal(name, 'Crumbs Contract', 'Crumbs contract deployed and with right name');
    });

    it('has initial BREAD tokens" ', async () => {
      const balance = await breadToken.balanceOf(crumbsContract.address);
      assert.equal(balance.toString(), toWei(1000));
    });
  });

  describe('Crumb creation', async () => {
    it('can create a crumb with a single payment', async () => {
      const createCrumbTx = await crumbsContract.createCrumb(sessionId1, domain2, userAccount1);

      truffleAssert.eventEmitted(createCrumbTx,
        'CreateCrumbEvent',
        event => event.sessionId === sessionId1
          && event.domain === domain2
          && event.payments.some(payment => payment.fromAccount === basket2.account
            && payment.toAccount === userAccount1
            && payment.price.toString() === basket2.price
           && payment.paid === true)
          && event.paymentsCount.toString() === '1',
        'One single crumb is created with the right payment');
    });

    it('crumb creation persists', async () => {
      await crumbsContract.createCrumb(sessionId1, basket2.domain, userAccount1);

      const crumbs = await crumbsContract.getCrumbs.call(basket2.domain, { from: userAccount1 });

      assert.isTrue(crumbs.some(crumb => (
        crumb.sessionId === sessionId1
          && crumb.domain === basket2.domain
          && crumb.payments.some(payment => payment.fromAccount === basket2.account
            && payment.toAccount === userAccount1
            && payment.price.toString() === basket2.price
           && payment.paid === true
           && Number(payment.date) >= (Number(crumb.date) - 1000) && Number(payment.date) <= (Number(crumb.date) + 1000) // payment date +- 1s diifference crumb date
           && crumb.paymentsCount.toString() === '1'))),
      'Crumb created is retrieved from blockchain with the right payment');

      assert.equal(crumbs.length, 1);
    });

    it('can create a crumb with multiple payments', async () => {
      const createCrumbTx = await crumbsContract.createCrumb(sessionId1, domain1, userAccount1);

      truffleAssert.eventEmitted(createCrumbTx,
        'CreateCrumbEvent',
        event => event.sessionId === sessionId1
        && event.domain === domain1
        && event.payments.some(payment => payment.fromAccount === basket1.account
          && payment.toAccount === userAccount1
          && payment.price.toString() === basket1.price
          && payment.paid === true)
          && event.payments.some(payment => payment.fromAccount === basket3.account
            && payment.toAccount === userAccount1
            && payment.price.toString() === basket3.price
            && payment.paid === true)
        && event.paymentsCount.toString() === '2',
        'Crumb is created with two payments from different baskets');
    });

    it('can create a crumb with rejected payment (not approved)', async () => {
      const createCrumbTx = await crumbsContract.createCrumb(sessionId1, domain4, userAccount1);

      // Check crumb
      truffleAssert.eventEmitted(createCrumbTx,
        'CreateCrumbEvent',
        event => event.sessionId === sessionId1
        && event.domain === domain4
        && event.payments.some(payment => payment.fromAccount === basket4.account
          && payment.toAccount === userAccount1
          && payment.price.toString() === basket4.price
          && payment.paid === false)
        && event.paymentsCount.toString() === '1',
        'Crumb is created with a non paid payment');

      // Check balance
      const userBalance = await breadToken.balanceOf(userAccount1);
      assert.equal(fromWei(userBalance), initialAccountsAmount, 'User balance remains equal');
    });

    it('balances match when a crumb with multiple payments is created', async () => {
      const basketsDomain1 = baskets.filter(basket => basket.domain === domain1);

      let totalPrice = 0;
      await crumbsContract.createCrumb(sessionId1, domain1, userAccount1);

      await Promise.all(basketsDomain1.map(async basketDomain => {
        const basket = await basketsContract.getBasket.call(basketDomain.domain, { from: basketDomain.account });
        const balance = await breadToken.balanceOf(basketDomain.account);

        totalPrice += fromWei(basketDomain.price);
        assert.equal(
          fromWei(basket.amount),
          fromWei(basketDomain.amount) - fromWei(basketDomain.price),
          'Basket balance was updated (decreased)',
        );
        assert.equal(
          fromWei(balance),
          100 - fromWei(basketDomain.price),
          'Basket account balance was updated (decreased)',
        );
      }));

      const userBalance = await breadToken.balanceOf(userAccount1);
      assert.equal(
        fromWei(userBalance),
        initialAccountsAmount + totalPrice,
        'User account balance was updated (increased)',
      );
    });

    it('can create a new crumb with same sessionId after 24 hours', async () => {
      const waitingTime = waitingTime30h;

      // Create first crumb with sessionId1
      await crumbsContract.createCrumb(sessionId1, basket2.domain, userAccount1);
      const crumbs = await crumbsContract.getCrumbs.call(basket2.domain, { from: userAccount1 });
      const lastCrumbDate = Number(crumbs[0].date);

      // Await some time before creating second crumb
      await time.advanceTimeAndBlock(waitingTime);

      // Simulate creation of second crumb with sessionId1 from userAccount2
      const crumb = await crumbsContract.createCrumb.call(sessionId1, basket2.domain, userAccount2);

      // Check simulation response
      assert.isTrue(
        crumb.sessionId === sessionId1
        && crumb.domain === basket2.domain
        && Number(crumb.date) > lastCrumbDate,
        'Simulated creation returns the crumb with updated date',
      );
      assert.isTrue(crumb.payments.length === 2
          && crumb.payments.some(payment => payment.fromAccount === basket2.account
            && payment.toAccount === userAccount1
            && payment.price.toString() === basket2.price
           && payment.paid === true)
          && crumb.payments.some(payment => payment.fromAccount === basket2.account
            && payment.toAccount === userAccount2
            && payment.price.toString() === basket2.price
          && payment.paid === true)
          && Number(crumb.paymentsCount) === 2,
      'Simulated creation returns two payments for the two users');

      // Create second crumb with sessionId1 from userAccount2
      const createCrumbTx = await crumbsContract.createCrumb(sessionId1, basket2.domain, userAccount2);

      // Check create crumb event
      truffleAssert.eventEmitted(createCrumbTx,
        'CreateCrumbEvent',
        event => event.sessionId === sessionId1
          && event.domain === basket2.domain
          && Number(event.date) >= lastCrumbDate + waitingTime
          && Number(event.paymentsCount) === 2,
        'Crum creation event logs the crumb with updated date and two payments');

      // Check stored crumbs in blockchain
      const finalCrumbs = await crumbsContract.getCrumbs.call(basket2.domain);

      assert.isTrue(
        finalCrumbs.length === 1 && Number(finalCrumbs[0].paymentsCount) === 2,
        'One single crumb is recovered from blockchain with two payments',
      );
      assert.isTrue(
        Number(finalCrumbs[0].date) >= lastCrumbDate + waitingTime,
        'Crumb recovered has the date updated',
      );
      assert.isTrue(
        finalCrumbs[0].payments.some(payment => payment.toAccount === userAccount1),
        'Crumb recovered has a payment to user 1',
      );
      assert.isTrue(
        finalCrumbs[0].payments.some(payment => payment.toAccount === userAccount2),
        'Crumb recovered has a payment to user 2',
      );
    });

    it('cannot create a new crumb with same sessionId in less than 24 hours', async () => {
      const waitingTime = waitingTime4h;

      // Create first crumb with sessionId1
      await crumbsContract.createCrumb(sessionId1, basket2.domain, userAccount1);
      const crumbs = await crumbsContract.getCrumbs.call(basket2.domain, { from: userAccount1 });
      const lastCrumbDate = Number(crumbs[0].date);

      // Await some time before creating second crumb
      await time.advanceTimeAndBlock(waitingTime);

      // Simulate creation of second crumb with sessionId1
      const crumb = await crumbsContract.createCrumb.call(sessionId1, basket2.domain, userAccount1);

      // Check simulation response
      assert.isTrue(
        crumb.sessionId === sessionId1
        && crumb.domain === basket2.domain
        && Number(crumb.date) === lastCrumbDate,
        'Simulated creation returns the rejected crumb with old date (not updated)',
      );
      assert.isTrue(crumb.payments.length === 1
        && crumb.payments[0].fromAccount === basket2.account
          && crumb.payments[0].toAccount === userAccount1
          && crumb.payments[0].price === basket2.price
          && crumb.payments[0].paid === true
          && Number(crumb.paymentsCount) === 1,
      'Simulated creation returns one payments for the first user');

      // Create second crumb with sessionId1
      const createCrumbTx = await crumbsContract.createCrumb(sessionId1, basket2.domain, userAccount1);

      // Check event rejection
      truffleAssert.eventEmitted(createCrumbTx,
        'CrumbTimeRejectionEvent',
        event => event.crumb.sessionId === sessionId1
          && event.crumb.domain === basket2.domain
          && Number(event.crumb.date) >= lastCrumbDate + waitingTime
          && Number(event.hoursLeft) === 20,
        'Crumb rejection event logs updated time and right hours left');
    });
  });

  describe('Crumbs retrieval', async () => {
    it('can retrieve multiple crumbs', async () => {
      await crumbsContract.createCrumb(sessionId1, basket2.domain, userAccount1);
      await crumbsContract.createCrumb(sessionId2, basket2.domain, userAccount1);

      const crumbs = await crumbsContract.getCrumbs.call(basket2.domain, { from: userAccount1 });

      assert.isTrue(crumbs.some(crumb => (crumb.sessionId === sessionId1
          && crumb.domain === basket2.domain
          && crumb.payments.some(payment => payment.fromAccount === basket2.account
            && payment.toAccount === userAccount1
            && payment.price.toString() === basket2.price
           && payment.paid === true)
           && crumb.paymentsCount.toString() === '1'
      )),
      'First crumb retrieved from the blockchain with the right payment');

      assert.isTrue(crumbs.some(crumb => (crumb.sessionId === sessionId2
          && crumb.domain === basket2.domain
          && crumb.payments.some(payment => payment.fromAccount === basket2.account
            && payment.toAccount === userAccount1
            && payment.price.toString() === basket2.price
           && payment.paid === true)
           && crumb.paymentsCount.toString() === '1'
      )),
      'Second crumb retrieved from the blockchain with the right payment');

      assert.equal(crumbs.length, 2, 'Two crumbs are retrieved');
    });

    it('can retrieve multiple crumbs created with different baskets and accounts', async () => {
      await crumbsContract.createCrumb(sessionId1, domain1, userAccount1);
      await crumbsContract.createCrumb(sessionId1, basket2.domain, userAccount1);
      await crumbsContract.createCrumb(sessionId2, domain1, userAccount2);

      const checkUserAccount = userAccount2;
      const crumbs = await crumbsContract.getCrumbs.call(domain1, { from: checkUserAccount });

      assert.isTrue(crumbs.some(crumb => (
        crumb.sessionId === sessionId2
          && crumb.domain === basket1.domain
          && crumb.payments.some(payment => payment.fromAccount === basket1.account
            && payment.toAccount === checkUserAccount
            && payment.price.toString() === basket1.price
           && payment.paid === true))),
      'First crumb from basket 1 is retrieved with its payment');

      assert.isTrue(crumbs.some(crumb => (
        crumb.sessionId === sessionId2
          && crumb.domain === basket3.domain
          && crumb.payments.some(payment => payment.fromAccount === basket3.account
            && payment.toAccount === checkUserAccount
            && payment.price.toString() === basket3.price
          && payment.paid === true))),
      'Second crumb from basket 3 is retrieved with its payment');

      assert.equal(crumbs.length, 2, 'Two crumbs are retrieved');
    });

    it('retrieve crumbs from a domain with zero crumbs returns no results', async () => {
      const crumbs = await crumbsContract.getCrumbs.call(basket1.domain, { from: userAccount1 });

      assert.equal(crumbs.length, 0, 'Zero crumbs returned');
    });
  });
});
