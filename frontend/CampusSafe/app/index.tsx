import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import LoadingSpinner from "@/components/loading_spinner";

const StartScreen = () => {
    const router = useRouter();

    useEffect(() => {
        // Initialize:
        AuthenticationSystem.init().then((result) => {
            if (result) {
                // Check if user is logged in:
                AuthenticationSystem.isLoggedIn().then((result) => {
                    if (result) {
                        // Logged in:
                        router.push("/home");
                    } else {
                        // Not logged in:
                        router.push("/login");
                    }
                });
            }
        });
    });

    return (
        <View style={styles.container}>
            <LoadingSpinner></LoadingSpinner>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});

export default StartScreen;
