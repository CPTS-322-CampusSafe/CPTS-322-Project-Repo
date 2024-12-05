import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";
import Logger from "@/logging/logging";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/colors";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if (email === "" || password === "") {
            setError("Both fields are required.");
        } else {
            setError("");
            AuthenticationSystem.login(email, password)
                .then((result) => {
                    if (result.success) {
                        Logger.info("Login successful!");
                        router.push("/home"); // Navigate to home page on success
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
        router.push("/register");
    };

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.formGroup}>
                <Text>Email</Text>
                <TextInput style={[styles.input, error && !email ? styles.errorInput : null]} placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            </View>

            <View style={styles.formGroup}>
                <Text>Password</Text>
                <TextInput style={[styles.input, error && !password ? styles.errorInput : null]} placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry={true} />
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

const styles = StyleSheet.create({
    loginContainer: {
        width: "80%",
        margin: "auto",
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        backgroundColor: Colors.background,
    },
    title: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 24,
    },
    formGroup: {
        marginBottom: 15,
    },
    input: {
        width: "100%",
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 4,
    },
    errorInput: {
        borderColor: Colors.errorMessage,
    },
    errorMessage: {
        color: Colors.errorMessage,
        fontSize: 12,
        marginBottom: 10,
    },
    loginBtn: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 4,
        alignItems: "center",
    },
    loginBtnText: {
        color: Colors.primaryText,
        fontSize: 16,
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
        color: Colors.link,
        fontSize: 16,
    },
});

export default LoginPage;
