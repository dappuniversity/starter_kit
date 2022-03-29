const Bread = artifacts.require('Bread');
const Baskets = artifacts.require('Baskets');
const Crumbs = artifacts.require('Crumbs');

module.exports = async (deployer, _network, accounts) => {
  // Deploy Bread Token contract
  await deployer.deploy(Bread);
  const breadToken = await Bread.deployed();

  // Deploy BreadBaskets contract
  await deployer.deploy(Baskets, breadToken.address);
  const basketsContract = await Baskets.deployed();

  // Deploy Crumbs contract
  await deployer.deploy(Crumbs, breadToken.address, basketsContract.address);
  const crumbsContract = await Crumbs.deployed();

  // Transfer 1000 BREAD to Baskets contract
  await breadToken.transfer(basketsContract.address, '1000000000000000000000');

  // Transfer 1000 BREAD to Crumbs contract
  await breadToken.transfer(crumbsContract.address, '1000000000000000000000');

  // Transfer 100 BREAD to first demo account
  await breadToken.transfer(accounts[1], '100000000000000000000');
};
