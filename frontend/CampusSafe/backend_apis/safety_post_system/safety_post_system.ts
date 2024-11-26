import Logger from "@/logging/logging";
import { safetyAPI_URL } from "../urls";
import SafetyPost from "./safety_post";
import AuthenticationSystem from "../authentication_system/authentication_system";

/**
 * Handles all the safety post operations such as creating a post or getting existing posts.
 */
export default class SafetyPostSystem {
    /**
     * Sends a new safety post to the sever.
     *
     * @returns A Promise containing the result returned from the server.
     */
    static createPost(post: SafetyPost): Promise<{ success: boolean; message: string }> {
        let success = false;

        return new Promise((resolve, reject) => {
            fetch(`${safetyAPI_URL}/create_post/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRFToken": AuthenticationSystem.csrfToken,
                },
                body: JSON.stringify({
                    title: post.title,
                    author: post.author,
                    is_public: post.isPublic,
                    content: post.content,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        success = true;
                    } else {
                        success = false;
                    }

                    return response.json();
                })
                .then((json) => {
                    resolve({ success: success, message: json });
                })
                .catch((error) => {
                    Logger.error(error); // There was an error
                    reject();
                });
        });
    }

    /**
     * Gets the most recient safety posts from the server. Does not get any of the post's content.
     *
     * @returns A Promise containing the requested posts.
     */
    static getPosts(): Promise<{ success: boolean; posts: SafetyPost[] }> {
        let success = false;

        return new Promise((resolve, reject) => {
            fetch(`${safetyAPI_URL}/get_posts/`)
                .then((response) => {
                    if (response.ok) {
                        success = true;
                        return response.json();
                    } else {
                        resolve({ success: success, posts: [] });
                    }
                })
                .then((json) => {
                    let posts = new Array<SafetyPost>();

                    for (let post of json) {
                        let newPost = new SafetyPost();
                        newPost.deserialize(post);
                        posts.push(newPost);
                    }

                    resolve({ success: success, posts: posts });
                })
                .catch((error) => {
                    Logger.error(error); // There was an error
                    reject();
                });
        });
    }

    /**
     * Gets the content of the given post.
     *
     * @returns A Promise containing the requested content.
     */
    static getPostContent(postID: number): Promise<{ success: boolean; content: string }> {
        let success = false;

        return new Promise((resolve, reject) => {
            fetch(`${safetyAPI_URL}/get_post_content?id=${postID}`)
                .then((response) => {
                    if (response.ok) {
                        success = true;
                        return response.text();
                    } else {
                        resolve({ success: success, content: "" });
                    }
                })
                .then((text) => {
                    if (text !== undefined) {
                        resolve({ success: success, content: text });
                    } else {
                        resolve({ success: success, content: "" });
                    }
                })
                .catch((error) => {
                    Logger.error(error); // There was an error
                    reject();
                });
        });
    }
}
