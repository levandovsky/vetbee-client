import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {MedsApi} from "../services/meds-api";

const Medications = () => {
    const [meds, setMeds] = useState(null);
    const navigate = useNavigate();

    const fetchMeds = async () => {
        const res = await MedsApi.getAll();
        setMeds(res);
    };

    const handleClick = () => {
        navigate("/add-medication")
    }

    useEffect(() => {
        fetchMeds();
    }, []);

    const renderedMeds = !!meds
        ? meds.map((med) => (
              <div key={med.id} className="list-item">
                  <div>Name: {med.name}</div>
                  <div>Description: {med.description}</div>
              </div>
          ))
        : null;

    return (
        <div className="list">
            <header>
                <div>Medications List</div>

                <div>
                    <button onClick={handleClick}>Add medication</button>
                </div>
            </header>

            <div>{renderedMeds}</div>
        </div>
    );
};

export default Medications;
