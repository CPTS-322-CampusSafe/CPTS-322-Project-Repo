import AuthenticationSystem from "@/backend_apis/authentication_system/authentication_system";

// For mocking the fetch function; from: https://stackoverflow.com/a/72988932
jest.spyOn(global, "fetch").mockImplementation(jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ data: 100 }) })) as jest.Mock);

// AuthenticationSystem.verify_register_info tests:
test("AuthenticationSystem.verify_register_info normal case", () => {
    let message: Record<string, string[]> = { username: [], password: [], email: [], phoneNumber: [], main: [] };
    expect(AuthenticationSystem.verify_register_info("johnsmith", "john.smith@email.com", "test123", "888-666-2222")).toEqual(message);
});

test("AuthenticationSystem.verify_register_info edge case 1", () => {
    let message: Record<string, string[]> = { username: ["The field may not be blank"], password: [], email: [], phoneNumber: [], main: [] };
    expect(AuthenticationSystem.verify_register_info("", "john.smith@email.com", "test123", "888-666-2222")).toEqual(message);
});

test("AuthenticationSystem.verify_register_info edge case 2", () => {
    let message: Record<string, string[]> = {
        username: ["The field may not be blank"],
        password: ["The field may not be blank"],
        email: ["The field may not be blank"],
        phoneNumber: ["The field may not be blank"],
        main: [],
    };
    expect(AuthenticationSystem.verify_register_info("", "", "", "")).toEqual(message);
});
