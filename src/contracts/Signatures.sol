pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Signatures {
    string public name;
    uint public signatureCount = 0;
    Signature[] signatures;

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
        signatures.push(Signature(signatureCount, msg.sender, 1, 0, _hash));
        // Trigger an event
        emit SignatureAdded(signatureCount, msg.sender, 1, 0, _hash);
    }

    function getFiles() public view returns (Signature[] memory) {
        return signatures;
    }

    

}
