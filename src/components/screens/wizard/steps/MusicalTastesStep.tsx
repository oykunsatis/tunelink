import * as React from "react";
import { RecommendationService } from "../../../../services/RecommendationService";
import { mockGenres } from "../../../../data/mockData";

export function MusicalTastesStep({ onComplete, userData }) {
    const [selectedGenres, setSelectedGenres] = React.useState<string[]>(
        userData?.musicalTastes?.genres || []
    );
    const [favoriteArtists, setFavoriteArtists] = React.useState<string[]>(
        userData?.musicalTastes?.artists || []
    );
    const [suggestedGenres, setSuggestedGenres] = React.useState<string[]>([]);
    const [suggestedArtists, setSuggestedArtists] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        loadSuggestions();
    }, [selectedGenres, favoriteArtists]);

    const loadSuggestions = async () => {
        setLoading(true);
        try {
            const [genres, artists] = await Promise.all([
                RecommendationService.getGenreSuggestions(selectedGenres),
                RecommendationService.getArtistSuggestions(favoriteArtists)
            ]);
            setSuggestedGenres(genres);
            setSuggestedArtists(artists);
        } catch (error) {
            console.error('Error loading suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleGenre = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const addArtist = (artist: string) => {
        if (artist && !favoriteArtists.includes(artist)) {
            setFavoriteArtists([...favoriteArtists, artist]);
        }
    };

    const handleSubmit = () => {
        onComplete({
            musicalTastes: {
                genres: selectedGenres,
                artists: favoriteArtists
            }
        });
    };

    return (
        <scrollView>
            <stackLayout className="space-y-4 p-4">
                <label className="text-xl font-bold">Your Favorite Genres</label>
                
                <wrapLayout className="space-x-2 space-y-2">
                    {mockGenres.map((genre, index) => (
                        <button
                            key={index}
                            className={`p-2 rounded-full ${
                                selectedGenres.includes(genre)
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-gray-800'
                            }`}
                            onTap={() => toggleGenre(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </wrapLayout>

                {suggestedGenres.length > 0 && (
                    <>
                        <label className="text-lg font-semibold mt-4">Suggested Genres</label>
                        <wrapLayout className="space-x-2 space-y-2">
                            {suggestedGenres.map((genre, index) => (
                                <button
                                    key={index}
                                    className="p-2 rounded-full bg-gray-200 text-gray-800"
                                    onTap={() => toggleGenre(genre)}
                                >
                                    {genre}
                                </button>
                            ))}
                        </wrapLayout>
                    </>
                )}

                <label className="text-xl font-bold mt-6">Your Favorite Artists</label>
                
                <gridLayout className="space-y-2" rows="auto" columns="*, auto">
                    <textField
                        col="0"
                        className="p-4 bg-white rounded-lg"
                        hint="Type an artist name"
                        returnKeyType="done"
                        onReturnPress={(e) => addArtist(e.object.text)}
                    />
                </gridLayout>

                {suggestedArtists.length > 0 && (
                    <>
                        <label className="text-lg font-semibold">Suggested Artists</label>
                        <wrapLayout className="space-x-2 space-y-2">
                            {suggestedArtists.map((artist, index) => (
                                <button
                                    key={index}
                                    className="p-2 rounded-full bg-gray-200 text-gray-800"
                                    onTap={() => addArtist(artist.name)}
                                >
                                    {artist.name}
                                </button>
                            ))}
                        </wrapLayout>
                    </>
                )}

                <stackLayout className="space-y-2 mt-4">
                    {favoriteArtists.map((artist, index) => (
                        <label key={index} className="text-gray-800 bg-white p-2 rounded">
                            {artist}
                        </label>
                    ))}
                </stackLayout>

                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg mt-4"
                    onTap={handleSubmit}
                    isEnabled={!loading}
                >
                    {loading ? "Loading..." : "Complete Setup"}
                </button>
            </stackLayout>
        </scrollView>
    );
}