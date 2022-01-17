import {useNavigate} from "react-router-dom";

export const Pet = ({pet, onDelete}) => {
    const navigate = useNavigate();
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
        </div>
    );
};
