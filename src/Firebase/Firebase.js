import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1pgn0ZmsaXiMOS_AxdtBTkYUiQ0dak2k",
  authDomain: "social-network-bcb99.firebaseapp.com",
  databaseURL: "https://social-network-bcb99.firebaseio.com",
  projectId: "social-network-bcb99",
  storageBucket: "social-network-bcb99.appspot.com",
  messagingSenderId: "869950297315",
  appId: "1:869950297315:web:455058f87075ace6f5a1d6",
  measurementId: "G-J952ZGLKVF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
