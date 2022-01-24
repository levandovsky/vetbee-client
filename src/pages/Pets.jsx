import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Pet} from "../components/Pet";
import {PetsApi} from "../services/pets-api";

const Pets = () => {
    const [pets, setPets] = useState(null);
    const navigate = useNavigate();

    const fetchPets = async () => {
        const res = await PetsApi.getAll();
        setPets(res);
    };

    const handleClick = () => {
        navigate("/add-pet");
    };

    const onDelete = async (pet) => {
        if (!window.confirm(`Are you sure you want to delete pet: ${pet.name}?`)) return;

        await PetsApi.delete(pet.id);
        await fetchPets();
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const renderedPets = !!pets
        ? pets.map((pet) => <Pet key={pet.id} pet={pet} onDelete={() => onDelete(pet)} />)
        : null;

    return pets === null ? (
        <div>Loading...</div>
    ) : (
        <div className="list">
            <header>
                <div>Pets List</div>
                <div>
                    <button onClick={handleClick}>Add Pet</button>
                </div>
            </header>

            <div>{renderedPets}</div>
        </div>
    );
};

export default Pets;
