import { createContext, useContext, useEffect, useReducer } from "react"
import reducer from "./reducer"

const intialState={
    currentUser:null,
    openLogin:false,
    loading:false,
    alert:{open:false, severity:'info', message:''},
}
const Context=createContext(intialState)
export const useValue =()=>{
    return useContext(Context)
}
const ContextProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,intialState);
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
          dispatch({ type: 'UPDATE_USER', payload: currentUser });
        }
      }, []);
    return(
     <Context.Provider value={{state,dispatch}}>
      {children}
     </Context.Provider>
    )
}
export default ContextProvider