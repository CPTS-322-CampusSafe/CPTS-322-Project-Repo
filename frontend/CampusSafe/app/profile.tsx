import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";
import LoadingSpinner from "@/components/loading_spinner";
import Logger from "@/logging/logging";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const ProfileScreen = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (loading) {
            AuthenticationSystem.getProfile().then((response) => {
                if (response.success) {
                    setProfile(response.data);
                    setLoading(false);
                    Logger.debug("Successfully got profile.");
                } else {
                    Logger.debug("Failed to get profile.");
                }
            });
        }
    });

    return (
        <View style={styles.screen}>
            {loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : (
                <View>
                    <Text style={[styles.text, styles.username]}>{profile["username"]}</Text>
                    <Text style={styles.text}>{profile["email"]}</Text>
                    <Text style={styles.text}>{profile["phone_number"]}</Text>
                    <Text style={[styles.text, styles.adminText]}>{profile["is_user_admin"] ? "You are an admin" : ""}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
    username: {
        fontWeight: "600",
        fontSize: 28,
    },
    adminText: {
        textDecorationLine: "underline",
    },
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProfileScreen;
