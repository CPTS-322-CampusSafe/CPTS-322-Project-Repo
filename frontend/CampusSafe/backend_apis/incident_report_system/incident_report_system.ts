import Logger from "@/logging/logging";
import { reportAPI_URL } from "../urls";
import IncidentReport from "./incident_report";

/**
 * Handles all the incident report operations such as creating a report or getting existing reports.
 */
export default class IncidentReportSystem {
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

                    for (let report in json) {
                        let newReport = new IncidentReport();
                        newReport.deserialize(json[report]);
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
