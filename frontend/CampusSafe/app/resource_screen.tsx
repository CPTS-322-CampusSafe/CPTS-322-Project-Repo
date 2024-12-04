import SafetyPost from "@/backend_apis/safety_post_system/safety_post";
import SafetyPostSystem from "@/backend_apis/safety_post_system/safety_post_system";
import React from "react";
import { Text, View, StyleSheet, FlatList, Platform, ScrollView, TouchableOpacity, Pressable } from "react-native";
import HTMLView from "react-native-htmlview";
import { Colors } from "@/constants/colors";
import Logger from "@/logging/logging";
import LoadingSpinner from "@/components/loading_spinner";

const ResourcesScreen = () => {
    const [posts, setPosts] = React.useState<SafetyPost[] | undefined>(undefined);
    const [currentPost, setCurrentPost] = React.useState<SafetyPost | undefined>(undefined);

    React.useEffect(() => {
        SafetyPostSystem.getPosts()
            .then((result) => {
                if (result.success) {
                    Logger.debug("Succesfully retrieved posts.");
                    setPosts(result.posts);
                } else {
                    Logger.error("Post retrieval failed.");
                }
            })
            .catch((error) => {
                Logger.error("Error in retrieving posts.");
            });
    }, []);

    return (
        <View style={styles.screen}>
            {posts === undefined ? ( // If the posts are still being fetched:
                <LoadingSpinner></LoadingSpinner>
            ) : currentPost === undefined ? ( // If a post is not selected yet:
                // Post list:
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setCurrentPost(item);
                            }}
                        >
                            <View style={styles.postContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.author}>By: {item.author}</Text>
                                <Text style={styles.date}>Date: {item.createdAt.toLocaleDateString()}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                // If a post is selected:
                <Post
                    post={currentPost}
                    onGoBack={() => {
                        setCurrentPost(undefined);
                    }}
                ></Post>
            )}
        </View>
    );
};

const Post = ({ post, onGoBack }: { post: SafetyPost; onGoBack: () => void }) => {
    const [content, setContent] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        SafetyPostSystem.getPostContent(post.id)
            .then((result) => {
                if (result.success) {
                    Logger.debug("Succesfully retrieved post content.");
                    setContent(result.content);
                } else {
                    Logger.error("Post content retrieval failed.");
                }
            })
            .catch((error) => {
                Logger.error("Error in retrieving post content.");
            });
    });

    return (
        <View style={styles.screen}>
            <Pressable onPress={onGoBack}>
                <Text style={styles.backButton}>&#x25C0; Back</Text>
            </Pressable>

            {content === undefined ? (
                <ScrollView>
                    <LoadingSpinner></LoadingSpinner>
                </ScrollView>
            ) : (
                <ScrollView>
                    {Platform.OS === "web" ? (
                        // For Web platform, use iframe (fallback to iframe if needed)
                        <iframe title={post.title} srcDoc={content} style={styles.iframe} />
                    ) : (
                        // For mobile platforms, use WebView
                        <HTMLView value={`<div>${content.replace(/(\r\n|\n|\r|\\r|\\n)/gm, "")}</div>`} stylesheet={htmlStyles} />
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const htmlStyles = StyleSheet.create({
    h1: {
        color: Colors.black,
        fontSize: 25,
        fontWeight: "bold",
    },
    p: {
        color: Colors.black,
    },
    div: {
        padding: 20,
    },
});

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
    },
    listContainer: {
        padding: 16,
        flexGrow: 1,
    },
    postContainer: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: "100%",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    author: {
        fontSize: 14,
        color: "#555",
        marginBottom: 8,
    },
    iframe: {
        marginTop: 16,
        width: "100%",
        height: 200,
    },
    content: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: "#888",
    },
    backButton: {
        fontSize: 18,
        color: Colors.primary,
    },
});

export default ResourcesScreen;
