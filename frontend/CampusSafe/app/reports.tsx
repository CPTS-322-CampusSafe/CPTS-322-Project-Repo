import IncidentReport from "@/backend_apis/incident_report_system/incident_report";
import IncidentReportSystem from "@/backend_apis/incident_report_system/incident_report_system";
import LoadingSpinner from "@/components/loading_spinner";
import { Colors } from "@/constants/colors";
import Logger from "@/logging/logging";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, TouchableOpacity, TextInput, Text, StyleSheet, ScrollView, FlatList } from "react-native";

const ReportsScreen = () => {
    const [search, setSearch] = useState("");
    const [reports, setReports] = useState<IncidentReport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        IncidentReportSystem.getReports().then((result) => {
            if (result.success) {
                Logger.debug("Successfuly got reports.");
                setReports(result.reports);
                setLoading(false);
            } else {
                Logger.debug("Failed to get reports.");
            }
        });
    }, [router]);

    useEffect(() => {
        setLoading(true);
        IncidentReportSystem.searchReports(search).then((result) => {
            if (result.success) {
                Logger.debug("Successfuly got reports.");
                setReports(result.reports);
                setLoading(false);
            } else {
                Logger.debug("Failed to get reports.");
            }
        });
    }, [search]);

    const handleCreateReport = () => {
        router.push("/create_report");
    };

    let reportComponents = [];
    for (let report of reports) {
        reportComponents.push(<ReportSummary report={report} />);
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Create Report Button */}
            <TouchableOpacity style={styles.button} onPress={handleCreateReport}>
                <Text style={styles.buttonText}>Create Report</Text>
            </TouchableOpacity>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search..." value={search} onChangeText={setSearch} />
            </View>

            {/* Box with Border */}
            <View style={styles.boxContainer}>
                {loading ? (
                    <LoadingSpinner></LoadingSpinner>
                ) : (
                    <FlatList
                        data={reports}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    Logger.debug("Selected a report");
                                }}
                            >
                                <ReportSummary report={item} />
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.listContainer}
                    />
                )}
            </View>
        </View>
    );
};

const ReportSummary = ({ report }: { report: IncidentReport }) => {
    return (
        <View style={styles.reportContainer}>
            <Text style={styles.title}>{report.title}</Text>
            <Text style={styles.summary}>{report.summary}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        flexGrow: 1,
        padding: 16,
    },
    reportContainer: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.background,
        shadowColor: Colors.black,
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
    summary: {
        fontSize: 14,
        color: "#555",
        marginBottom: 8,
    },
    button: {
        width: 140,
        height: 34,
        position: "absolute",
        top: 20, // Position it near the top
        right: 20, // Align to the right side
        backgroundColor: Colors.primary, // Button color
        padding: 5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: Colors.primaryText, // Text color for the button
        fontSize: 16,
        fontWeight: "bold",
    },
    searchContainer: {
        position: "absolute",
        top: 70, // Adjust position to match the new title position
        left: "45%",
        transform: [{ translateX: -150 }], // Center the input
        width: 335,
    },
    searchInput: {
        height: 40,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
    },
    boxContainer: {
        position: "absolute",
        top: 130, // Adjust position below the search bar
        left: "45%",
        transform: [{ translateX: -150 }], // Center the box horizontally
        width: 335,
        height: 490, // Set the height of the box
        borderWidth: 1,
        borderColor: Colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background, // Background color of the box
    },
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ReportsScreen;
