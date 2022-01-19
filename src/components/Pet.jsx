import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../context/theme";

export const Pet = ({pet, onDelete}) => {
    const navigate = useNavigate();
    const {setTheme} = useContext(ThemeContext);
    const showLogs = () => {
        navigate(`/health-records/${pet.id}`);
    };

    return (
        <div className="pet list-element">
            <div>{pet.name}</div>
            <div>{pet.dob}</div>
            <div>{pet.client_email}</div>
            <div>
                <button onClick={onDelete}>Delete</button>
            </div>
            <div>
                <button onClick={showLogs}>Show logs</button>
            </div>
            <div>
                <button onClick={() => setTheme("dark")}>Set theme to dark</button>
            </div>
        </div>
    );
};
