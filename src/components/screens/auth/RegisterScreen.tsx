import * as React from "react";
import { AuthService } from "../../../services/AuthService";

export function RegisterScreen({ navigation }) {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleRegister = async () => {
        try {
            setLoading(true);
            await AuthService.registerWithEmail({
                email,
                password,
                name,
                surname
            });
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
                    Create Account
                </label>

                <stackLayout className="space-y-4">
                    <textField
                        className="p-4 bg-white rounded-lg"
                        hint="Name"
                        text={name}
                        onTextChange={(e) => setName(e.value)}
                    />

                    <textField
                        className="p-4 bg-white rounded-lg"
                        hint="Surname"
                        text={surname}
                        onTextChange={(e) => setSurname(e.value)}
                    />

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
                        onTap={handleRegister}
                        isEnabled={!loading}
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>

                    <button
                        className="text-indigo-600"
                        onTap={() => navigation.navigate("Login")}
                    >
                        Already have an account? Login
                    </button>
                </stackLayout>
            </stackLayout>
        </flexboxLayout>
    );
}