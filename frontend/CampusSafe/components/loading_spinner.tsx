import { Colors } from "@/constants/colors";
import { ActivityIndicator } from "react-native";

const LoadingSpinner = () => {
    return <ActivityIndicator size="large" color={Colors.primary} />;
};

export default LoadingSpinner;
