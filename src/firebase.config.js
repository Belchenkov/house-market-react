import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBsq_Q49dD15AV-_N2ESB-xkPOpGVQZlnc",
    authDomain: "house-marketplace-react-c07d3.firebaseapp.com",
    projectId: "house-marketplace-react-c07d3",
    storageBucket: "house-marketplace-react-c07d3.appspot.com",
    messagingSenderId: "387218769167",
    appId: "1:387218769167:web:ad0abe974d851a30d52a7a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();