import { initializeApp } from 'firebase/app'
import { Category } from '../../store/categories/category.types';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore'

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

export type ObjectToAdd = {
    title: string
}

export let addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
): Promise<void> => {
    var collectionRef = collection(db, collectionKey);
    var batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        var docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
}

export let getCategoriesAndDocuments = async (): Promise<Category[]> => {
    var collectionRef = collection(db, 'categories')

    var q = query(collectionRef)

    var querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
        docSnapshot => docSnapshot.data() as Category
    )
}

export type AdditionalInformation = {
    displayName?: string
}

export type UserData = {
    createdAt: Date;
    displayName: string,
    email: string,
}

export let createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
            console.log('error creating the user', error)
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>
}

export let createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export let signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export let signOutUser = async () => await signOut(auth);

export let onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
    onAuthStateChanged(auth, callback)
}

export let getCurrentUser = (): Promise<User| null> => {
    return new Promise((resolve, reject) => {
        var unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth)
            },
            reject
        )
    })
}