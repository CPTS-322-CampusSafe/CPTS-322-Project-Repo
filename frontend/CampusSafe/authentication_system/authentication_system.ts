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
  /**
   * Tries to log the user in with the given username and password.
   */
  static login(username: string, password: string) {
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
      })
      .catch((error) => {
        console.error(error); // There was an error
      });
  }

  /**
   * Tests to see if the user is logged in.
   *
   * @returns A Promise of a boolean.
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
}
