import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from 'expo-router';

// The minimum length for the user's password
const minimumPasswordLength = 8;

/**
 * Displays the register screen so that the user can create a new account.
 */
export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const noErrorObject: Record<string, string[]> = { username: [], password: [], email: [], phoneNumber: [], main: [] };
    const [error, setError] = useState(noErrorObject);

    const handleRegister = () => {
        setError(noErrorObject);

        if (password !== confirmPassword) {
            // Make sure passwords match
            let error = noErrorObject;
            error.main.push("Passwords do not match.");
            setError(error);
            return;
        } else if (password.length < minimumPasswordLength) {
            // Make sure password has a minimum length
            let error = noErrorObject;
            error.password.push(`Your password must be at least ${minimumPasswordLength} characters long.`);
            setError(error);
            return;
        }

        AuthenticationSystem.register(username, email, password, phoneNumber).then((result) => {
            if (result.success) {
                Alert.alert("Registration successful!");
                // Redirect to login screen here
                router.push('/');
            } else {
                setError(result.message);
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>

            {/* Inputs and Error Messages */}
            <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} keyboardType="default" autoCapitalize="none" />
            {error.username.length !== 0 ? <Text style={styles.errorMessage}>{error.username[0]}</Text> : null}

            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            {error.email.length !== 0 ? <Text style={styles.errorMessage}>{error.email[0]}</Text> : null}

            <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" autoCapitalize="none" />
            {error.phoneNumber.length !== 0 ? <Text style={styles.errorMessage}>{error.phoneNumber[0]}</Text> : null}

            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            {error.password.length !== 0 ? <Text style={styles.errorMessage}>{error.password[0]}</Text> : null}

            <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            {error.main.length !== 0 ? <Text style={styles.errorMessage}>{error.main[0]}</Text> : null}

            <Button title="Register" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    errorMessage: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
    },
});
