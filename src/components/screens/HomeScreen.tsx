import { Dialogs } from '@nativescript/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";

export function HomeScreen({ navigation }) {
    return (
        <flexboxLayout className="flex-1 p-4 bg-gray-100">
            <stackLayout className="w-full space-y-4">
                <label className="text-2xl font-bold text-center text-indigo-600">
                    Welcome to My App
                </label>
                
                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg text-lg font-semibold"
                    onTap={() => navigation.navigate("Profile")}
                >
                    Go to Profile
                </button>
                
                <button
                    className="bg-green-600 text-white p-4 rounded-lg text-lg font-semibold"
                    onTap={() => Dialogs.alert({
                        title: "Hello!",
                        message: "Welcome to the app!",
                        okButtonText: "Cool!"
                    })}
                >
                    Show Alert
                </button>
            </stackLayout>
        </flexboxLayout>
    );
}