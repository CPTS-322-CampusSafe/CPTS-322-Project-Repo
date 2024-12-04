import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import IncidentReportSystem from "../backend_apis/incident_report_system/incident_report_system";
import IncidentReport from "../backend_apis/incident_report_system/incident_report";
import Logger from "../logging/logging"; // Adjust path if necessary
import { Colors } from "@/constants/colors";

const CreateReportScreen = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [emergencyLevel, setEmergencyLevel] = useState(0);
    const [happenedAt, setHappenedAt] = useState(new Date());
    const router = useRouter();

    const createReport = () => {
        let report = new IncidentReport();
        report.title = title;
        report.summary = summary;
        report.description = description;
        report.location = location;
        report.emergencyLevel = emergencyLevel;
        report.happenedAt = happenedAt;

        IncidentReportSystem.reportIncident(report)
            .then((result) => {
                Logger.debug("Result from reportIncident:", result);
                if (result.success) {
                    Logger.debug("Report submitted successfully!");
                    router.push("/home");
                } else {
                    Logger.error(`Report submission failed: ${result.message}`);
                }
            })
            .catch((error) => {
                Logger.error(`Error submitting report: ${error}`);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Incident Report</Text>
            <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="Summary" value={summary} onChangeText={setSummary} style={styles.input} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
            <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
            <TextInput placeholder="Emergency Level (0-10)" value={emergencyLevel.toString()} onChangeText={(text) => setEmergencyLevel(Number(text))} keyboardType="numeric" style={styles.input} />
            <Button title="Submit Report" onPress={createReport} color={Colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: "flex-start",
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center",
        paddingVertical: 10,
    },
    input: {
        height: 40,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default CreateReportScreen;
