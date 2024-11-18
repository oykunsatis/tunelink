import { Observable, Device } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';

export interface DetectedTrack {
    id: string;
    title: string;
    artist: string;
    album: string;
    albumArt: string;
    service: string;
    timestamp: Date;
}

class MusicDetectionServiceImpl extends Observable {
    private static instance: MusicDetectionServiceImpl;
    private detectionInterval: any;
    private currentTrack: DetectedTrack | null = null;
    private isListening: boolean = false;

    private constructor() {
        super();
    }

    static getInstance(): MusicDetectionServiceImpl {
        if (!MusicDetectionServiceImpl.instance) {
            MusicDetectionServiceImpl.instance = new MusicDetectionServiceImpl();
        }
        return MusicDetectionServiceImpl.instance;
    }

    async startListening() {
        if (this.isListening) return;
        
        this.isListening = true;
        
        // Start periodic checking
        this.detectionInterval = setInterval(async () => {
            await this.checkCurrentTrack();
        }, 3000);

        // Initial check
        await this.checkCurrentTrack();
    }

    async stopListening() {
        if (this.detectionInterval) {
            clearInterval(this.detectionInterval);
        }
        this.isListening = false;
    }

    private async checkCurrentTrack() {
        try {
            let track: DetectedTrack | null = null;

            if (Device.os === 'iOS') {
                track = await this.getiOSNowPlaying();
            } else if (Device.os === 'Android') {
                track = await this.getAndroidNowPlaying();
            }

            if (track && (!this.currentTrack || track.id !== this.currentTrack.id)) {
                this.currentTrack = track;
                
                // Save to Firebase
                await this.saveTrackToFirebase(track);
                
                // Notify listeners
                this.notify({
                    eventName: 'trackChanged',
                    object: this,
                    data: track
                });
            }
        } catch (error) {
            console.error('Error detecting music:', error);
        }
    }

    private async getiOSNowPlaying(): Promise<DetectedTrack | null> {
        // In a real implementation, we would use:
        // - MPNowPlayingInfoCenter for current track info
        // - MPRemoteCommandCenter for controls
        // For demo, returning mock data
        return {
            id: 'mock-ios-1',
            title: 'iOS Test Track',
            artist: 'Test Artist',
            album: 'Test Album',
            albumArt: 'https://via.placeholder.com/300',
            service: 'Apple Music',
            timestamp: new Date()
        };
    }

    private async getAndroidNowPlaying(): Promise<DetectedTrack | null> {
        // In a real implementation, we would use:
        // - MediaSession API
        // - NotificationListenerService
        // For demo, returning mock data
        return {
            id: 'mock-android-1',
            title: 'Android Test Track',
            artist: 'Test Artist',
            album: 'Test Album',
            albumArt: 'https://via.placeholder.com/300',
            service: 'Spotify',
            timestamp: new Date()
        };
    }

    private async saveTrackToFirebase(track: DetectedTrack) {
        try {
            const user = firebase.auth().currentUser;
            if (!user) return;

            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .collection('listening_history')
                .add({
                    ...track,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

            // Update user's current track
            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({
                    currentTrack: track
                });
        } catch (error) {
            console.error('Error saving track to Firebase:', error);
        }
    }

    getCurrentTrack(): DetectedTrack | null {
        return this.currentTrack;
    }
}

export const MusicDetectionService = MusicDetectionServiceImpl.getInstance();