const SmartEstate = artifacts.require("SmartEstate");

module.exports = function(deployer) {
  deployer.deploy(SmartEstate);
};
