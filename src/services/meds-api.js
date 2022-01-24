const API_URL = `${process.env.REACT_APP_BASE_URL}/v1/meds`

export class MedsApi {
    static async getAll() {
        const res = await fetch(API_URL);

        return res.json();
    }

    static async add(medication) {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medication)
        })

        return res.json();
    }
}