import * as React from "react";
import { UserMatchingService, MatchedUser } from "../../services/UserMatchingService";
import { GestureEventData } from "@nativescript/core";

export function MatchScreen({ navigation }) {
    const [currentMatch, setCurrentMatch] = React.useState<MatchedUser | null>(null);
    const [swipeStartX, setSwipeStartX] = React.useState(0);

    React.useEffect(() => {
        const matches = UserMatchingService.getCurrentMatches();
        if (matches.length > 0) {
            setCurrentMatch(matches[0]);
        }

        const matchListener = (args: any) => {
            setCurrentMatch(args.data);
        };

        UserMatchingService.on('newMatch', matchListener);

        return () => {
            UserMatchingService.off('newMatch', matchListener);
        };
    }, []);

    const handleTouch = (args: GestureEventData) => {
        if (args.action === "down") {
            setSwipeStartX(args.getX());
        } else if (args.action === "up") {
            const deltaX = args.getX() - swipeStartX;
            if (Math.abs(deltaX) > 100 && currentMatch) {
                if (deltaX > 0) {
                    handleLike();
                } else {
                    handleSkip();
                }
            }
        }
    };

    const handleLike = () => {
        if (currentMatch) {
            UserMatchingService.likeUser(currentMatch.id);
            navigation.navigate("Notifications");
        }
    };

    const handleSkip = () => {
        if (currentMatch) {
            UserMatchingService.skipUser(currentMatch.id);
            const matches = UserMatchingService.getCurrentMatches();
            setCurrentMatch(matches[0] || null);
        }
    };

    if (!currentMatch) {
        return (
            <flexboxLayout className="flex-1 items-center justify-center p-4">
                <label className="text-xl text-gray-600 text-center">
                    No matches found nearby.{'\n'}Keep listening to music!
                </label>
            </flexboxLayout>
        );
    }

    return (
        <flexboxLayout 
            className="flex-1 bg-gray-100" 
            onTouch={handleTouch}
        >
            <stackLayout className="flex-1 p-4 space-y-4">
                <image
                    className="h-64 w-64 rounded-full self-center"
                    src={currentMatch.avatar}
                />
                
                <stackLayout className="bg-white p-4 rounded-lg space-y-2">
                    <label className="text-2xl font-bold text-center">
                        {currentMatch.name}, {currentMatch.age}
                    </label>
                    
                    <label className="text-gray-600 text-center">
                        Currently listening to:
                    </label>
                    
                    <stackLayout className="space-y-1">
                        <label className="font-semibold text-center">
                            {currentMatch.currentlyPlaying.title}
                        </label>
                        <label className="text-gray-600 text-center">
                            by {currentMatch.currentlyPlaying.artist}
                        </label>
                    </stackLayout>

                    <stackLayout className="mt-4 space-y-2">
                        <label className="font-semibold">Common Interests:</label>
                        <label>🎵 {currentMatch.commonGenres.join(", ")}</label>
                        <label>👥 {currentMatch.commonArtists.join(", ")}</label>
                    </stackLayout>
                </stackLayout>

                <flexboxLayout className="justify-around mt-4">
                    <button
                        className="bg-red-500 text-white p-4 rounded-full w-16 h-16 text-2xl"
                        onTap={handleSkip}
                    >
                        ✕
                    </button>
                    <button
                        className="bg-green-500 text-white p-4 rounded-full w-16 h-16 text-2xl"
                        onTap={handleLike}
                    >
                        ♥
                    </button>
                </flexboxLayout>
            </stackLayout>
        </flexboxLayout>
    );
}