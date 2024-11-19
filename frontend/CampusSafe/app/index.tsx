import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";
import LoadingSpinner from "@/components/loading_spinner";

const StartScreen = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Check if user is already logged in:
        AuthenticationSystem.isLoggedIn().then((result) => {
            if (result) {
                // Redirect to home if logged in:
                router.push("/home");
            } else {
                // Show login screen if not logged in:
                setLoading(false);
            }
        });
    }, []);

    const handleLogin = () => {
        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }

        AuthenticationSystem.login(email, password)
            .then((result) => {
                if (result.success) {
                    router.push("/home"); // Redirect to home on successful login
                } else {
                    setError("Invalid login credentials.");
                }
            })
            .catch((err) => {
                setError("An error occurred. Please try again.");
            });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <LoadingSpinner />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

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
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        width: "100%",
    },
    error: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
    loginBtn: {
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    loginBtnText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default StartScreen;
