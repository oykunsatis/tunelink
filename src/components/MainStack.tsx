import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { ListenNowScreen } from "./screens/ListenNowScreen";
import { MatchScreen } from "./screens/MatchScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";

const StackNavigator = stackNavigatorFactory();

export function MainStack() {
    return (
        <StackNavigator.Navigator
            initialRouteName="ListenNow"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#6366f1"
                },
                headerTintColor: "#ffffff"
            }}
        >
            <StackNavigator.Screen
                name="ListenNow"
                component={ListenNowScreen}
                options={{ title: "Now Playing" }}
            />
            <StackNavigator.Screen
                name="Match"
                component={MatchScreen}
                options={{ title: "Musical Soulmate" }}
            />
            <StackNavigator.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Profile" }}
            />
            <StackNavigator.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{ title: "Notifications" }}
            />
        </StackNavigator.Navigator>
    );
}