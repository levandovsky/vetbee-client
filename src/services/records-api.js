const API_URL = "http://localhost:8080/v1/logs";

export class RecordsApi {
    static async getAllById(id) {
        const req = await fetch(`${API_URL}/${id}`);

        return req.json();
    }

    static async add(log) {
        const req = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(log)
        })

        return req.json();
    }
}
