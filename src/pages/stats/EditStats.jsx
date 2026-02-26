import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEditWorkout } from "../../hooks/useEditWorkout";
import { UserAuth } from "../../context/AuthContext";
import './Stats.css'

const EditStats = () => {
    const navigate = useNavigate();
    const { session } = UserAuth();
    const { newWeight, setNewWeight,
            newMaxBench, setNewMaxBench,
            newMaxSquat, setNewMaxSquat,
            newMaxDeadlift, setNewMaxDeadlift,
            editWorkout } = useEditWorkout(session);
    const [loading, setLoading] = useState(false);

    const goBack = () => {
        navigate('/stats');
    };

    const handleEditStat = async (e) => {
        e.preventDefault();
        const result = await editWorkout(session);
        if (result.success) {
            navigate('/stats');
        }
    };

    return (
        <div className="pageContainer">
            <div className="contentContainer">
                    <p>EDIT STATS</p>
                    <form onSubmit={handleEditStat} className="section">
                        <input 
                            type="number"
                            placeholder="Enter New Weight"
                            value={newWeight}
                            onChange={(e) => setNewWeight(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder="Enter New Max Bench"
                            value={newMaxBench}
                            onChange={(e) => setNewMaxBench(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder="Enter New Max Squat"
                            value={newMaxSquat}
                            onChange={(e) => setNewMaxSquat(e.target.value)}
                        />
                        <input 
                            type="number"
                            placeholder="Enter New Max Deadlift"
                            value={newMaxDeadlift}
                            onChange={(e) => setNewMaxDeadlift(e.target.value)}
                        />
                        <div className="buttons">
                            <button type="submit" disabled={loading}>Submit</button>
                            <button type="button" onClick={goBack}>Cancel</button>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default EditStats;