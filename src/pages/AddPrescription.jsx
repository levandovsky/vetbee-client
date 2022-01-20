import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {MedsApi} from "../services/meds-api";
import {RecordsApi} from "../services/records-api";

export const AddPrescription = () => {
    const navigate = useNavigate();
    const [meds, setMeds] = useState([]);
    const {id} = useParams();
    const fetchMeds = async () => {
        const res = await MedsApi.getAll();
        setMeds(res);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);
            const [medication_id, comment] = data.values();
            const res = await RecordsApi.addPrescription({pet_id: id, medication_id: Number(medication_id), comment});

            if (res.err) throw new Error(res.err);

            navigate(`/health-records/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMeds();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="medication_id">Medication: </label>
                <select name="medication_id" defaultValue="none">
                    <option disabled>none</option>
                    {meds.map((med) => (
                        <option key={med.id} value={med.id}>
                            {med.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="comment">Comment: </label>
                <input name="comment" placeholder="comment" type="text" required />
            </div>

            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};
