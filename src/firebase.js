import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtUeyt_mzngC9TWqt-uk-JB0dfs0SosYk",
  authDomain: "fir-mobile-lab.firebaseapp.com",
  projectId: "fir-mobile-lab",
  storageBucket: "fir-mobile-lab.firebasestorage.app",
  messagingSenderId: "386980480047",
  appId: "1:386980480047:web:c5cfdddd5e904002c6f2da",
  measurementId: "G-EM5N9XJN8R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
