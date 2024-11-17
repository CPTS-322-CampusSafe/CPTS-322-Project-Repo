import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const ReportsScreen = () => {
    const [search, setSearch] = useState("");

    return (
        <View style={{ flex: 1 }}>
            {/* Create Report Button */}
            <TouchableOpacity style={styles.button}>
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

const ResourcesScreen = () => (
    <View style={styles.screen}>
        <Text>No Resources Available</Text>
    </View>
);

const ProfileScreen = () => (
    <View style={styles.screen}>
        <Text>No Profile Information</Text>
    </View>
);

export default function Home() {
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator>
                {/* navigates between screens */}
                <Tab.Screen
                    name="Reports"
                    component={ReportsScreen}
                    options={{
                        title: "Reports",
                        headerTitleStyle: {
                            fontSize: 20,
                            height: 30,
                        },
                    }}
                />
                <Tab.Screen
                    name="Resources"
                    component={ResourcesScreen}
                    options={{
                        title: "Resources",
                        headerTitleStyle: {
                            fontSize: 20,
                        },
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        title: "Profile",
                        headerTitleStyle: {
                            fontSize: 20,
                        },
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
