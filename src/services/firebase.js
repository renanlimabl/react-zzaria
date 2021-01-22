import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDlLV2m0q0iUeWzyDbE32eVekOefD_yaoM',
  authDomain: 'reactzzaria-b4c50.firebaseapp.com',
  projectId: 'reactzzaria-b4c50',
  storageBucket: 'reactzzaria-b4c50.appspot.com',
  messagingSenderId: '317894399452',
  appId: '1:317894399452:web:9773e7f17d9ca37e7eab19',
  measurementId: 'G-J4QJ0BQV5Y',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
