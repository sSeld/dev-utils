// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQwWHWrYfjrppiwVukIfnEivyBFaOvqEU",
    authDomain: "jeremy-portfolio-a4990.firebaseapp.com",
    projectId: "jeremy-portfolio-a4990",
    storageBucket: "jeremy-portfolio-a4990.appspot.com",
    messagingSenderId: "226293347738",
    appId: "1:226293347738:web:69b565a7de9c2605553623",
    measurementId: "G-SDRG51XWKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
