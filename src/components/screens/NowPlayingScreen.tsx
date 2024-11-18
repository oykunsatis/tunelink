import * as React from "react";
import { MusicService, Track } from '../../services/MusicService';

export function NowPlayingScreen({ navigation }) {
    const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);

    React.useEffect(() => {
        // Start tracking music
        MusicService.startTracking();

        // Listen for track changes
        MusicService.on('trackChanged', (args: any) => {
            setCurrentTrack(args.data);
        });

        // Cleanup
        return () => {
            MusicService.stopTracking();
            MusicService.off('trackChanged');
        };
    }, []);

    return (
        <flexboxLayout className="flex-1 p-4 bg-gray-100">
            <stackLayout className="w-full space-y-4">
                <label className="text-2xl font-bold text-center text-indigo-600">
                    Now Playing
                </label>

                {currentTrack ? (
                    <stackLayout className="bg-white p-4 rounded-lg space-y-2">
                        <image
                            className="h-48 w-48 rounded-lg self-center"
                            src={currentTrack.artwork}
                        />
                        <label className="text-xl font-bold text-center">
                            {currentTrack.title}
                        </label>
                        <label className="text-gray-600 text-center">
                            {currentTrack.artist}
                        </label>
                        <label className="text-indigo-600 text-center">
                            Playing on {currentTrack.service}
                        </label>
                        
                        <button
                            className="bg-indigo-600 text-white p-4 rounded-lg text-lg font-semibold"
                            onTap={() => navigation.navigate("Feed", { track: currentTrack })}
                        >
                            Share
                        </button>
                    </stackLayout>
                ) : (
                    <stackLayout className="bg-white p-4 rounded-lg">
                        <label className="text-lg text-gray-600 text-center">
                            Waiting for music...
                        </label>
                        <label className="text-sm text-gray-500 text-center">
                            Start playing music on your device
                        </label>
                    </stackLayout>
                )}

                <button
                    className="bg-gray-600 text-white p-4 rounded-lg text-lg font-semibold"
                    onTap={() => navigation.navigate("Feed")}
                >
                    View Social Feed
                </button>
            </stackLayout>
        </flexboxLayout>
    );
}