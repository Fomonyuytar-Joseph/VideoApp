import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyBJdrwNtJ3YHlHI64er6mLsdLnEBMOKu9k",
    authDomain: "fir-v9-d801e.firebaseapp.com",
    projectId: "fir-v9-d801e",
    storageBucket: "fir-v9-d801e.appspot.com",
    messagingSenderId: "1046099059702",
    appId: "1:1046099059702:web:23acab8d9c1cafd48cddd7"
  };

  const app = initializeApp(firebaseConfig);
 export  const db = getFirestore(app);
 export const authentication = getAuth(app);

   





 