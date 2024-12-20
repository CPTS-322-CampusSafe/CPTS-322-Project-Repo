import Logger from "@/logging/logging";
import * as SecureStore from "expo-secure-store";
import { authAPI_URL } from "../urls";
import { Platform } from "react-native";
import UserSettings from "./user_settings";

/**
 * Handles all the authentication operations such as logging in, registering, and logging out.
 */
export default class AuthenticationSystem {
    static csrfToken = "";

    /**
     * Initalizes this class.
     */
    static init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // Get stored CSRF token if it exists
            if (Platform.OS !== "web") {
                SecureStore.getItemAsync("csrfToken").then((token) => {
                    if (token != null && token !== "") {
                        AuthenticationSystem.csrfToken = token;
                        resolve(true);
                    }
                });
            }

            // Get the CSRF token
            fetch(`${authAPI_URL}/get_csrf_token/`)
                .then((response) => response.json())
                .then((json) => {
                    AuthenticationSystem.csrfToken = json.csrfToken;

                    // Store the token
                    if (Platform.OS !== "web") {
                        SecureStore.setItemAsync("csrfToken", AuthenticationSystem.csrfToken);
                    }
                    resolve(true);
                })
                .catch((error) => {
                    Logger.error(error); // There was an error
                    resolve(false);
                });
        });
    }

    /**
     * Tries to log the user in with the given username and password.
     *
     * @returns A Promise the holds a success boolean and a message.
     */
    static login(username: string, password: string): Promise<{ success: boolean; message: string }> {
        return new Promise((resolve, reject) => {
            fetch(`${authAPI_URL}/login/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        resolve({ success: false, message: "Failed to login." });
                    }
                })
                .then((json) => {
                    // Get the CSRF token
                    fetch(`${authAPI_URL}/get_csrf_token/`)
                        .then((response) => response.json())
                        .then((json) => {
                            AuthenticationSystem.csrfToken = json.csrfToken;

                            // Store the token
                            SecureStore.setItemAsync("csrfToken", AuthenticationSystem.csrfToken);

                            resolve({
                                success: true,
                                message: "Successfully logged in.",
                            });
                        })
                        .catch((error) => {
                            Logger.error(error); // There was an error
                            reject();
                        });
                })
                .catch((error) => {
                    Logger.error(error); // There was an error
                    reject();
                });
        });
    }

    /**
     * Tests to see if the user is logged in.
     *
     * @returns A Promise of a boolean: whether or not the user is logged in.
     */
    static isLoggedIn(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(`${authAPI_URL}/is_logged_in/`)
                .then((response) => {
                    SecureStore.setItemAsync("csrfToken", "");

                    if (response.ok) {
                        resolve(true); // Is logged in
                    } else {
                        resolve(false); // Is not logged in
                    }
                })
                .catch((error) => {
                    Logger.error(error);
                    reject(); // Got some sort of error
                });
        });
    }

    /**
     * Tries to log the user out of their account.
     *
     * @returns A Promise of a boolean: if true then logout was successful, otherwise it was not.
     */
    static logout(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(`${authAPI_URL}/logout/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": AuthenticationSystem.csrfToken,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        // Success
                        resolve(true);
                    } else {
                        // Failure
                        resolve(false);
                    }
                })
                .catch((error) => {
                    Logger.error(error);
                    reject(); // Got some sort of error
                });
        });
    }

    /**
     * Tries to get the user's profile.
     *
     * @returns A Promise containing information about the user's profile. data will be null if
     * the request fails.
     */
    static getProfile(): Promise<{ success: boolean; data: any }> {
        return new Promise((resolve, reject) => {
            fetch(`${authAPI_URL}/get_profile/`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        resolve({ success: false, data: null });
                    }
                })
                .then((json) => {
                    resolve({ success: true, data: json });
                })
                .catch((error) => {
                    Logger.error(error);
                    reject(); // Got some sort of error
                });
        });
    }

    /**
     * Checks if the given register info is valid or not.
     *
     * @param username The username.
     * @param email The user's email.
     * @param password The password.
     * @param phoneNumber The user's phone number.
     * @returns Any errors.
     */
    static verify_register_info(username: string, email: string, password: string, phoneNumber: string): Record<string, string[]> {
        let message: Record<string, string[]> = { username: [], password: [], email: [], phoneNumber: [], main: [] };

        // Make sure the fields are not empty:
        if (username === "") {
            message.username.push("The field may not be blank");
        }

        if (password === "") {
            message.password.push("The field may not be blank");
        }

        if (email === "") {
            message.email.push("The field may not be blank");
        }

        if (phoneNumber === "") {
            message.phoneNumber.push("The field may not be blank");
        }

        return message;
    }

    /**
     * Tries to create a new account for the user with the given information.
     *
     * @returns A Promise the holds a success boolean and a message containing any errors.
     */
    static register(username: string, email: string, password: string, phoneNumber: string): Promise<{ success: boolean; message: Record<string, string[]> }> {
        let success = false;
        let message: Record<string, string[]> = this.verify_register_info(username, email, password, phoneNumber);

        // Early exit:
        if (message["username"].length !== 0 || message["email"].length !== 0 || message["password"].length !== 0 || message["phoneNumber"].length !== 0 || message["main"].length !== 0) {
            return new Promise((resolve) => {
                resolve({ success: success, message: message });
            });
        }

        // Make request to server:
        return new Promise((resolve, reject) => {
            fetch(`${authAPI_URL}/register/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_data: {
                        username: username,
                        email: email,
                        password: password,
                    },
                    phone_number: phoneNumber,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        success = true;
                    }

                    return response.json();
                })
                .then((json) => {
                    // Check for errors:
                    if (Array.isArray(json.username)) {
                        message.username = json.username;
                    }

                    if (Array.isArray(json.password)) {
                        message.password = json.password;
                    }

                    if (Array.isArray(json.email)) {
                        message.email = json.email;
                    }

                    if (Array.isArray(json.phone_number)) {
                        message.phoneNumber = json.phone_number;
                    }

                    if (json.user_data) {
                        message.main.push("Missing some fields.");
                    }

                    resolve({ success: success, message: message });
                })
                .catch((error) => {
                    Logger.error(error); // There was an error
                    reject();
                });
        });
    }

    /**
     * Updates the current user's settings.
     *
     * @param newSettings The new settings.
     * @returns A Promise of whether the operation succeeded or not.
     */
    static updateSettings(newSettings: UserSettings): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fetch(`${authAPI_URL}/update_settings/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRFToken": AuthenticationSystem.csrfToken,
                },
                body: JSON.stringify({
                    recieve_email_notifications: newSettings.recieveEmailNotifications,
                    recieve_SMS_notifications: newSettings.recieveSMSNotifications,
                    recieve_in_app_notifications: newSettings.recieveInAppNotifications,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => {
                    Logger.error(error); // There was an error
                    reject();
                });
        });
    }
}
