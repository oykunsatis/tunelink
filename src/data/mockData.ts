export const mockGenres = [
    "Pop", "Rock", "Hip Hop", "R&B", "Jazz", "Classical", "Electronic", "Country",
    "Folk", "Metal", "Blues", "Reggae", "Indie", "Alternative", "K-pop", "Latin"
];

export const mockArtists = [
    { name: "Taylor Swift", genres: ["Pop"], image: "https://i.pravatar.cc/150?img=1" },
    { name: "The Weeknd", genres: ["R&B", "Pop"], image: "https://i.pravatar.cc/150?img=2" },
    { name: "Drake", genres: ["Hip Hop", "R&B"], image: "https://i.pravatar.cc/150?img=3" },
    { name: "Dua Lipa", genres: ["Pop", "Dance"], image: "https://i.pravatar.cc/150?img=4" },
    { name: "Ed Sheeran", genres: ["Pop", "Folk"], image: "https://i.pravatar.cc/150?img=5" },
    { name: "Billie Eilish", genres: ["Pop", "Alternative"], image: "https://i.pravatar.cc/150?img=6" }
];

export const mockUsers = [
    {
        id: "user1",
        name: "Sarah Wilson",
        age: 24,
        gender: "Female",
        avatar: "https://i.pravatar.cc/300?img=1",
        location: { latitude: 40.7128, longitude: -74.0060 },
        favoriteGenres: ["Pop", "R&B", "Alternative"],
        favoriteArtists: ["Taylor Swift", "The Weeknd", "Billie Eilish"],
        currentlyPlaying: {
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            albumArt: "https://via.placeholder.com/300",
            service: "Spotify"
        }
    },
    {
        id: "user2",
        name: "Mike Chen",
        age: 28,
        gender: "Male",
        avatar: "https://i.pravatar.cc/300?img=2",
        location: { latitude: 40.7142, longitude: -74.0064 },
        favoriteGenres: ["Hip Hop", "R&B", "Electronic"],
        favoriteArtists: ["Drake", "The Weeknd", "Dua Lipa"],
        currentlyPlaying: {
            title: "Anti-Hero",
            artist: "Taylor Swift",
            album: "Midnights",
            albumArt: "https://via.placeholder.com/300",
            service: "Apple Music"
        }
    }
];

export const mockStreamingServices = [
    {
        name: "Spotify",
        icon: "~/assets/icons/spotify.png",
        color: "#1DB954",
        isAvailable: true
    },
    {
        name: "Apple Music",
        icon: "~/assets/icons/apple-music.png",
        color: "#FC3C44",
        isAvailable: true
    },
    {
        name: "YouTube Music",
        icon: "~/assets/icons/youtube-music.png",
        color: "#FF0000",
        isAvailable: true
    }
];

export const mockSongSuggestions = [
    {
        title: "Cruel Summer",
        artist: "Taylor Swift",
        album: "Lover",
        albumArt: "https://via.placeholder.com/300",
        genres: ["Pop"]
    },
    {
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        albumArt: "https://via.placeholder.com/300",
        genres: ["Pop", "R&B"]
    }
];