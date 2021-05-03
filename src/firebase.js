import firebase  from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyABEUkMrdr5gRidJM3cWxL87VGw-uKKvYM",
    authDomain: "chatify-83c80.firebaseapp.com",
    projectId: "chatify-83c80",
    storageBucket: "chatify-83c80.appspot.com",
    messagingSenderId: "912393432450",
    appId: "1:912393432450:web:c8b40c5e9051b2daba339b",
    measurementId: "G-6S3KC49347"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase