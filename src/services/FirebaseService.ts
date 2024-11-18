import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import '@nativescript/firebase-firestore';

export class FirebaseService {
    static async initialize() {
        try {
            await firebase.initializeApp();
            console.log('Firebase initialized successfully');
        } catch (error) {
            console.error('Error initializing Firebase:', error);
            throw error;
        }
    }

    // Authentication methods
    static async signInWithEmail(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    static async signUpWithEmail(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    static async signOut() {
        return firebase.auth().signOut();
    }

    // User profile methods
    static async createUserProfile(userId: string, data: any) {
        return firebase.firestore()
            .collection('users')
            .doc(userId)
            .set({
                ...data,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
    }

    static async updateUserProfile(userId: string, data: any) {
        return firebase.firestore()
            .collection('users')
            .doc(userId)
            .update(data);
    }

    static async getUserProfile(userId: string) {
        const doc = await firebase.firestore()
            .collection('users')
            .doc(userId)
            .get();
        return doc.data();
    }

    // Music tracking methods
    static async saveCurrentTrack(userId: string, trackData: any) {
        return firebase.firestore()
            .collection('users')
            .doc(userId)
            .collection('tracks')
            .add({
                ...trackData,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
    }

    static async getNearbyListeners(location: any, radius: number) {
        // Implementation for geolocation query will go here
        // This will require setting up geolocation indexes in Firestore
    }

    // Real-time listeners
    static onAuthStateChanged(callback: (user: any) => void) {
        return firebase.auth().onAuthStateChanged(callback);
    }

    static onUserProfileChanged(userId: string, callback: (data: any) => void) {
        return firebase.firestore()
            .collection('users')
            .doc(userId)
            .onSnapshot(snapshot => callback(snapshot.data()));
    }
}