import {useNavigate} from "react-router-dom";
import {MedsApi} from "../services/meds-api";

export const AddMedication = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);
            const [name, description] = data.values();
            const res = await MedsApi.add({name, description});

            if (res.err) throw new Error(res.err);

            navigate("/medications");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name: </label>
                <input name="name" placeholder="Name" type="text" required />
            </div>
            <div>
                <label htmlFor="description">Date of birth: </label>
                <input name="description" placeholder="Description" type="text" required />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};
