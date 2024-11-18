import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";
import Logger from "@/logging/logging";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from 'expo-router';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        router.push('/home');
    };

    const handleRegister = () => {
        router.push('/register');
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
        borderColor: "#ccc",
        borderRadius: 8,
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
        borderColor: "#ccc",
        borderRadius: 4,
    },
    errorInput: {
        borderColor: "red",
    },
    errorMessage: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
    },
    loginBtn: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 4,
        alignItems: "center",
    },
    loginBtnText: {
        color: "#fff",
        fontSize: 16,
    },
    footerText: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
   dontHaveAccountText: {
        fontSize: 16,
    },
    registerText: {
        color: "blue",
        fontSize: 16,
    },
});

export default LoginPage;
