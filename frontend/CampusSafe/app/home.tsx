import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import HomeHeader from "@/components/home_header";
import ResourcesScreen from "./resource_screen";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();

const ReportsScreen = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleCreateReport = () => {
        router.push("/create_report");
    };
    return (
        <View style={{ flex: 1 }}>
            {/* Create Report Button */}
            <TouchableOpacity style={styles.button} onPress={handleCreateReport}>
                <Text style={styles.buttonText}>Create Report</Text>
            </TouchableOpacity>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search..." value={search} onChangeText={setSearch} />
            </View>

            {/* Box with Border */}
            <View style={styles.boxContainer}>
                <Text>Display Reports</Text>
            </View>
        </View>
    );
};

export default function Home() {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator>
                {/* navigates between screens */}
                <Tab.Screen
                    name="Reports"
                    component={ReportsScreen}
                    options={{
                        headerTitle: () => <HomeHeader pageTitle="Reports"></HomeHeader>,
                    }}
                />
                <Tab.Screen
                    name="Resources"
                    component={ResourcesScreen}
                    options={{
                        headerTitle: () => <HomeHeader pageTitle="Resources"></HomeHeader>,
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerTitle: () => <HomeHeader pageTitle="Profile"></HomeHeader>,
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 140,
        height: 34,
        position: "absolute",
        top: 20, // Position it near the top
        right: 20, // Align to the right side
        backgroundColor: "#990000", // Button color
        padding: 5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff", // Text color for the button
        fontSize: 16,
        fontWeight: "bold",
    },
    searchContainer: {
        position: "absolute",
        top: 70, // Adjust position to match the new title position
        left: "45%",
        transform: [{ translateX: -150 }], // Center the input
        width: 335,
    },
    searchInput: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    boxContainer: {
        position: "absolute",
        top: 130, // Adjust position below the search bar
        left: "45%",
        transform: [{ translateX: -150 }], // Center the box horizontally
        width: 335,
        height: 490, // Set the height of the box
        borderWidth: 1,
        borderColor: "#808080", // Border color (black)
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9", // Background color of the box
    },
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
