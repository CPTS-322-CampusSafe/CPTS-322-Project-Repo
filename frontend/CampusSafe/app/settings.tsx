import { useState } from "react";
import { View, Text, Switch, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const Settings = () => {
    const router = useRouter();
    const [emailEnabled, setEmailEnabled] = useState<boolean>(false);
    const [textEnabled, setTextEnabled] = useState<boolean>(false);
    const [pushEnabled, setPushEnabled] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.rowContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Email Notifications</Text>
                    <Switch
                        value={emailEnabled}
                        onValueChange={() => setEmailEnabled((prev) => !prev)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Push Notifications</Text>
                    <Switch
                        value={pushEnabled}
                        onValueChange={() => setPushEnabled((prev) => !prev)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Text Message Notifications</Text>
                    <Switch
                        value={textEnabled}
                        onValueChange={() => setTextEnabled((prev) => !prev)}
                    />
                </View>
            </View>
            <Button
                title="Close"
                onPress={() => router.push("/")}
                color="#990000"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
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
        width: '50%', 
        paddingBottom: 10,
    },
    label: {
        fontSize: 18,
        marginRight: 8,
    },
    switch: {
        alignItems: "center",
    }
});

export default Settings;
