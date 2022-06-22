const Signatures = artifacts.require("Signatures");

module.exports = function(deployer) {
  deployer.deploy(Signatures);
};