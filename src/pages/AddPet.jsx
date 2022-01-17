import {useNavigate} from "react-router-dom";
import {PetsApi} from "../services/pets-api";

export const AddPet = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);
            const [name, dob, client_email] = data.values();
            const res = await PetsApi.add({name, dob, client_email});

            if (res.err) throw new Error(res.err);

            navigate("/pets");
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
                <label htmlFor="dob">Date of birth: </label>
                <input name="dob" placeholder="Date of birth" type="date" required />
            </div>
            <div>
                <label htmlFor="client_email">Client email: </label>
                <input name="client_email" placeholder="Client email" type="email" required />
            </div>

            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};
