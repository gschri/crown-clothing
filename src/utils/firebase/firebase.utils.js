import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyAhDX1dGtjnLa7z0PxHsMY-dGrW5gpmDfM",
    authDomain: "crwn-clothing-db-bb458.firebaseapp.com",
    projectId: "crwn-clothing-db-bb458",
    storageBucket: "crwn-clothing-db-bb458.appspot.com",
    messagingSenderId: "365157513087",
    appId: "1:365157513087:web:e98e03f021103e957ecc4a",
    measurementId: "G-70GTZKL9JD"
};

// Initialize Firebase
let firebaseApp = initializeApp(firebaseConfig);

let googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export let auth = getAuth()
export let signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export let signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export let db = getFirestore();

export let createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;

    var userDocRef = doc(db, 'users', userAuth.uid)

    var userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        let { displayName, email } = userAuth;
        let createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
}

export let createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export let signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export let signOutUser = async () => await signOut(auth);

export let onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}