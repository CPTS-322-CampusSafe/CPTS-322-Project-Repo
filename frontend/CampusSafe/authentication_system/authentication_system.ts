import Logger from "@/logging/logging";
import * as SecureStore from "expo-secure-store";

/**
 * This base URL should be:
 *  - "http://10.0.2.2:8000" if being run on an Android emulator
 */
const baseAPI_URL = "http://10.0.2.2:8000";
const authAPI_URL = `${baseAPI_URL}/auth`;

/**
 * Handles all the authentication operations such as logging in, registering, and logging out.
 */
export default class AuthenticationSystem {
    static csrfToken = "";

    static {
        // Get stored CSRF token if it exists
        SecureStore.getItemAsync("csrfToken").then((token) => {
            if (token != null) {
                AuthenticationSystem.csrfToken = token;
            }
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
                .then((response) => response.json())
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
     * Tries to create a new account for the user with the given information.
     *
     * @returns A Promise the holds a success boolean and a message containing any errors.
     */
    static register(username: string, email: string, password: string, phoneNumber: string): Promise<{ success: boolean; message: Record<string, string[]> }> {
        let success = false;
        let message: Record<string, string[]> = { username: [], password: [], email: [], phoneNumber: [], main: [] };
        let foundError = false;

        // Make sure the fields are not empty:
        if (username === "") {
            message.username.push("The field may not be blank");
            foundError = true;
        }

        if (password === "") {
            message.password.push("The field may not be blank");
            foundError = true;
        }

        if (email === "") {
            message.email.push("The field may not be blank");
            foundError = true;
        }

        if (phoneNumber === "") {
            message.phoneNumber.push("The field may not be blank");
            foundError = true;
        }

        // Early exit
        if (foundError) {
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
}
