import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_StorageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MessagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_AppId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export  {auth}