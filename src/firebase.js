import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, GoogleAuthProvider, signOut, onAuthStateChanged, getRedirectResult} from 'firebase/auth'

import config from './serviceAccountKey.json'

const app = initializeApp(config)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const getCredential = (result) => GoogleAuthProvider.getcredentialFromResult(result)

export {
    auth,
    signOut,
    googleProvider,
    signInWithRedirect,
    onAuthStateChanged,
    getCredential,
    getRedirectResult
}