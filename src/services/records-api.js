const LOGS_API_URL = "http://localhost:8080/v1/logs";
const PRESCRIPTIONS_API_URL = "http://localhost:8080/v1/prescriptions";
export class RecordsApi {
    static async getLogsById(id) {
        const req = await fetch(`${LOGS_API_URL}/${id}`);

        return req.json();
    }

    static async getPresById(id) {
        const req = await fetch(`${PRESCRIPTIONS_API_URL}/${id}`);

        return req.json();
    }

    static async addLog(log) {
        const req = await fetch(LOGS_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(log),
        });

        return req.json();
    }

    static async addPrescription(prescription) {
        const req = await fetch(PRESCRIPTIONS_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(prescription),
        });

        return req.json();
    }
}
