import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to CampusSafe!</Text>
      <Text>Home Screen</Text>
      <Link href="/login">Go to Login Screen</Link>
      <Link href="/register">Go to Register Screen</Link>
    </View>
  );
}
