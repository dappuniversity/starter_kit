pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;



contract Signatures {
    string public name;
    uint public signatureCount = 0;
    Signature[] signatures;
    Voter[] voters;
    

    struct Signature {
        uint id;
        address owner;
        uint attackVote;
        uint normalVote;
        string ipfsHash;
    }

     struct Voter {
        address owner;
        uint id;
       
    }

    event SignatureAdded(
        uint id,
        address owner,
        uint attackVote,
        uint normalVote, 
        string ipfsHash
    );

    event SignatureVoted(
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
        // Create the signature
        signatures.push(Signature(signatureCount, msg.sender, 1, 0, _hash));

        voters.push(Voter(msg.sender,signatureCount));

        // Increment signature count
        signatureCount ++;
        // Trigger an event
        emit SignatureAdded(signatureCount, msg.sender, 1, 0, _hash);
    }

    function getFiles() public view returns (Signature[] memory) {
        return signatures;
    }

    function voteSignature(uint _id, uint _vote) public {
        // Fetch the product
        Signature memory _signature = signatures[_id];
        // Fetch the owner
        //address _owner = _signature.owner;
        // Make sure the product has a valid id
        //require(_signature.id > 0 && _signature.id <= signatureCount);
        // Require that the owner is not the voter
        // require(_owner != msg.sender);

        // Make sure user has not voted before
        bool hasVoted = false;
        
        
        
        for (uint i = 0; i < voters.length; i++) {
            if (voters[i].owner == msg.sender && voters[i].id == _id) {
                hasVoted = true;
            }
        }
        
        require(hasVoted == false, "You have voted for this signature before!");

        // Add vote
        uint attacks = _signature.attackVote;
        uint normals = _signature.normalVote;
        if(_vote == 1) {
            attacks++;
        }
        else if(_vote == 0) {
            normals++;
        }
        _signature.attackVote = attacks;
        _signature.normalVote = normals;

        
      
        // Update the product
        signatures[_id] = _signature;

        voters.push(Voter(msg.sender, _id));
        // Trigger an event
        emit SignatureVoted(_id, _signature.owner, _signature.attackVote, _signature.normalVote, _signature.ipfsHash);
    }
    

}
