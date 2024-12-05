import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import HomeHeader from "@/components/home_header";
import ResourcesScreen from "./resource_screen";
import ProfileScreen from "./profile";
import ReportsScreen from "./reports";

const Tab = createBottomTabNavigator();

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
