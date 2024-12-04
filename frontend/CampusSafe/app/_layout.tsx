import { Stack } from "expo-router";
import { MenuProvider } from "react-native-popup-menu";

export default function RootLayout() {
    return (
        <MenuProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="home" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="create_report" options={{ headerShown: false }} />
                <Stack.Screen name="create_post" options={{ headerShown: false }} />
                <Stack.Screen name="resource_screen" options={{ headerShown: false }} />
            </Stack>
        </MenuProvider>
    );
}
