/**
 * This base URL should be:
 *  - "http://10.0.2.2:8000" if being run on an Android emulator
 */
const baseAPI_URL = "http://10.0.2.2:8000";
const authAPI_URL = `${baseAPI_URL}/auth`;

let csrf_token = "";

type AuthResult = {
    success: boolean;
    message: string;
};

/**
 * Handles all the authentication operations such as logging in, registering, and logging out.
 */
export default class AuthenticationSystem {
    /**
     * Tries to log the user in with the given username and password.
     *
     * @returns A Promise<string>: a success or error message.
     */
    static login(username: string, password: string): Promise<AuthResult> {
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
                    console.log(json);

                    // Get the CSRF token
                    fetch(`${authAPI_URL}/get_csrf_token/`)
                        .then((response) => response.json())
                        .then((json) => {
                            csrf_token = json.csrfToken;
                            resolve({
                                success: true,
                                message: "Successfully logged in.",
                            });
                        })
                        .catch((error) => {
                            console.error(error); // There was an error
                            reject();
                        });
                })
                .catch((error) => {
                    console.error(error); // There was an error
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
                    console.error(error);
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
                    "X-CSRFToken": csrf_token,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        // Success
                        console.log("Successful logout");
                        resolve(true);
                    } else {
                        // Failure
                        console.log("Failed logout");
                        resolve(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    reject(); // Got some sort of error
                });
        });
    }
}
