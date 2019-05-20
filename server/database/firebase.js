const firebase = require ('firebase/app');
const fire = require ('firebase/storage');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD2bqEIjbu2577CdKr_aoB-_u1MYL606Io",
    authDomain: "khsoosi-upload-file-img.firebaseapp.com",
    databaseURL: "https://khsoosi-upload-file-img.firebaseio.com",
    projectId: "khsoosi-upload-file-img",
    storageBucket: "khsoosi-upload-file-img.appspot.com",
    messagingSenderId: "756195600793",
    appId: "1:756195600793:web:9d862fca4d1f44f5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  exports.storage = storage;
  exports.firebase = firebase;
