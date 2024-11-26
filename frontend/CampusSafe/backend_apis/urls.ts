/**
 * This base URL should be:
 *  - "http://10.0.2.2:8000" if being run on an Android emulator
 */
export const baseAPI_URL = "http://10.0.2.2:8000";

export const authAPI_URL = `${baseAPI_URL}/auth`;
export const reportAPI_URL = `${baseAPI_URL}/report`;
export const safetyAPI_URL = `${baseAPI_URL}/posts`;
