import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Switch } from "react-native";

import SafetyPostSystem from "../backend_apis/safety_post_system/safety_post_system";
import SafetyPost from "../backend_apis/safety_post_system/safety_post";
import Logger from "../logging/logging";

const SafetyPostScreen = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [content, setContent] = useState("");
    const router = useRouter();

    const createPost = () => {
        let post = new SafetyPost();
        post.title = title;
        post.author = author;
        post.isPublic = isPublic;
        post.content = content;

        SafetyPostSystem.createPost(post).then((post) => {
            Logger.debug("Post from createPost:", result);
            if (result.success) {
                Logger.debug("Post submitted successfully!");
                router.push("/home");
            } else {
                Logger.error(`Post submission failed: ${result.message}`);
            }
            })
            .catch((error) => {
                Logger.error(`Error submitting Post: ${error}`);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Safety Post</Text>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Author"
                value={author}
                onChangeText={setAuthor}
                style={styles.input}
            />
            <View style={styles.switchContainer}>
                <Text style={styles.label}>Public:</Text>
                <Switch value={isPublic} onValueChange={setIsPublic} />
            </View>
            <TextInput
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
                style={[styles.input, styles.textArea]}
            />
            <Button title="Submit Post" onPress={createPost} color="#990000" />
        </View>
    );
};



export default SafetyPostScreen;
