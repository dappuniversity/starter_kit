export const RegisterProperty = (property) => {
    return {
        type: 'REGISTER_PROPERTY',
        payload: property
    }
}

export const OfferStatus = (PropertyId_TokenId) => {
    return {
        type: 'OFFER_STATUS',
        payload: PropertyId_TokenId
    }
}

export const BuyingRequest = (offer) => {
    return {
        type: 'BUYING_REQUEST',
        payload: offer
    }
}

export const Events = (events) => {
    return {
        type: 'EVENTS',
        payload: events
    }
}

export const EnablePropertySale = (tokenId) => {
    return {
        type: 'ENABLE_PROPERTY_SALE',
        payload: tokenId
    }
}

export const PropertyPricing = (PropertyId_TokenId) => {
    return {
        type: 'PROPERTY_PRICING',
        payload: PropertyId_TokenId
    }
}

export const setupWeb3 = (web3) => {
    return {
        type: 'SETUP_WEB3',
        payload: web3
    }
}


export const setupContract = (contract) => {
    return {
        type: 'SETUP_CONTRACT',
        payload: contract
    }
}

export const property_detail = (contract) => {
    return {
        type: 'PROPERTY_DETAIL',
        payload: contract
    }
}


export const addEthereumAccounts = (accounts) => {
    return {
        type: 'ADD_ETHEREUM_ACCOUNTS',
        payload: accounts
    }
}

export const web3LoadingError = (errorMessage) => {
    return {
        type: 'WEB3_LOADING_ERROR',
        payload: errorMessage
    }
}


