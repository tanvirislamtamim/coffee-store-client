import React from 'react';
import { auth } from '../firebase.init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from './AuthContexts';


const AuthProvider = ({children}) => {

    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }


    const UserInfo = {
        createUser,
        signInUser
    }
    return (
        <AuthContext value={UserInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;