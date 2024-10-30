/**
 * This base URL should be:
 *  - "http://10.0.2.2:8000" if being run on an Android emulator
 */
const baseAPI_URL = "http://10.0.2.2:8000";
const authAPI_URL = `${baseAPI_URL}/auth`;

export function login(username: string, password: string) {
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
      console.error(error);
    });
}
