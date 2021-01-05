export default (state, action) => {
    switch (action.type) {
        case 'REGISTER_PROPERTY':
            return {
                ...state,
                properties: [action.payload, ...state.properties]
            }

        case 'OFFER_STATUS':
            return {
                ...state,
                PropertyId_TokenIds: action.payload
            }

        case 'BUYING_REQUEST': 
        return {
            ...state,
            offers: action.payload
        }

        case 'EVENTS':
            return {
                ...state,
                events: [action.payload,...state.events]
            }

        case 'ENABLE_PROPERTY_SALE':
            return {
                ...state,
                tokenId: action.payload
            }
        case 'PROPERTY_PRICING':
            return {
                ...state,
                PropertyId_TokenIds: [action.payload, ...state.PropertyId_TokenIds]
            }
        case 'SETUP_WEB3':
            return {
                ...state,
                web3: action.payload,
                web3LoadingErrorMessage: "",
                web3Loadded: true
            }
        case 'SETUP_CONTRACT':
            return {
                ...state,
                contract: action.payload
            }

        case 'PROPERTY_DETAIL':
            return {
                ...state,
                contract: action.payload
            }

        case 'ADD_ETHEREUM_ACCOUNTS':
            return {
                ...state,
                accounts: action.payload
            }
        case 'WEB3_LOADING_ERROR':
            return {
                ...state,
                web3LoadingErrorMessage: action.errorMessage
            }
        default:
            return state;
    }
}