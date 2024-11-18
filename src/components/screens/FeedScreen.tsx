import * as React from "react";
import { ScrollView } from "@nativescript/core";
import { SongPost } from '../shared/SongPost';

export function FeedScreen({ navigation }) {
    const [posts, setPosts] = React.useState([
        {
            id: 1,
            user: {
                name: "Sarah Wilson",
                avatar: "https://i.pravatar.cc/150?img=1"
            },
            song: {
                title: "Blinding Lights",
                artist: "The Weeknd",
                albumArt: "https://example.com/album1.jpg"
            },
            timestamp: "2 min ago",
            likes: 42
        },
        {
            id: 2,
            user: {
                name: "Mike Chen",
                avatar: "https://i.pravatar.cc/150?img=2"
            },
            song: {
                title: "Anti-Hero",
                artist: "Taylor Swift",
                albumArt: "https://example.com/album2.jpg"
            },
            timestamp: "15 min ago",
            likes: 128
        }
    ]);

    return (
        <scrollView className="flex-1 bg-gray-100">
            <stackLayout className="space-y-4 p-4">
                {posts.map(post => (
                    <SongPost
                        key={post.id}
                        post={post}
                        onUserTap={() => navigation.navigate("Profile", { userId: post.user.id })}
                    />
                ))}
            </stackLayout>
        </scrollView>
    );
}