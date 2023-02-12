import firebase from "firebase/app";
import "firebase/auth";
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyB1TFMoyT8G7jLQp-3O_Np89vAK5FUadPY",
    authDomain: "thunderchat-19d30.firebaseapp.com",
    projectId: "thunderchat-19d30",
    storageBucket: "thunderchat-19d30.appspot.com",
    messagingSenderId: "808519260044",
    appId: "1:808519260044:web:7a076dd509a7c731a668a9"
  }).auth();