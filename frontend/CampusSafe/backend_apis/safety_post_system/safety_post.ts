export default class SafetyPost {
    // These are read only and are not sent to the server:
    id: number = 0;
    createdAt: Date = new Date(); // When this post was recieved by the server

    // These will be sent to the server:
    title: string = "";
    author: string = "";
    content: string = "";
    isPublic: boolean = true;

    deserialize(json: any) {
        this.id = json.id;
        this.title = json.title;
        this.author = json.author;
        this.isPublic = json.is_public;
        this.createdAt = new Date(json.created_at);
    }
}
