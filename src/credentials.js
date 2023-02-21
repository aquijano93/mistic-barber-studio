// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWYs9nx3nt525JMQcWO-4zpQcCl_0NSq4",
    authDomain: "misticbarberstudio-fb846.firebaseapp.com",
    projectId: "misticbarberstudio-fb846",
    storageBucket: "misticbarberstudio-fb846.appspot.com",
    messagingSenderId: "500096445177",
    appId: "1:500096445177:web:9da874bed6cb5c52125028"
};

// Initialize Firebase
const misticCredentials = initializeApp(firebaseConfig);

export default misticCredentials