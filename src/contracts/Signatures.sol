pragma solidity ^0.5.0;

contract Signatures {
    string public name;
    uint public signatureCount = 0;
    mapping(uint => Signature) public signatures;

    struct Signature {
        uint id;
        address owner;
        uint attackVote;
        uint normalVote;
        string ipfsHash;
    }

    event SignatureAdded(
        uint id,
        address owner,
        uint attackVote,
        uint normalVote, 
        string ipfsHash
    );

    constructor() public {
        name = "Contract Deployed";
    }

    function addNewSignature(string memory _hash) public {
        // Require a valid hash
        require(bytes(_hash).length > 0);
        // Increment signature count
        signatureCount ++;
        // Create the product
        signatures[signatureCount] = Signature(signatureCount, msg.sender, 1, 0, _hash);
        // Trigger an event
        emit SignatureAdded(signatureCount, msg.sender, 1, 0, _hash);
    }

}
