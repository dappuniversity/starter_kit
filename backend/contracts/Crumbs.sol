pragma solidity ^0.8.10;

import "./Bread.sol";
import "./Baskets.sol";

contract Crumbs {
    string public name = "Crumbs Contract";
    Bread public breadToken;
    Baskets public basketsContract;

    struct Crumb {
        string sessionId;
        string domain;
        uint256 date;
        uint256 paymentsCount;
        // TODO: Add current owner account of the crumb
        // TODO: Count the number of times the crumb has been updated (paid)
    }

    struct Payment {
        address fromAccount;
        address toAccount;
        uint256 price;
        bool paid;
        uint256 date;
    }

    struct CrumbWithPayments {
        string sessionId;
        string domain;
        uint256 date;
        Payment[] payments;
        uint256 paymentsCount;
    }

    mapping(string => Crumb[]) crumbs;
    mapping(string => mapping(string => Payment[])) payments;

    event CreateCrumbEvent(
        string sessionId,
        string domain,
        uint256 date,
        Payment[] payments,
        uint256 paymentsCount
    );

    event CrumbsFoundEvent(
        string domain,
        CrumbWithPayments[] crumbs,
        uint256 count
    );
    event CrumbTimeRejectionEvent(CrumbWithPayments crumb, uint256 hoursLeft);

    constructor(Bread _breadToken, Baskets _baskets) {
        breadToken = _breadToken;
        basketsContract = _baskets;
    }

    function createCrumb(
        string memory _sessionId,
        string memory _domain,
        address _account
    ) public returns (CrumbWithPayments memory crumbWP) {
        Baskets.Basket[] memory baskets = basketsContract.findBaskets(_domain);

        Crumb memory crumb = Crumb(_sessionId, _domain, block.timestamp, 0);

        // Crumb creation or update
        (Crumb memory oldCrumb, int256 crumbIndex) = _getOldCrumb(crumb);
        bool shouldCreate = crumbIndex < 0;
        bool shouldPay = false;

        if (shouldCreate) {
            crumbs[_domain].push(crumb); // Store in domain pool
            shouldPay = true;
        } else {
            (bool shouldupdate, uint256 hoursLeft) = _checkCrumbShouldUpdate(
                crumb,
                oldCrumb
            );

            if (shouldupdate) {
                crumbs[_domain][uint256(crumbIndex)] = crumb; // Update in domain pool
                shouldPay = true;
            } else {
                // Not a valid crumb (time rejection)
                CrumbWithPayments memory rejectedCrumbWP = _crumbToCrumbWP(
                    crumb
                );
                emit CrumbTimeRejectionEvent(rejectedCrumbWP, hoursLeft);

                crumb.date = oldCrumb.date; // Keep old date
                return rejectedCrumbWP;
            }
        }

        // Payments
        if (shouldPay) {
            for (uint256 i = 0; i < baskets.length; i++) {
                Baskets.Basket memory basket = baskets[i];

                Payment memory payment = Payment(
                    basket.account,
                    _account,
                    basket.price,
                    false,
                    block.timestamp
                );
                payment = _pay(crumb, payment);
                payments[_domain][_sessionId].push(payment);
                crumb.paymentsCount = payments[_domain][_sessionId].length;
            }
        }

        crumbWP = _crumbToCrumbWP(crumb);

        emit CreateCrumbEvent(
            crumbWP.sessionId,
            crumbWP.domain,
            crumbWP.date,
            crumbWP.payments,
            crumbWP.paymentsCount
        );

        return crumbWP;
    }

    function getCrumbs(string memory _domain)
        public
        returns (CrumbWithPayments[] memory)
    {
        Crumb[] memory domainCrumbs = crumbs[_domain];
        uint256 crumbsFoundCount = 0;

        for (uint256 i = 0; i < domainCrumbs.length; i++) {
            Crumb memory crumb = domainCrumbs[i];
            bool sameDomain = _compareStrings(crumb.domain, _domain);

            if (sameDomain) {
                crumbsFoundCount++;
            }
        }

        CrumbWithPayments[] memory crumbsWPfound = new CrumbWithPayments[](
            crumbsFoundCount
        );
        uint256 crumbsFoundIndex = 0;

        for (uint256 i = 0; i < domainCrumbs.length; i++) {
            Crumb memory crumb = domainCrumbs[i];
            bool sameDomain = _compareStrings(crumb.domain, _domain);

            if (sameDomain) {
                crumbsWPfound[crumbsFoundIndex] = _crumbToCrumbWP(crumb);
                crumbsFoundIndex++;
            }
        }

        emit CrumbsFoundEvent(_domain, crumbsWPfound, crumbsWPfound.length);

        return crumbsWPfound;
    }

    function _getOldCrumb(Crumb memory _crumb)
        internal
        view
        returns (Crumb memory sessionCrumb, int256 index)
    {
        Crumb[] memory domainCrumbs = crumbs[_crumb.domain];

        for (uint256 i = 0; i < domainCrumbs.length; i++) {
            Crumb memory domainCrumb = domainCrumbs[i];
            bool sameSessionId = _compareStrings(
                domainCrumb.sessionId,
                _crumb.sessionId
            );

            if (sameSessionId) {
                sessionCrumb = domainCrumb;
                return (sessionCrumb, int256(i));
            }
        }

        return (sessionCrumb, -1);
    }

    function _checkCrumbShouldUpdate(
        Crumb memory _crumb,
        Crumb memory _oldCrumb
    ) internal pure returns (bool success, uint256 hoursleft) {
        uint256 diffHours = (_crumb.date - _oldCrumb.date) / 60 / 60;

        success = diffHours > 24;
        hoursleft = success ? 0 : 24 - diffHours;

        return (success, hoursleft);
    }

    function _pay(Crumb memory _crumb, Payment memory _payment)
        public
        returns (Payment memory)
    {
        _payment.date = block.timestamp;

        try basketsContract.pay(_crumb, _payment) returns (bool paid) {
            _payment.paid = paid;
        } catch {
            _payment.paid = false;
        }

        return _payment;
    }

    function _crumbToCrumbWP(Crumb memory _crumb)
        internal
        view
        returns (CrumbWithPayments memory crumbWithPayments)
    {
        crumbWithPayments = CrumbWithPayments(
            _crumb.sessionId,
            _crumb.domain,
            _crumb.date,
            payments[_crumb.domain][_crumb.sessionId],
            payments[_crumb.domain][_crumb.sessionId].length
        );

        return crumbWithPayments;
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
