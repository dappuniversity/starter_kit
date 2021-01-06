pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SmartEstate is ERC721 {
   uint256 private buyerId;
    uint256 private tokenId;
    event Transfer(address,address,address);
    event property_Pricing(uint256);
    enum offerApproval {pending, approved, rejected}
    event saleStatus(bool);

    struct PropertyDetails {
        address sellerAddress;
        uint256 propertyId;
        string propertyAddress;
        string city;
        uint256 room;
        string area;
        string propertyType;
        uint256 price;
        string image;
        bool saleStatus;
    }
    
    event property_detail(address useraddress,
        uint256 propertyId ,
        string propertyAddress,
        string city,
        uint256 room,
        string area,
        string propertyType,
        uint256 price,
        string image,
        bool saleStatus);

    struct BuyerInfo {
        uint256 bId;
        address buyerAddress;
        uint256 buyerOffer;
        offerApproval request;
    }
    event buyer_Info(uint256 buyerId,address buyerAddress,uint256 buyerOffer,offerApproval request);
    
    modifier propertyOwner() {
        require(
            OnlyOwner[msg.sender].sellerAddress == msg.sender,
            "Error: Only Property Owner run this"
        );
        _;
    }

    mapping(address => PropertyDetails) public OnlyOwner;
    mapping(uint256 => address) public PropertyList;
    mapping(address => BuyerInfo) public BuyerList;
    mapping(uint256 => BuyerInfo[]) public AllBuyers;
    mapping(uint256 => bool) public Offers;

    constructor() public ERC721("Smart Estate Properties", "ESP") {}

    function RegisterProperty(
        string memory _propertyAddress,
        string memory _city,
        uint256 _room,
        string memory _area,
        uint256 _priceInEther,
        string memory _propertyType,
        string memory _image,
        bool _saleStatus,
        string memory _tokenUri
    ) public returns (bool) {
        tokenId++;
        uint256 thisId = tokenId;
        _mint(msg.sender, thisId);
        _setTokenURI(thisId, _tokenUri);

        PropertyDetails memory tempDetails;

        tempDetails = PropertyDetails({
            sellerAddress: msg.sender,
            propertyId: thisId,
            propertyAddress: _propertyAddress,
            city: _city,
            room: _room,
            area: _area,
            propertyType: _propertyType,
            price: _priceInEther,
            image: _image,
            saleStatus: _saleStatus
        });
        OnlyOwner[msg.sender] = tempDetails;
        PropertyList[thisId] = msg.sender;
        emit property_detail( msg.sender, thisId, _propertyAddress, _city,_room, _area, _propertyType, _priceInEther, _image,false);
        return true;
    }

    function EnablePropertySale(uint256 PropertyId_TokenId)
        public
        propertyOwner
        returns (bool)
    {
        require(
            _exists(PropertyId_TokenId),
            "Error: INVALID Property id or token id"
        );
        OnlyOwner[PropertyList[PropertyId_TokenId]].saleStatus = true;
        emit saleStatus(true);
        return true;
    }

    function PropertyPricing(uint256 PropertyId_TokenId)view
        public
        propertyOwner
        returns (uint256)
    {
        require(
            _exists(PropertyId_TokenId),
            "Error: INVALID Property id or token id"
        );
          
        return OnlyOwner[PropertyList[PropertyId_TokenId]].price;
    }

    function BuyingRequest(uint256 PropertyId_TokenId, uint256 offerInEthers)
        public
        returns (bool)
    {
        require(
            _exists(PropertyId_TokenId),
            "Error: INVALID Property id or token id"
        );
        require(
            OnlyOwner[PropertyList[PropertyId_TokenId]].saleStatus,
            "Error:This Property not on Sale"
        );

        buyerId++;

        BuyerInfo memory tempDetails;
        tempDetails = BuyerInfo({
            bId: buyerId,
            buyerAddress: msg.sender,
            buyerOffer: offerInEthers,
            request: offerApproval.pending
        });
        AllBuyers[PropertyId_TokenId].push(tempDetails);
        BuyerList[msg.sender] = tempDetails;
        BuyerList[msg.sender].request = offerApproval.pending;
        emit buyer_Info(buyerId, msg.sender,offerInEthers,offerApproval.pending);
        return true;
    }

    function OfferStatus(uint256 PropertyId_TokenId)
        public
        propertyOwner
        returns (BuyerInfo[] memory)
    {
        require(
            _exists(PropertyId_TokenId),
            "Error: INVALID Property id or token id"
        );
        BuyerInfo[] memory tempDetails;
        tempDetails = AllBuyers[PropertyId_TokenId];
        return tempDetails;
    }

    function OfferReject(uint256 PropertyId_TokenId, address _buyerAddress)
        public
        propertyOwner
        returns (bool)
    {
        require(
            _exists(PropertyId_TokenId),
            "Error: INVALID Property id or token id"
        );
        require(
            BuyerList[_buyerAddress].buyerAddress == _buyerAddress,
            "Error: INVALID buyer address "
        );
        BuyerList[_buyerAddress].request = offerApproval.rejected;
        return true;
    }

    function OfferAccept(uint256 PropertyId_TokenId, address _buyerAddress)
        public
        propertyOwner
        returns (bool)
    {
        require(
            _exists(PropertyId_TokenId),
            "Error: INVALID Property id or token id"
        );
        require(
            BuyerList[_buyerAddress].buyerAddress == _buyerAddress,
            "Error: INVALID buyer address "
        );
        BuyerList[_buyerAddress].request = offerApproval.approved;
        return true;
    }

    function BuyProperty(uint256 PropertyId_TokenId)
        public
        payable
        returns (bool)
    {
        require(
            _exists(PropertyId_TokenId),
            "Error: INVALID Property id or token id"
        );
        require(
            BuyerList[msg.sender].buyerAddress == msg.sender,
            "Error: INVALID buyer address "
        );
        require(
            BuyerList[msg.sender].request == offerApproval.approved,
            "Error: This Property not for sale (Offer request not approved)"
        );
        require(msg.value > 0, "Error: Ether(s) not provided ");
        uint256 PropertyPrice = BuyerList[msg.sender].buyerOffer.mul(
            1 * 10**18
        );
        require(
            PropertyPrice == msg.value,
            "Error: Sorry, Pricing of property not matched with offer"
        );
        address BuyerAddress = OnlyOwner[PropertyList[PropertyId_TokenId]]
            .sellerAddress;
        _transfer(BuyerAddress, msg.sender, PropertyId_TokenId);
        emit Transfer(BuyerAddress, msg.sender, PropertyId_TokenId);
        return true;
        
    }
}
