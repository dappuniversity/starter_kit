// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import './TetherToken.sol';
import './RewardToken.sol';
import './CustomToken.sol';

// this contract will allow users/contracts to STAKE
contract DBank {
    address public owner;
    string public name = "Decentral Bank";
    RewardToken public rewardToken;
    TetherToken public tetherToken;
    CustomToken public customToken;
    
    address[] public stakers;

    mapping(address => uint256) public stakingBalances; // need this to keep track of stakers and balances
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RewardToken _rewardToken, TetherToken _tetherToken, CustomToken _customToken) public {
        rewardToken = _rewardToken;
        tetherToken = _tetherToken;
        customToken = _customToken;
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function depositTokens(uint _amount) public {
        require(_amount > 0, 'deposit amount cannot be 0');
        // require(address(this).balance >= 0, "no ether!");
        // transfer tether tokens to this contract for staking
        // but first we need to approve this bank to use Tether (if sender has not staked before)
        // need to transfer from the sender to the bank

        // check if they have already staked before
        // check if they currently are staking

        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
            // tetherToken.approve(address(this), _amount);
        }
        tetherToken.transferFrom(msg.sender, address(this), _amount);
        // update staking balance
        stakingBalances[msg.sender] = stakingBalances[msg.sender] + _amount;
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    // update staking balance
    function unstakeTokens() public {
        uint balance = stakingBalances[msg.sender];
        require(balance > 0, "unstake balance can't be less than 0");

        // transfer tokens from bank to the specified contract address
        tetherToken.transfer(msg.sender, balance);
        //update staking balance of msg.sender
        stakingBalances[msg.sender] -= balance;

        //update staking status
        isStaking[msg.sender] = false;
    }

    function issueRewardTokens() public onlyOwner {
         for (uint i = 0; i < stakers.length; i++){
            address recipient = stakers[i];
            // divide by 9 to create percentage incentive to stakers
            uint rewardAmount = stakingBalances[recipient] / 9;
            //transfer reward token to staker
            uint balance = stakingBalances[recipient];
            if(balance > 0){
                rewardToken.transfer(recipient, stakingBalances[recipient]);
            }
         }
    }

}