import * as React from "react";

export function SongPost({ post, onUserTap }) {
    const [liked, setLiked] = React.useState(false);

    return (
        <stackLayout className="bg-white rounded-lg p-4 shadow-md">
            <flexboxLayout className="justify-between items-center">
                <flexboxLayout className="items-center space-x-2" onTap={onUserTap}>
                    <image
                        className="h-10 w-10 rounded-full"
                        src={post.user.avatar}
                    />
                    <stackLayout>
                        <label className="font-semibold">{post.user.name}</label>
                        <label className="text-xs text-indigo-600">
                            via {post.song.service}
                        </label>
                    </stackLayout>
                </flexboxLayout>
                <label className="text-gray-500 text-sm">{post.timestamp}</label>
            </flexboxLayout>

            <stackLayout className="my-4 space-y-2">
                <image
                    className="h-48 rounded-lg"
                    src={post.song.albumArt}
                />
                <label className="font-bold">{post.song.title}</label>
                <label className="text-gray-600">{post.song.artist}</label>
                <label className="text-sm text-gray-500">{post.song.album}</label>
            </stackLayout>

            <flexboxLayout className="justify-between items-center">
                <button
                    className={`${liked ? 'text-red-500' : 'text-gray-500'} font-semibold`}
                    onTap={() => setLiked(!liked)}
                >
                    ♥ {post.likes + (liked ? 1 : 0)}
                </button>
                <button className="text-gray-500 font-semibold">
                    Share
                </button>
            </flexboxLayout>
        </stackLayout>
    );
}