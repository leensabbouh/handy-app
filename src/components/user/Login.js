

import { useEffect, useRef, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import PasswordField from './PasswordField';
import { auth } from '../../firebase';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
  };
  const validatePassword = () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    let isValid = true
      if (password !== confirmPassword) {
          isValid = false
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Passwords do not match',
        },
      });
    }
    if (password.length < 6){  
        isValid = false
       dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'password must be more than 6 characters',
        },
      });
    }
    return isValid
  }
  const handleSubmitlogin =  async(e) => {
    e.preventDefault();
   const email=emailRef.current.value;
   const password = passwordRef.current.value;
  
   
   try {
    await  signInWithEmailAndPassword(auth, email, password).then(async function(userCredential) {
      const user = userCredential.user;
        const email =user.email
          const name =user.displayName
          dispatch({
            type: 'UPDATE_USER',
            payload: { email,  name},
          });
          dispatch({ type: 'CLOSE_LOGIN' });
        }).catch(err => console.log(err.message))
  } 
     catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: error.message,
        },
      });}
    }

  const handleSubmitregister =async (e) => {
     e.preventDefault();
     const currentname=nameRef.current.value;
    const Email=emailRef.current.value;
    const password = passwordRef.current.value;
    try {
       if(validatePassword()) {
      await createUserWithEmailAndPassword(auth, Email, password).then(async function(userCredential) {
        const user = userCredential.user;
        user.displayName=currentname
          const email =user.email
            const name =user.displayName
            dispatch({
              type: 'UPDATE_USER',
              payload: { email,  name},
            });
            dispatch({ type: 'CLOSE_LOGIN' });
          }).catch(err =>{
             dispatch({
               type: 'UPDATE_ALERT',
               payload: {
                 open: true,
                 severity: 'error',
                 message: err.message,
        },
      });
          })
          
        }
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: error.message,
        },
      });
    }
    
  };

  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);
  return (
    <>
    {openLogin ?(
        <div onClose={handleClose} className="fixed z-20 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-black mx-2 w-full md:w-1/2 lg:w-2/5 p-4 sm:p-6 border border-blue-500 rounded-xl shadow-md">
                <div className="flex justify-end">
                   
                    <button onClick={handleClose} className="text-white hover:text-blue-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <h2 className="text-white text-center text-xl md:text-2xl space-x-2 font-bold mb-4"> {title} </h2>
    
            <form onSubmit={isRegister?handleSubmitregister:handleSubmitlogin}>
            {isRegister && (
                    <div className="mb-4">
                        <input type="text" placeholder="your name" id="name" name="name" ref={nameRef} required
                               className="w-full text-sm sm:text-base p-2 border-none text-white  bg-transparent focus:outline-none focus:border-solid focus:border-b-2 focus:border-blue-500"/>
                    </div>)}
                    <div className="mb-4">
                        <input type="email" placeholder="your email"  id="email" name="email" ref={emailRef} required
                               className="w-full input-select  text-sm sm:text-base p-2 border-none text-white    bg-transparent focus:outline-none focus:border-solid focus:border-b-2 focus:border-blue-500"
                               />
                    </div>
                     <PasswordField {...{ passwordRef }} />
                     {isRegister && (
                    <PasswordField
                     passwordRef={confirmPasswordRef}
                     id="confirmPassword"
                     label="Confirm Password"
                    />
                     )}
                
                   <div className='text-right'>
                     <button type="submit"
                            className="bg-transparent  text-blue-500 font-bold py-2 px-4 rounded border-blue-500 border-solid border-2 hover:bg-blue-700 hover:text-black">
                        Submit
                    </button>
                    </div>
                    <div className='flex py-5'>
                    {isRegister
                      ? <p className='text-white'>Do you have an account? Sign in now</p>
                      : <p className='text-white'> Don't you have an account? Create one now</p> }
                        {isRegister ?  <button className='text-blue-500 px-2' onClick={()=>setIsRegister(!isRegister)}>Login </button> : 
                        <button className='text-blue-500 px-2' onClick={()=>setIsRegister(!isRegister)}> Register </button> }
                    </div>
                  <div className='text-center'>
                    <GoogleOneTapLogin />
                  </div>
         </form>
            </div>
        </div>
    </div>
       ) : null}
       </>
    

  );
};

export default Login;