pragma solidity ^0.5.0;

import "./Token.sol";


/**
 * The EhtSwap contract does this and that...
 */
contract EhtSwap {
   string public name = "EhtSwap Instant Exchange";
   Token public token;
   uint public rate = 100;


   event TokenPurchase(
    address account,
    address token,
    uint amount,
    uint rate
    );


   constructor(Token _token) public {
    token = _token;
   }
   function buyTokens() public payable {
    uint tokenAmount = msg.value * rate;

    require(token.balanceOf(address(this)) >= tokenAmount);

    token.transfer(msg.sender, tokenAmount);

    emit TokenPurchase(msg.sender, address(token), tokenAmount, rate);
   }
}
