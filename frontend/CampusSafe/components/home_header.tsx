import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";
import Logger from "@/logging/logging";
import { useRouter } from "expo-router";
import { View, Text, Image } from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

const HomeHeader = (props: { pageTitle: string }) => {
    const router = useRouter();

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                width: 355,
                padding: 15,
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    height: 30,
                    flexGrow: 1,
                }}
            >
                {props.pageTitle}
            </Text>
            <Menu>
                <MenuTrigger>
                    <Image source={require("../assets/images/menu_icon_vertical_dots.png")} style={{ width: 6, height: 26 }} />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption
                        onSelect={() => {
                            AuthenticationSystem.logout().then((result) => {
                                if (result) {
                                    router.push("/login");
                                } else {
                                    Logger.warn("Failed to logout");
                                }
                            });
                        }}
                        text="Logout"
                    />
                </MenuOptions>
            </Menu>
        </View>
    );
};

export default HomeHeader;
