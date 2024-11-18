import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { ProfileWizardScreen } from './screens/wizard/ProfileWizardScreen';
import { MainStack } from './MainStack';
import { FirebaseService } from '../services/FirebaseService';

const StackNavigator = stackNavigatorFactory();

export function AppContainer() {
    const [initializing, setInitializing] = React.useState(true);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = FirebaseService.onAuthStateChanged((user) => {
            setUser(user);
            if (initializing) setInitializing(false);
        });

        return unsubscribe;
    }, []);

    if (initializing) {
        return (
            <flexboxLayout className="flex-1 items-center justify-center">
                <activityIndicator busy={true} />
            </flexboxLayout>
        );
    }

    return (
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName={user ? "Main" : "Login"}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            >
                {user ? (
                    <>
                        <StackNavigator.Screen 
                            name="Main" 
                            component={MainStack} 
                        />
                        <StackNavigator.Screen 
                            name="ProfileWizard" 
                            component={ProfileWizardScreen} 
                        />
                    </>
                ) : (
                    <>
                        <StackNavigator.Screen 
                            name="Login" 
                            component={LoginScreen} 
                        />
                        <StackNavigator.Screen 
                            name="Register" 
                            component={RegisterScreen} 
                        />
                    </>
                )}
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    );
}