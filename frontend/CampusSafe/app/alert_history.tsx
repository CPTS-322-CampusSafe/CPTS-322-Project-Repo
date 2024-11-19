import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";
import Logger from "@/logging/logging";

const fetchAlerts = async (searchQuery: string = "") => {
 
};

const AlertHistoryScreen = () => {
    const [alerts, setAlerts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadAlerts();
    }, [searchQuery]);

    const loadAlerts = async () => {
        setLoading(true);
        try {
            const data = await fetchAlerts(searchQuery);
            setAlerts(data);
        } catch (error) {
            Logger.error("Failed to fetch alerts: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderAlertItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.alertItem} onPress={() => router.push(`/alert/${item.id}`)}>
            <Text style={styles.alertTitle}>{item.title}</Text>
            <Text style={styles.alertDate}>{item.date}</Text>
            <Text style={styles.alertDetails}>{item.details}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alert History</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search alerts..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {loading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={alerts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAlertItem}
                    ListEmptyComponent={<Text style={styles.emptyText}>No alerts found.</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    loadingText: {
        textAlign: "center",
        fontSize: 16,
        color: "#888",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#888",
        marginTop: 20,
    },
    alertItem: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    alertDate: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    alertDetails: {
        fontSize: 16,
    },
});

export default AlertHistoryScreen;

