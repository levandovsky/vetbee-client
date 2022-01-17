const API_URL = "http://localhost:8080/v1/pets";

export class PetsApi {
    static async getAll() {
        const req = await fetch(API_URL);

        return req.json();
    }

    static async add(pet) {
        const req = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pet),
        });

        return req.json();
    }

    static async delete(id) {
        const req = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        return req.json();
    }
}
