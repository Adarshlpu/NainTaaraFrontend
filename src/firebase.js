import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyBNnf2nw2LDiEzpM9s_YqpP0hLkTzqd4as",

  authDomain: "naintaara-7150b.firebaseapp.com",

  projectId: "naintaara-7150b",

  storageBucket: "naintaara-7150b.firebasestorage.app",

  messagingSenderId: "840539941815",

  appId: "1:840539941815:web:cfcf65f3e2e409bbb4d632",

  measurementId: "G-0Z0KTSTBDE"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);