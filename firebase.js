import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDB8Ckb-W_jgPgVg9U6fZyeToPNeIpFBeA",
  authDomain: "instagram-clone-react-na-2a2a0.firebaseapp.com",
  projectId: "instagram-clone-react-na-2a2a0",
  storageBucket: "instagram-clone-react-na-2a2a0.appspot.com",
  messagingSenderId: "376922307819",
  appId: "1:376922307819:web:974fc4a2ca763862ba52ae"
};


let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, firebase, db };
