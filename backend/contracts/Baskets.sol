pragma solidity ^0.8.10;

import "./Bread.sol";
import "./Crumbs.sol";

contract Baskets {
    string public name = "Baskets Contract";

    Bread public breadToken;

    struct Basket {
        address account;
        string domain;
        uint256 amount;
        uint256 price;
    }

    mapping(string => Basket) public baskets;
    string[] public basketsIndex;

    event CreateBasketEvent(
        address account,
        string domain,
        uint256 amount,
        uint256 price
    );
    event RetrieveBasketEvent(
        address account,
        string domain,
        uint256 amount,
        uint256 price
    );
    event UpdateBasketEvent(
        address account,
        string domain,
        uint256 amount,
        uint256 price
    );
    event DeleteBasketEvent(address account, string domain);
    event BasketsFoundEvent(string domain, Basket[] baskets, uint256 count);
    event PaymentEvent(
        address fromAccount,
        address toAccount,
        uint256 price,
        bool paid,
        uint256 date
    );

    // TODO: Add PaymentEvent.date

    constructor(Bread _breadToken) {
        breadToken = _breadToken;
    }

    function createBasket(
        string memory _domain,
        uint256 _amount,
        uint256 _price
    ) public returns (Basket memory basket) {
        require(
            _amount > 0,
            "Baskets Contract: Basket amount should be greater than 0"
        );

        require(
            _price > 0,
            "Baskets Contract: Basket price should be greater than 0"
        );

        require(
            _amount >= _price,
            "Baskets Contract: Basket amount should be greater or equal than price"
        );

        require(
            breadToken.balanceOf(msg.sender) > _price,
            "Baskets Contract: Insufficient BREAD to create a bread basket"
        );

        basket = Basket(msg.sender, _domain, _amount, _price);

        require(!_exists(basket), "Baskets Contract: Basket already exists");

        string memory basketKey = _getKey(msg.sender, _domain);
        basketsIndex.push(basketKey);
        baskets[basketKey] = basket;

        emit CreateBasketEvent(
            basket.account,
            basket.domain,
            basket.amount,
            basket.price
        );

        return basket;
    }

    function getBasket(string memory _domain)
        public
        returns (Basket memory basket)
    {
        for (uint256 i = 0; i < basketsIndex.length; i++) {
            basket = baskets[basketsIndex[i]];
            if (_checkBasket(basket, _domain, msg.sender)) {
                emit RetrieveBasketEvent(
                    basket.account,
                    basket.domain,
                    basket.amount,
                    basket.price
                );
                return basket;
            }
        }

        revert("Baskets Contract: Basket not found");
    }

    function updateBasket(
        string memory _domain,
        uint256 _amount,
        uint256 _price
    ) public returns (Basket memory basket) {
        require(
            _amount > 0,
            "Baskets Contract: Basket amount should be greater than 0"
        );

        require(
            _price > 0,
            "Baskets Contract: Basket price should be greater than 0"
        );

        require(
            _amount >= _price,
            "Baskets Contract: Basket amount should be greater or equal than price"
        );

        require(
            breadToken.balanceOf(msg.sender) > _price,
            "Baskets Contract: Insufficient BREAD to update a bread basket"
        );

        for (uint256 i = 0; i < basketsIndex.length; i++) {
            basket = baskets[basketsIndex[i]];
            if (_checkBasket(basket, _domain, msg.sender)) {
                basket.amount = _amount;
                basket.price = _price;
                baskets[basketsIndex[i]] = basket;

                emit UpdateBasketEvent(
                    basket.account,
                    basket.domain,
                    basket.amount,
                    basket.price
                );
                return basket;
            }
        }

        revert("Baskets Contract: Basket not found");
    }

    function deleteBasket(string memory _domain) public returns (bool success) {
        require(basketsIndex.length > 0);

        Basket memory basket;

        for (uint256 i = 0; i < basketsIndex.length; i++) {
            basket = baskets[basketsIndex[i]];
            if (_checkBasket(basket, _domain, msg.sender)) {
                string memory basketKey = _getKey(msg.sender, _domain);

                // Delete from array
                basketsIndex[i] = basketsIndex[basketsIndex.length - 1];
                basketsIndex.pop();

                // Delete from mapping
                delete baskets[basketKey];

                emit DeleteBasketEvent(msg.sender, _domain);
                return true;
            }
        }

        revert("Baskets Contract: Basket not found");
    }

    function countBaskets() public view returns (uint256 length) {
        return basketsIndex.length;
    }

    function getAllBaskets() public view returns (Basket[] memory) {
        Basket[] memory allBaskets = new Basket[](basketsIndex.length);

        for (uint256 i = 0; i < basketsIndex.length; i++) {
            allBaskets[i] = baskets[basketsIndex[i]];
        }

        return allBaskets;
    }

    function findBaskets(string memory _domain)
        public
        returns (Basket[] memory)
    {
        uint256 basketsFoundCount = 0;

        for (uint256 i = 0; i < basketsIndex.length; i++) {
            Basket memory basket = baskets[basketsIndex[i]];
            bool sameDomain = _compareStrings(basket.domain, _domain);

            if (sameDomain) {
                basketsFoundCount++;
            }
        }

        Basket[] memory domainBaskets = new Basket[](basketsFoundCount);
        uint256 basketFoundIndex = 0;

        for (uint256 i = 0; i < basketsIndex.length; i++) {
            Basket memory basket = baskets[basketsIndex[i]];
            bool sameDomain = _compareStrings(basket.domain, _domain);

            if (sameDomain) {
                domainBaskets[basketFoundIndex] = basket;
                basketFoundIndex++;
            }
        }

        emit BasketsFoundEvent(_domain, domainBaskets, domainBaskets.length);

        return domainBaskets;
    }

    function pay(Crumbs.Crumb memory _crumb, Crumbs.Payment memory _payment)
        public
        returns (bool success)
    {
        string memory basketKey = _getKey(_payment.fromAccount, _crumb.domain);

        require(
            _payment.price == baskets[basketKey].price,
            "Baskets Contract: Crumb payment and basket price mismatch"
        );

        require(
            baskets[basketKey].amount >= _payment.price,
            "Baskets Contract: Not enought BREAD in basket to perform the payment"
        );

        require(
            breadToken.balanceOf(_payment.fromAccount) >= _payment.price,
            "Baskets Contract: Not enought BREAD in origin account to perform the payment"
        );

        success = breadToken.transferFrom(
            _payment.fromAccount,
            _payment.toAccount,
            _payment.price
        );

        if (success) {
            baskets[basketKey].amount -= _payment.price;
        }

        emit PaymentEvent(
            _payment.fromAccount,
            _payment.toAccount,
            _payment.price,
            success,
            _payment.date
        );

        return success;
    }

    function _getKey(address _account, string memory _domain)
        internal
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(_account, "-", _domain));
    }

    function _checkBasket(
        Basket memory _basket,
        string memory _domain,
        address _account
    ) internal pure returns (bool) {
        bool sameDomain = _compareStrings(_basket.domain, _domain);
        bool sameAccount = _compareAccounts(_basket.account, _account);

        return (sameDomain && sameAccount);
    }

    function _exists(Basket memory _basket) internal view returns (bool) {
        string memory basketKey = _getKey(_basket.account, _basket.domain);

        if (basketsIndex.length == 0) return false;

        bool existsInIndex = false;
        for (uint256 i = 0; i < basketsIndex.length; i++) {
            string memory basketIndex = basketsIndex[i];
            if (_compareStrings(basketIndex, basketKey)) {
                existsInIndex = true;
            }
        }
        if (existsInIndex == false) return false;

        bool existsInMapping = baskets[basketKey].account == _basket.account;
        if (existsInMapping == false) return false;

        return true;
    }

    function _compareStrings(string memory _a, string memory _b)
        internal
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }

    function _compareAccounts(address _a, address _b)
        internal
        pure
        returns (bool)
    {
        return _a == _b;
    }
}
