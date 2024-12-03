/**
 * Replace "authentication_system.ts" with this file to not make any network requests.
 */

/**
 * Handles all the authentication operations such as logging in, registering, and logging out.
 */
export default class AuthenticationSystem {
    static csrfToken = "";

    /**
     * Tries to log the user in with the given username and password.
     *
     * @returns A Promise the holds a success boolean and a message.
     */
    static login(username: string, password: string): Promise<{ success: boolean; message: string }> {
        return new Promise((resolve, reject) => {
            resolve({ success: true, message: "Success!" });
        });
    }

    /**
     * Tests to see if the user is logged in.
     *
     * @returns A Promise of a boolean: whether or not the user is logged in.
     */
    static isLoggedIn(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    /**
     * Tries to log the user out of their account.
     *
     * @returns A Promise of a boolean: if true then logout was successful, otherwise it was not.
     */
    static logout(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(true);
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
            resolve({ success: true, data: "Data" });
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
            success = true;
            resolve({ success: success, message: message });
        });
    }
}
