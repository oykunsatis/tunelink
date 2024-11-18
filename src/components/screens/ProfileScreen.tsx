import * as React from "react";
import { StyleSheet } from "react-nativescript";

export function ProfileScreen({ navigation }) {
    return (
        <flexboxLayout className="flex-1 p-4 bg-gray-100">
            <stackLayout className="w-full space-y-4">
                <image
                    className="h-24 w-24 rounded-full self-center"
                    src="https://i.pravatar.cc/300"
                />
                
                <label className="text-xl font-bold text-center">
                    John Doe
                </label>
                
                <label className="text-gray-600 text-center">
                    john.doe@example.com
                </label>
                
                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg text-lg font-semibold"
                    onTap={() => navigation.goBack()}
                >
                    Go Back
                </button>
            </stackLayout>
        </flexboxLayout>
    );
}