import * as React from "react";
import { AuthService } from "../../../services/AuthService";

export function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleEmailLogin = async () => {
        try {
            setLoading(true);
            await AuthService.loginWithEmail(email, password);
            navigation.navigate("ProfileWizard");
        } catch (error) {
            console.error(error);
            // Show error dialog
        } finally {
            setLoading(false);
        }
    };

    return (
        <flexboxLayout className="flex-1 p-4 bg-gray-100">
            <stackLayout className="w-full space-y-4">
                <label className="text-2xl font-bold text-center text-indigo-600">
                    Welcome Back
                </label>

                <stackLayout className="space-y-4">
                    <textField
                        className="p-4 bg-white rounded-lg"
                        hint="Email"
                        keyboardType="email"
                        autocorrect={false}
                        autocapitalizationType="none"
                        text={email}
                        onTextChange={(e) => setEmail(e.value)}
                    />

                    <textField
                        className="p-4 bg-white rounded-lg"
                        hint="Password"
                        secure={true}
                        text={password}
                        onTextChange={(e) => setPassword(e.value)}
                    />

                    <button
                        className="bg-indigo-600 text-white p-4 rounded-lg"
                        onTap={handleEmailLogin}
                        isEnabled={!loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                    <stackLayout className="space-y-2">
                        <button
                            className="bg-red-500 text-white p-4 rounded-lg"
                            onTap={() => AuthService.loginWithGoogle()}
                        >
                            Continue with Google
                        </button>

                        <button
                            className="bg-green-500 text-white p-4 rounded-lg"
                            onTap={() => AuthService.loginWithSpotify()}
                        >
                            Continue with Spotify
                        </button>

                        <button
                            className="bg-black text-white p-4 rounded-lg"
                            onTap={() => AuthService.loginWithApple()}
                        >
                            Continue with Apple
                        </button>
                    </stackLayout>

                    <button
                        className="text-indigo-600"
                        onTap={() => navigation.navigate("Register")}
                    >
                        Don't have an account? Register
                    </button>
                </stackLayout>
            </stackLayout>
        </flexboxLayout>
    );
}