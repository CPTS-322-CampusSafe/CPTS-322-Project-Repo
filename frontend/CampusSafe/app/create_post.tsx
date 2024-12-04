import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from "react-native";
import { useRouter } from "expo-router";
import { Switch } from "react-native";

import SafetyPostSystem from "../backend_apis/safety_post_system/safety_post_system";
import SafetyPost from "../backend_apis/safety_post_system/safety_post";
import Logger from "../logging/logging";
import { Colors } from "@/constants/colors";

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

        SafetyPostSystem.createPost(post)
            .then((result) => {
                Logger.debug("Post from createPost:", result);
                if (result.success) {
                    Logger.debug("Post submitted successfully!");
                    router.push("/resource_screen");
                } else {
                    Logger.error(`Post submission failed: ${result.message}`);
                }
            })
            .catch((error) => {
                Logger.error(`Error submitting Post: ${error}`);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Create Safety Post</Text>
            <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="Author" value={author} onChangeText={setAuthor} style={styles.input} />
            <View style={styles.switchContainer}>
                <Text style={styles.label}>Public:</Text>
                <Switch value={isPublic} onValueChange={setIsPublic} />
            </View>
            <TextInput placeholder="Content" value={content} onChangeText={setContent} multiline style={[styles.input, styles.textArea]} />
            <Button title="Submit Post" onPress={createPost} color={Colors.primary} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    textArea: {
        height: 150,
        textAlignVertical: "top",
        padding: 10,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    label: {
        marginRight: 10,
        fontSize: 16,
    },
});

export default SafetyPostScreen;
