import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';

export interface UserCredentials {
    email: string;
    password: string;
    name?: string;
    surname?: string;
}

export class AuthService {
    static async registerWithEmail(credentials: UserCredentials) {
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(
                credentials.email,
                credentials.password
            );
            
            if (userCredential.user) {
                await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
                    email: credentials.email,
                    name: credentials.name,
                    surname: credentials.surname,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
            
            return userCredential.user;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    static async loginWithEmail(email: string, password: string) {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(
                email,
                password
            );
            return userCredential.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async loginWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            return await firebase.auth().signInWithProvider(provider);
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    }

    static async loginWithApple() {
        try {
            const provider = new firebase.auth.OAuthProvider('apple.com');
            return await firebase.auth().signInWithProvider(provider);
        } catch (error) {
            console.error('Apple login error:', error);
            throw error;
        }
    }

    static async loginWithSpotify() {
        try {
            const provider = new firebase.auth.OAuthProvider('spotify.com');
            return await firebase.auth().signInWithProvider(provider);
        } catch (error) {
            console.error('Spotify login error:', error);
            throw error;
        }
    }

    static async logout() {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    static getCurrentUser() {
        return firebase.auth().currentUser;
    }

    static onAuthStateChanged(callback: (user: any) => void) {
        return firebase.auth().onAuthStateChanged(callback);
    }
}