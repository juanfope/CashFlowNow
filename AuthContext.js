import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBphThJugxAZvHgKuTTkR3BVecAxGICQGk",
    authDomain: "cashflownow-6d467.firebaseapp.com",
    projectId: "cashflownow-6d467",
    storageBucket: "cashflownow-6d467.firebasestorage.app",
    messagingSenderId: "919645255959",
    appId: "1:919645255959:web:8201455c5413739cdf9f52"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const signUp = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
