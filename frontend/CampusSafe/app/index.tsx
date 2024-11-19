import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";
import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";
import Logger from "@/logging/logging";

const StartScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (email === "" || password === "") {
            setError("Both fields are required.");
        } else {
            setError("");
            AuthenticationSystem.login(email, password)
                .then((result) => {
                    if (result.success) {
                        Logger.info("Login successful!");
                        router.push("/home"); // Navigate to the home screen on success
                    } else {
                        setError("Invalid login credentials.");
                    }
                })
                .catch((err) => {
                    Logger.error("Login failed: " + err.message);
                    setError("An error occurred while logging in.");
                });
        }
    };

    const handleRegister = () => {
        router.push("/register"); // Navigate to the register screen
    };

    useEffect(() => {
        AuthenticationSystem.isLoggedIn().then((result) => {
            if (result) {
                router.push("/home"); // Redirect to home if already logged in
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, error && !email ? styles.errorInput : null]}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={[styles.input, error && !password ? styles.errorInput : null]}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.footerText}>
                <Text style={styles.dontHaveAccountText}>Don’t have an account? </Text>
                <Pressable onPress={handleRegister}>
                    <Text style={styles.registerText}>Sign up</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    errorInput: {
        borderColor: "red",
    },
    errorMessage: {
        color: "red",
        fontSize: 14,
        marginTop: 5,
    },
    loginBtn: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    loginBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    footerText: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    dontHaveAccountText: {
        fontSize: 16,
    },
    registerText: {
        color: "blue",
        fontSize: 16,
        fontWeight: "bold",
    },
});
