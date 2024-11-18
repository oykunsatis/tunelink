import * as React from "react";
import { FirebaseService } from "../../services/FirebaseService";

interface Notification {
    id: string;
    type: 'match' | 'like' | 'message';
    from: {
        id: string;
        name: string;
        avatar: string;
    };
    timestamp: Date;
    read: boolean;
}

export function NotificationsScreen({ navigation }) {
    const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            setLoading(true);
            const user = FirebaseService.getCurrentUser();
            if (user) {
                // In a real app, we would fetch from Firebase
                setNotifications([
                    {
                        id: '1',
                        type: 'match',
                        from: {
                            id: 'user1',
                            name: 'Sarah Wilson',
                            avatar: 'https://i.pravatar.cc/150?img=1'
                        },
                        timestamp: new Date(),
                        read: false
                    }
                ]);
            }
        } catch (error) {
            console.error('Error loading notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationTap = (notification: Notification) => {
        switch (notification.type) {
            case 'match':
                navigation.navigate('Profile', { userId: notification.from.id });
                break;
            case 'like':
                navigation.navigate('Match');
                break;
            case 'message':
                // TODO: Implement chat feature
                break;
        }
    };

    if (loading) {
        return (
            <flexboxLayout className="flex-1 items-center justify-center">
                <activityIndicator busy={true} />
            </flexboxLayout>
        );
    }

    return (
        <scrollView className="flex-1 bg-gray-100">
            <stackLayout className="p-4 space-y-4">
                {notifications.length === 0 ? (
                    <label className="text-gray-600 text-center p-4">
                        No notifications yet
                    </label>
                ) : (
                    notifications.map(notification => (
                        <gridLayout
                            key={notification.id}
                            className={`bg-white p-4 rounded-lg ${!notification.read ? 'border-l-4 border-indigo-600' : ''}`}
                            rows="auto, auto"
                            columns="auto, *"
                            onTap={() => handleNotificationTap(notification)}
                        >
                            <image
                                row="0"
                                col="0"
                                rowSpan="2"
                                className="w-12 h-12 rounded-full mr-4"
                                src={notification.from.avatar}
                            />
                            <label
                                row="0"
                                col="1"
                                className="font-semibold"
                            >
                                {notification.from.name}
                            </label>
                            <label
                                row="1"
                                col="1"
                                className="text-gray-600"
                            >
                                {notification.type === 'match' ? 'New musical match!' : 'Liked your profile'}
                            </label>
                        </gridLayout>
                    ))
                )}
            </stackLayout>
        </scrollView>
    );
}