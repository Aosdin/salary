import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyAlqvqm8G1r-9GhT-21ilYGYTJG0uI50aA',
  authDomain: 'salary-korea.firebaseapp.com',
  databaseURL: '',
  projectId: 'salary-korea',
  storageBucket: 'salary-korea.appspot.com',
  messagingSenderId: '644257855975',
  appId: "1:644257855975:web:47293643c9f401c6f6a542",
  measurementId: "G-6VWR11TPSP"
}

firebase.initializeApp(config)
