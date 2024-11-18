import { Observable } from '@nativescript/core';
import { mockUsers } from '../data/mockData';

export interface MatchedUser {
    id: string;
    name: string;
    age: number;
    gender: string;
    avatar: string;
    currentlyPlaying: any;
    matchScore: number;
    commonArtists: string[];
    commonGenres: string[];
}

class UserMatchingServiceImpl extends Observable {
    private static instance: UserMatchingServiceImpl;
    private currentMatches: MatchedUser[] = [];

    private constructor() {
        super();
        this.startMatchingSimulation();
    }

    static getInstance(): UserMatchingServiceImpl {
        if (!UserMatchingServiceImpl.instance) {
            UserMatchingServiceImpl.instance = new UserMatchingServiceImpl();
        }
        return UserMatchingServiceImpl.instance;
    }

    private startMatchingSimulation() {
        setInterval(() => {
            this.simulateNewMatch();
        }, 30000); // Simulate new match every 30 seconds
    }

    private simulateNewMatch() {
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        const match: MatchedUser = {
            ...randomUser,
            matchScore: Math.floor(Math.random() * 100),
            commonArtists: randomUser.favoriteArtists.slice(0, 2),
            commonGenres: randomUser.favoriteGenres.slice(0, 2)
        };

        this.currentMatches = [match, ...this.currentMatches];
        this.notify({
            eventName: 'newMatch',
            object: this,
            data: match
        });
    }

    public getCurrentMatches(): MatchedUser[] {
        return this.currentMatches;
    }

    public likeUser(userId: string) {
        // Simulate sending like notification
        setTimeout(() => {
            this.notify({
                eventName: 'matchLiked',
                object: this,
                data: { userId }
            });
        }, 1000);
    }

    public skipUser(userId: string) {
        this.currentMatches = this.currentMatches.filter(match => match.id !== userId);
        this.notify({
            eventName: 'matchSkipped',
            object: this,
            data: { userId }
        });
    }
}

export const UserMatchingService = UserMatchingServiceImpl.getInstance();