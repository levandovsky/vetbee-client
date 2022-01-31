import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useReducer} from "react";
import {RecordsApi} from "../services/records-api";

const recordReducer = (state, action) => {
    switch (action.type) {
        case "set_logs":
            return {
                ...state,
                logs: action.payload,
            };
        case "set_pres":
            return {
                ...state,
                prescriptions: action.payload,
            };
        case "set_filter":
            if (!state.filter.includes(action.payload)) {
                return {
                    ...state,
                    filter: [...state.filter, action.payload],
                };
            }

            const filter = [...state.filter];
            const id = filter.findIndex((f) => f === action.payload);
            filter.splice(id, 1);

            return {
                ...state,
                filter,
            };
        default:
            break;
    }
};

const HealthRecords = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(recordReducer, {
        logs: [],
        prescriptions: [],
        filter: ["log", "prescription"],
    });
    const records = [...state.logs, ...state.prescriptions].filter((rec) => state.filter.includes(rec.type));
    const name = state.logs.length ? state.logs[0].name : null;

    const fetchRecords = async () => {
        const logs = await RecordsApi.getLogsById(id);
        const prescriptions = await RecordsApi.getPresById(id);
        dispatch({type: "set_logs", payload: logs.map((log) => ({...log, type: "log"}))});
        dispatch({
            type: "set_pres",
            payload: prescriptions.map((pres) => ({...pres, type: "prescription"})),
        });
    };

    const addLog = () => {
        navigate(`/add-log/${id}`);
    };

    const addPrescription = () => {
        navigate(`/add-prescription/${id}`);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const renderedRecords = !!records
        ? records.map((record) => (
              <div key={record.id + record.type} className="list-item">
                  {JSON.stringify(record)}
              </div>
          ))
        : null;

    const renderPage = (
        <div className="list">
            <header>
                <div>{name}: Health Records</div>
                <div style={{display: "flex"}}>
                    <button onClick={addLog}>Add log</button>
                    <button onClick={addPrescription}>Add prescription</button>
                </div>
            </header>

            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "1rem"}}>
                <div>Showing: {JSON.stringify(state.filter)}</div>
                <div>
                    <button onClick={() => dispatch({type: "set_filter", payload: "log"})}>Logs</button>
                    <button onClick={() => dispatch({type: "set_filter", payload: "prescription"})}>
                        Prescriptions
                    </button>
                </div>
            </div>

            <div>{renderedRecords}</div>
        </div>
    );

    return records === null ? <div>Loading...</div> : renderPage;
};

export default HealthRecords;
