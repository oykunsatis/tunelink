import { Device } from '@nativescript/core';
import * as React from "react";
import { MusicDetectionService, DetectedTrack } from '../../services/MusicDetectionService';
import { UserMatchingService } from '../../services/UserMatchingService';

export function ListenNowScreen({ navigation }) {
    const [currentTrack, setCurrentTrack] = React.useState<DetectedTrack | null>(null);
    const [nearbyCount, setNearbyCount] = React.useState(0);

    React.useEffect(() => {
        // Start music detection
        MusicDetectionService.startListening();

        // Listen for track changes
        MusicDetectionService.on('trackChanged', (args: any) => {
            setCurrentTrack(args.data);
        });

        // Listen for nearby matches
        UserMatchingService.on('nearbyCountChanged', (args: any) => {
            setNearbyCount(args.data);
        });

        // Cleanup
        return () => {
            MusicDetectionService.stopListening();
            MusicDetectionService.off('trackChanged');
            UserMatchingService.off('nearbyCountChanged');
        };
    }, []);

    return (
        <flexboxLayout className="flex-1 p-4 bg-gray-100">
            <stackLayout className="w-full space-y-6">
                <label className="text-2xl font-bold text-center text-indigo-600">
                    Now Playing
                </label>

                {currentTrack ? (
                    <stackLayout className="bg-white p-4 rounded-lg space-y-2">
                        <image
                            className="h-48 w-48 rounded-lg self-center"
                            src={currentTrack.albumArt}
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
                        
                        {nearbyCount > 0 && (
                            <button
                                className="bg-indigo-600 text-white p-4 rounded-lg text-lg font-semibold"
                                onTap={() => navigation.navigate("Match")}
                            >
                                {nearbyCount} {nearbyCount === 1 ? 'person' : 'people'} nearby listening to this!
                            </button>
                        )}
                    </stackLayout>
                ) : (
                    <stackLayout className="bg-white p-4 rounded-lg">
                        <label className="text-lg text-gray-600 text-center">
                            Waiting for music...
                        </label>
                        <label className="text-sm text-gray-500 text-center">
                            Play something on {Device.os === 'iOS' ? 'Apple Music or Spotify' : 'your music apps'}
                        </label>
                    </stackLayout>
                )}

                <button
                    className="bg-gray-600 text-white p-4 rounded-lg text-lg font-semibold"
                    onTap={() => navigation.navigate("Profile")}
                >
                    View Profile
                </button>
            </stackLayout>
        </flexboxLayout>
    );
}