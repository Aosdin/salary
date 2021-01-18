import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyAlqvqm8G1r-9GhT-21ilYGYTJG0uI50aA',
  authDomain: '1million-dollar.com',
  databaseURL: '',
  projectId: 'salary-korea',
  storageBucket: 'bento-starter.appspot.com',
  messagingSenderId: '644257855975'
}

firebase.initializeApp(config)
