import React, {useState} from 'react';
import {useValue} from 'Context/ContextProvider';
import {jwtDecode} from 'jwt-decode';
import {FaGoogle} from "react-icons/fa";

type DecodedGoogleLoginResponseToken = {
    sub: string; email: string; name: string; picture: string
}

const GoogleOneTapLogin = () => {
    const {dispatch} = useValue();
    const [disabled, setDisabled] = useState(false);

    const handleResponse = (response: { credential: string; }) => {
        const token = response.credential;
        const decodedToken = jwtDecode<DecodedGoogleLoginResponseToken>(token);
        const {sub: id, email, name, picture: photoURL} = decodedToken;
        dispatch({
            type: 'UPDATE_USER',
            payload: {id, email, name, photoURL, token, google: true},
        });
        dispatch({type: 'CLOSE_LOGIN'});
    };
    const handleGoogleLogin = () => {
        setDisabled(true);
        try {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleResponse,
            });
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    throw new Error('Try to clear the cookies or try again later!');
                }
                if (
                    notification.isSkippedMoment() ||
                    notification.isDismissedMoment()
                ) {
                    setDisabled(false);
                }
            });
        } catch (error) {
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {open: true, severity: 'error', message: error.message},
            });
            console.log(error);
        }
    };
    return (
        <button
            disabled={disabled}
            onClick={handleGoogleLogin}

            className="bg-transparent flex justify-around w-52 items-center m-auto text-blue-500 font-bold py-2 px-3 rounded border-blue-500 border-solid border-2  hover:bg-blue-700 hover:text-black"
        >
            <FaGoogle/> Login with Google
        </button>
    );
};

export default GoogleOneTapLogin;
