import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBQLmIlDNyRhEpUf1OQ8lhiVFDNxyWtkTw",
  authDomain: "instagram-clone-c537c.firebaseapp.com",
  databaseURL: "https://instagram-clone-c537c.firebaseio.com",
  projectId: "instagram-clone-c537c",
  storageBucket: "instagram-clone-c537c.appspot.com",
  messagingSenderId: "410787545852",
  appId: "1:410787545852:web:eb769532c73accf3fb8d79",
  measurementId: "G-0E3VNDW655",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
