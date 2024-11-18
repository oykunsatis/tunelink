import { mockArtists, mockGenres, mockSongSuggestions } from '../data/mockData';

export class RecommendationService {
    static async getGenreSuggestions(userGenres: string[]): Promise<string[]> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Filter out user's existing genres and return 5 random suggestions
        const newGenres = mockGenres.filter(genre => !userGenres.includes(genre));
        return newGenres
            .sort(() => Math.random() - 0.5)
            .slice(0, 5);
    }

    static async getArtistSuggestions(userArtists: string[]): Promise<any[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return mockArtists
            .filter(artist => !userArtists.includes(artist.name))
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }

    static async getSongSuggestions(userGenres: string[]): Promise<any[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return mockSongSuggestions
            .filter(song => song.genres.some(genre => userGenres.includes(genre)))
            .sort(() => Math.random() - 0.5);
    }
}