// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract CustomToken {
    //state variables
    string public name = "My Custom Token";
    string public symbol = "MCT";
    uint256 public totalSupply = 1000000000000000000000;
    uint8 decimals = 18;
    
    mapping(address => uint) balanceOf;
    mapping(address => mapping(address => uint)) allowances;

    //events
    event Transfer(address _from, address _to, uint _value);
    event Approval(address _owner, address _spender, uint _value);

    //modifiers

    //constructor
    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    //functions
    function transfer(address _to, uint _value) public returns(bool success){
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public returns(bool success){
        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns(bool success){
        require(allowances[_from][msg.sender]>= _value);
        require(balanceOf[_from] >= _value);
        allowances[_from][msg.sender] -= _value;
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        return true;
    }
}