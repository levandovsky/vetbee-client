import {useNavigate, useParams} from "react-router-dom";
import {RecordsApi} from "../services/records-api";

export const AddLog = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);
            const [description, status] = data.values();
            const res = await RecordsApi.addLog({pet_id: id, description, status});

            if (res.err) throw new Error(res.err);

            navigate(`/health-records/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="description">Description: </label>
                <input name="description" placeholder="Description" type="text" required />
            </div>
            <div>
                <label htmlFor="status">Status: </label>
                <input name="status" placeholder="Status" type="text" required />
            </div>

            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};
