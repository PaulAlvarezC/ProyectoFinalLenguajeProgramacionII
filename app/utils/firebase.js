import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA_cbY54FmTMTJRhnhRtKmh4m6emjsbcMY",
    authDomain: "proyectolpii.firebaseapp.com",
    projectId: "proyectolpii",
    storageBucket: "proyectolpii.appspot.com",
    messagingSenderId: "379901518132",
    appId: "1:379901518132:web:21d80f5c331e1869a6c561",
    measurementId: "G-2YB5V1G0MV"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);