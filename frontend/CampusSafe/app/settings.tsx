import { useEffect, useState } from "react";
import { View, Text, Switch, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";
import UserSettings from "@/backend_apis/authentication_system/user_settings";
import Logger from "@/logging/logging";
import LoadingSpinner from "@/components/loading_spinner";

const Settings = () => {
    const router = useRouter();
    const [emailEnabled, setEmailEnabled] = useState<boolean>(false);
    const [textEnabled, setTextEnabled] = useState<boolean>(false);
    const [pushEnabled, setPushEnabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        AuthenticationSystem.getProfile().then((result) => {
            if (result.success) {
                setEmailEnabled(result.data.settings.recieve_email_notifications);
                setTextEnabled(result.data.settings.recieve_SMS_notifications);
                setPushEnabled(result.data.settings.recieve_in_app_notifications);
                setLoading(false);
                Logger.debug("Successfully got settings.");
            } else {
                Logger.debug("Failed to get settings.");
                Alert.alert("Failed to get settings."); // Display error for the user
                router.push("/");
            }
        });
    }, [router]);

    return loading ? (
        <LoadingSpinner></LoadingSpinner>
    ) : (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.rowContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Email Notifications</Text>
                    <Switch value={emailEnabled} onValueChange={() => setEmailEnabled((prev) => !prev)} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Push Notifications</Text>
                    <Switch value={pushEnabled} onValueChange={() => setPushEnabled((prev) => !prev)} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Text Message Notifications</Text>
                    <Switch value={textEnabled} onValueChange={() => setTextEnabled((prev) => !prev)} />
                </View>
            </View>
            <Button
                title="Save"
                onPress={() => {
                    // Send settings to backend:
                    AuthenticationSystem.updateSettings(new UserSettings(emailEnabled, textEnabled, pushEnabled)).then((success) => {
                        if (success) {
                            Logger.debug("Successfully updated settings.");
                        } else {
                            Logger.debug("Failed to update settings.");
                            Alert.alert("Failed to update settings."); // Display error for the user
                        }
                    });
                    router.push("/");
                }}
                color="#990000"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center",
        paddingVertical: 10,
    },
    rowContainer: {
        alignItems: "center",
        margin: 50,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "50%",
        paddingBottom: 10,
    },
    label: {
        fontSize: 18,
        marginRight: 8,
    },
    switch: {
        alignItems: "center",
    },
});

export default Settings;
