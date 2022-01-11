var bookRater = artifacts.require("./BookRater.sol");

module.exports = function(deployer) {
    deployer.deploy(bookRater);
  };