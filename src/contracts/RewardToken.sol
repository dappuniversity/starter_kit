// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract RewardToken {

    string public name = "RewardToken";
    string public symbol = "RWT";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 decimals = 18;
    mapping(address => uint256) public balanceOf; // balances of each holder
    mapping(address => mapping(address => uint256)) allowance;
    event Transfer(address _from, address _to, uint _value);
    event Approve(address _owner, address _sender, uint value);

    constructor() public {
        // upon creation of this token contract, set the creator's balance to the total supply
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns(bool success){
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _sender, uint _value) public returns(bool success){
        allowance[msg.sender][_sender] = _value;
        emit Approve(msg.sender, _sender, _value);
        return true;
    }
    function transferFrom(address _from, address _to, uint _value) public returns(bool success){
        require(balanceOf[_from] >= _value);

        if (_from != msg.sender && allowance[_from][msg.sender] != uint(-1)) {
            require(allowance[_from][msg.sender] >= _value);
            allowance[_from][msg.sender] -= _value;
        }

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(_from, _to, _value);
        return true;
    }
}