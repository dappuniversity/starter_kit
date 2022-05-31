// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract TetherToken{
    string public name = "Tether";
    string public symbol = "USDT";
    uint256 public totalSupply = 10000000000000000000000000; // 10 million tokens
    uint8 decimals = 18;

    event Transfer(address _from, address _to, uint value);
    event Approval(address _owner, address _spender, uint _value);
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        // sender must have enough to make transfer
        require(balanceOf[msg.sender] >= _value);
        // deduct value from sender balance
        balanceOf[msg.sender] -= _value;
        // add value to recipient balance
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success){
        // require(_value <= balanceOf[_from]);
        // require(_value <= allowance[_from][msg.sender]);
        // balanceOf[_from] -= _value;
        // balanceOf[_to] += _value;
        // allowance[_from][msg.sender] -= _value;
        // emit Transfer(_from, _to, _value);
        // return true;

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

    function approve(address _spender, uint256 _value) public returns(bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}