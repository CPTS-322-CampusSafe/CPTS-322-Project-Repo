import Logger from "@/logging/logging";

/**
 * This base URL should be:
 *  - "http://10.0.2.2:8000" if being run on an Android emulator
 */
const baseAPI_URL = "http://10.0.2.2:8000";
const authAPI_URL = `${baseAPI_URL}/auth`;

let csrfToken = "";

/**
 * Handles all the authentication operations such as logging in, registering, and logging out.
 */
export default class AuthenticationSystem {
    /**
     * Tries to log the user in with the given username and password.
     *
     * @returns A Promise<string>: a success or error message.
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
                    Logger.debug(json);

                    // Get the CSRF token
                    fetch(`${authAPI_URL}/get_csrf_token/`)
                        .then((response) => response.json())
                        .then((json) => {
                            csrfToken = json.csrfToken;
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
                    "X-CSRFToken": csrfToken,
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
}