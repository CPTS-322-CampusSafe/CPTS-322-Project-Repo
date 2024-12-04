import SafetyPost from "@/backend_apis/safety_post_system/safety_post";
import SafetyPostSystem from "@/backend_apis/safety_post_system/safety_post_system";
import React from "react";
import { Text, View, StyleSheet, FlatList, Platform, ScrollView, TouchableOpacity, Pressable } from "react-native";
import HTMLView from "react-native-htmlview";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";

const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #4CAF50; }
          p { color: #555; }
        </style>
      </head>
      <body>
        <h1>Safety Tips</h1>
        <p>Here are some important safety tips:</p>
        <ul>
          <li>Wear a seatbelt.</li>
          <li>Don't use your phone while driving.</li>
          <li>Ensure smoke alarms are working.</li>
        </ul>
      </body>
    </html>
  `;

// Dummy data for posts
const dummyData = [
    {
        id: 1,
        title: "Fire Safety Tips",
        author: "John Doe",
        content: htmlContent,
        is_public: true,
        created_at: "2024-11-01T10:00:00Z",
    },
    {
        id: 2,
        title: "Road Safety Rules",
        author: "Jane Smith",
        content: htmlContent,
        is_public: true,
        created_at: "2024-11-05T10:00:00Z",
    },
    {
        id: 3,
        title: "Cybersecurity Awareness",
        author: "Alex Brown",
        content: htmlContent,
        is_public: true,
        created_at: "2024-11-10T10:00:00Z",
    },
];

const getDummyData = () => {
    let data = new Array<SafetyPost>();
    for (let json of dummyData) {
        let newPost = new SafetyPost();
        newPost.deserialize(json);
        data.push(newPost);
    }
    return data;
};

const ResourcesScreen = () => {
    //const [posts, setPosts] = React.useState<SafetyPost[]>([]);
    const [posts, setPosts] = React.useState<SafetyPost[]>(getDummyData());
    const [currentPost, setCurrentPost] = React.useState<SafetyPost | undefined>(undefined);
    const router = useRouter();

    const handleCreatePost = () => {
        router.push("/create_post"); // Navigate to the create_post screen
    };
    // React.useEffect(() => {
    //     SafetyPostSystem.getPosts()
    //         .then((result) => {
    //             if (result.success) {
    //                 Logger.debug("Succesfully retrieved posts.");
    //                 setPosts(result.posts);
    //             } else {
    //                 Logger.error("Post retrieval failed.");
    //             }
    //         })
    //         .catch((error) => {
    //             Logger.error("Error in retrieving posts.");
    //         }
    //     );
    //   }, []);

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
                <Text style={styles.buttonText}>Create Post</Text>
            </TouchableOpacity>

            {currentPost === undefined ? (
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
                // Individual post:
                <View style={styles.screen}>
                    <Pressable
                        onPress={() => {
                            setCurrentPost(undefined);
                        }}
                    >
                        <Text style={styles.backButton}>&#x25C0; Back</Text>
                    </Pressable>

                    <ScrollView>
                        {Platform.OS === "web" ? (
                            // For Web platform, use iframe (fallback to iframe if needed)
                            <iframe title={currentPost.title} srcDoc={currentPost.content} style={styles.iframe} />
                        ) : (
                            // For mobile platforms, use WebView
                            <HTMLView value={`<div>${htmlContent.replace(/(\r\n|\n|\r)/gm, "")}</div>`} stylesheet={htmlStyles} textComponentProps={{ style: htmlStyles.p }} />
                        )}
                    </ScrollView>
                </View>
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
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ResourcesScreen;
