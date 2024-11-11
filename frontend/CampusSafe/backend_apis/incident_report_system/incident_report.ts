export default class IncidentReport {
    id: number = 0;
    title: string = "";
    summary: string = "";
    description: string = "";
    isVerified: boolean = false;
    isResolved: boolean = false;
    location: string = "";
    emergencyLevel: number = 0;

    deserialize(json: any) {
        this.id = json.id;
        this.title = json.title;
        this.summary = json.summary;
        this.description = json.description;
        this.isVerified = json.is_verified;
        this.isResolved = json.is_resolved;
        this.location = json.location;
        this.emergencyLevel = json.emergency_level;
    }
}
