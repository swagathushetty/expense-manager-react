//doing this to get named exports
//to get a function type firebase.functionName
import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY ,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN ,
    databaseURL: process.env.FIREBASE_DATABASE_URL ,
    projectId: process.env.FIREBASE_PROJECT_ID ,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ,
    appId: "1:502479394151:web:f2da6fa7831fb27578cbc2",
    measurementId: "G-FH81B2HYDG"
};


firebase.initializeApp(firebaseConfig);

const database=firebase.database()

export {firebase,database as default}

