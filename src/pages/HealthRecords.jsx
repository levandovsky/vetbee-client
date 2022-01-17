import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {RecordsApi} from "../services/records-api";

export const HealthRecords = () => {
    const {id} = useParams();
    const [records, setRecords] = useState(null);
    const navigate = useNavigate();

    const fetchRecords = async () => {
        const res = await RecordsApi.getAllById(id);
        setRecords(res);
    };

    const addLog = () => {
        navigate(`/add-log/${id}`);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const renderedRecords = !!records
        ? records.map((record) => (
              <div key={record.id} className="list-item">
                  {JSON.stringify(record)}
              </div>
          ))
        : null;

    return !records ? (
        <div>Loading...</div>
    ) : (
        <div className="list">
            <header>
                <div>Name: Health Records</div>
                <div style={{display: "flex"}}>
                    <button onClick={addLog}>Add log</button>
                    <button>Add prescription</button>
                </div>
            </header>

            <div>{renderedRecords}</div>
        </div>
    );
};
