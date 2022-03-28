import firebase from "firebase/compat/app";
// import { getFirestore } from 'firebase/firestore';
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBMt7wRtseZw_MXWrdkBzK_DB_pgUb5CFg",
  authDomain: "crud-antd.firebaseapp.com",
  projectId: "crud-antd",
  storageBucket: "crud-antd.appspot.com",
  messagingSenderId: "362689407990",
  appId: "1:362689407990:web:8f986b2db9d805408075d7",
  measurementId: "G-FV6NQTN1K7"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
