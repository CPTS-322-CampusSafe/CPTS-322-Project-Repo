export default class IncidentReport {
    // These are read only and are not sent to the server:
    id: number = 0;
    isVerified: boolean = false;
    isResolved: boolean = false;
    recievedAt: Date = new Date(); // When this report was recieved by the server
    updatedAt: Date = new Date(); // The last time this report was updated
    verifiedAt: Date = new Date(); // The time this report was verified by an admin
    resolvedAt: Date = new Date(); // The time this report was marked as resolved

    // These will be sent to the server:
    title: string = "";
    summary: string = "";
    description: string = "";
    location: string = "";

    /**
     * 0-5: non emergencies
     * 5-10: emergencies (should send notification)
     */
    emergencyLevel: number = 0;

    happenedAt: Date = new Date(); // The time that the user said this incident happened

    deserialize(json: any) {
        this.id = json.id;
        this.title = json.title;
        this.summary = json.summary;
        this.description = json.description;
        this.isVerified = json.is_verified;
        this.isResolved = json.is_resolved;
        this.location = json.location;
        this.emergencyLevel = json.emergency_level;

        this.recievedAt = new Date(json.recieved_at);
        this.updatedAt = new Date(json.updated_at);
        this.verifiedAt = new Date(json.verified_at);
        this.resolvedAt = new Date(json.resolved_at);
        this.happenedAt = new Date(json.happended_at);
    }
}
