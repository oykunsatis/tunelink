import { Observable } from '@nativescript/core';

export interface Track {
    title: string;
    artist: string;
    album: string;
    artwork: string;
    service: string;
    timestamp: string;
}

class MusicServiceImpl extends Observable {
    private static instance: MusicServiceImpl;
    private currentTrack: Track | null = null;
    private interval: any;

    private constructor() {
        super();
    }

    static getInstance(): MusicServiceImpl {
        if (!MusicServiceImpl.instance) {
            MusicServiceImpl.instance = new MusicServiceImpl();
        }
        return MusicServiceImpl.instance;
    }

    startTracking() {
        // In a real app, this would use platform-specific APIs to track music
        this.interval = setInterval(() => {
            this.simulateTrackChange();
        }, 5000);
    }

    private simulateTrackChange() {
        const tracks: Track[] = [
            {
                title: "Blinding Lights",
                artist: "The Weeknd",
                album: "After Hours",
                artwork: "https://via.placeholder.com/300",
                service: "Spotify",
                timestamp: new Date().toISOString()
            },
            {
                title: "Anti-Hero",
                artist: "Taylor Swift",
                album: "Midnights",
                artwork: "https://via.placeholder.com/300",
                service: "Apple Music",
                timestamp: new Date().toISOString()
            }
        ];

        const newTrack = tracks[Math.floor(Math.random() * tracks.length)];
        
        if (JSON.stringify(newTrack) !== JSON.stringify(this.currentTrack)) {
            this.currentTrack = newTrack;
            this.notify({
                eventName: 'trackChanged',
                object: this,
                data: newTrack
            });
        }
    }

    stopTracking() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    getCurrentTrack(): Track | null {
        return this.currentTrack;
    }
}

export const MusicService = MusicServiceImpl.getInstance();