/**
 * Simple logging class that allows for the disabling logging in an production environment.
 */
export default class Logger {
    static log(message: any) {
        if (__DEV__) {
            console.log(message);
        }
    }

    static debug(message: any) {
        if (__DEV__) {
            console.debug(message);
        }
    }

    static info(message: any) {
        if (__DEV__) {
            console.info(message);
        }
    }

    static warn(message: any) {
        if (__DEV__) {
            console.warn(message);
        }
    }

    static error(message: any) {
        if (__DEV__) {
            console.error(message);
        }
    }
}
