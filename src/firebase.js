import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAdZUrawbtmoFOb9C4xooVoPQxAN-bpBNM",
  authDomain: "finalproj-1ceaa.firebaseapp.com",
  projectId: "finalproj-1ceaa",
  storageBucket: "finalproj-1ceaa.appspot.com",
  messagingSenderId: "125347913950",
  appId: "1:125347913950:web:e62ccd4e69e6bd6831624f"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



db.settings({ timestampsInSnapshots: true})
  export default db;