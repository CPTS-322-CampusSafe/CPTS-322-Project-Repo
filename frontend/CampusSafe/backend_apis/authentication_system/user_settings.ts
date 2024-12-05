export default class UserSettings {
    constructor(email: boolean, sms: boolean, inApp: boolean) {
        this.recieveEmailNotifications = email;
        this.recieveSMSNotifications = sms;
        this.recieveInAppNotifications = inApp;
    }

    recieveEmailNotifications: boolean = true;
    recieveSMSNotifications: boolean = true;
    recieveInAppNotifications: boolean = true;
}
