import "./App.css";
import {BrowserRouter as Router, Route, Routes, Navigate, Link} from "react-router-dom";
import {Pets} from "./pages/Pets";
import {Medications} from "./pages/Medications";
import {AddPet} from "./pages/AddPet";
import {AddMedication} from "./pages/AddMedication";
import {HealthRecords} from "./pages/HealthRecords";
import {AddLog} from "./pages/AddLog";
import {useState} from "react";
import {ThemeContext} from "./context/theme";

function App() {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            return;
        }

        setTheme("light");
    };

    return (
        <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
            <main data-theme={theme}>
                <Router>
                    <nav>
                        <div>
                            <button onClick={toggleTheme}>change theme</button>
                        </div>
                        <div>
                            <Link to="/pets">Pets</Link>
                            <Link to="/medications">Medications</Link>
                        </div>
                    </nav>

                    <Routes>
                        <Route path="/pets" element={<Pets />} />
                        <Route path="/medications" element={<Medications />} />
                        <Route path="/add-pet" element={<AddPet />} />
                        <Route path="/add-medication" element={<AddMedication />} />
                        <Route path="/health-records/:id" element={<HealthRecords />} />
                        <Route path="/add-log/:id" element={<AddLog />} />

                        <Route path="*" element={<Navigate to="/pets" />} />
                    </Routes>
                </Router>
            </main>
        </ThemeContext.Provider>
    );
}

export default App;
