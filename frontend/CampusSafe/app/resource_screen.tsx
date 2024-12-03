import SafetyPost from '@/backend_apis/safety_post_system/safety_post';
import SafetyPostSystem from '@/backend_apis/safety_post_system/safety_post_system';
import React from 'react';
import { Text, View, StyleSheet, FlatList, Platform, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import Logger from "../logging/logging"; 

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
}

const ResourcesScreen = () => {
    //const [posts, setPosts] = React.useState<SafetyPost[]>([]); 
    const [posts, setPosts] = React.useState<SafetyPost[]>(getDummyData()); 
    console.log(posts)

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
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.author}>By: {item.author}</Text>
                        <Text style={styles.date}>Date: {item.createdAt.toLocaleDateString()}</Text>

                        {Platform.OS === 'web' ? (
                            // For Web platform, use iframe (fallback to iframe if needed)
                            <iframe
                                title={item.title}
                                srcDoc={item.content}
                                style={styles.iframe}
                            />
                        ) : (
                            // For mobile platforms, use WebView
                            <WebView
                                originWhitelist={['*']}
                                source={{ html: item.content }}
                                style={styles.webView} 
                            />
                        )}
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        width: '100%', 
    },
    listContainer: {
        padding: 16,
        flexGrow: 1, 
    },
    postContainer: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%', 
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    author: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    webView: {
        marginTop: 16,
        width: '100%', 
        height: 200, 
    },
    iframe: {
        marginTop: 16,
        width: '100%',
        height: 200,
    },
    content: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
});

export default ResourcesScreen;
