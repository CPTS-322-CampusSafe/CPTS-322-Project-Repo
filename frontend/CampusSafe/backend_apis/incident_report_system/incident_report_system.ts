import Logger from "@/logging/logging";
import { reportAPI_URL } from "../urls";
import IncidentReport from "./incident_report";
import AuthenticationSystem from "../authentication_system/authentication_system";

/**
 * Handles all the incident report operations such as creating a report or getting existing reports.
 */
export default class IncidentReportSystem {
    /**
     * Reports an incident to the server.
     *
     * @returns A Promise containing the result returned from the server.
     */
    static reportIncident(report: IncidentReport): Promise<{ success: boolean; message: string }> {
        let success = false;

        return new Promise((resolve, reject) => {
            fetch(`${reportAPI_URL}/report_incident/`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRFToken": AuthenticationSystem.csrfToken,
                },
                body: JSON.stringify({
                    title: report.title,
                    summary: report.summary,
                    description: report.description,
                    location: report.location,
                    emergency_level: report.emergencyLevel,
                    happened_at: report.happenedAt,
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
     * Tries to get the most recient incident reports from the server.
     *
     * @returns A Promise containing the requested reports.
     */
    static getReports(): Promise<{ success: boolean; reports: IncidentReport[] }> {
        let success = false;

        return new Promise((resolve, reject) => {
            fetch(`${reportAPI_URL}/get_reports/`)
                .then((response) => {
                    if (response.ok) {
                        success = true;
                        return response.json();
                    } else {
                        resolve({ success: success, reports: [] });
                    }
                })
                .then((json) => {
                    let reports = new Array<IncidentReport>();

                    for (let report of json) {
                        let newReport = new IncidentReport();
                        newReport.deserialize(report);
                        reports.push(newReport);
                    }

                    resolve({ success: success, reports: reports });
                })
                .catch((error) => {
                    Logger.error(error); // There was an error
                    reject();
                });
        });
    }
}
