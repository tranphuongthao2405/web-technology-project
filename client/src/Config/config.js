import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDR_eSIvIJI00_BaHMMRkntO8PU9xJBdlw",
  authDomain: "social-network-1656a.firebaseapp.com",
  databaseURL: "https://social-network-1656a.firebaseio.com",
  projectId: "social-network-1656a",
  storageBucket: "social-network-1656a.appspot.com",
  messagingSenderId: "359140844353",
  appId: "1:359140844353:web:5f9c1aac8f646c773b37c0",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
