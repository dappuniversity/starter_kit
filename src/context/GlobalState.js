import React,{createContext,useReducer,useEffect,useContext} from 'react';
import AppReducer from '../store/AppReducer';
import {loadBlockchain} from '../store/asyncActions'

const initialState ={
    properties: [],
    web3:null,
    accounts:[],
    contract:null,
    web3LoadingErrorMessage:"",
    web3Loadded:false
    
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AppReducer,initialState);

    useEffect(()=>{
        loadBlockchain(dispatch)
    },[]
    )
    return (<GlobalContext.Provider value={[state,dispatch]}>
        {children}
    </GlobalContext.Provider>)
}

export const useStore = () => useContext(GlobalContext);