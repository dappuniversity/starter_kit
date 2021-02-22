pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instants exchange";
    Token public token;
    uint256 rate = 100;
    event TokensPurchase(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event TokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        //calculate the number of tokens to buy
        uint256 tokenAmount = rate * msg.value;
        
        // requires that EthSwap has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);// note the 'this' refferences the contract address (ie EthSwap address)
        
        //transfer token to user
        token.transfer(msg.sender, tokenAmount);
        
        //Emit an event
        emit TokensPurchase(msg.sender, address(token), tokenAmount, rate);
    }
   
    function sellTokens(uint _amount) public {
        // users can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);
        //calculate the number of ether to redeem
        uint256 etheAmount =  _amount / rate;
        
        // requires that EthSwap has enough ethers
        require(address(this).balance >= etheAmount);// note the 'this' refferences the contract address (ie EthSwap address)
        
        //transfer token to user
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etheAmount);

        //Emit an event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}
