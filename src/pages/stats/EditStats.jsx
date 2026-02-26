import { useNavigate } from "react-router-dom";
import { useEditStats } from "../../hooks/useEditStats";
import { UserAuth } from "../../context/AuthContext";
import './Stats.css'

const EditStats = () => {
    const navigate = useNavigate();
    const { session } = UserAuth();
    const { newWeight, setNewWeight,
            newMaxBench, setNewMaxBench,
            newMaxSquat, setNewMaxSquat,
            newMaxDeadlift, setNewMaxDeadlift,
            error, loading,
            editStats } = useEditStats(session);

    const goBack = () => {
        navigate('/stats');
    };

    const handleEditStat = async (e) => {
        e.preventDefault();
        const result = await editStats(session);
        if (result.success) {
            navigate('/stats');
        }
    };

    return (
        <div className="pageContainer">
            <div className="contentContainer">
                    <h2>Edit Your Stats</h2>
                    <form onSubmit={handleEditStat} className="section">
                        <div className="editInput">
                            <input 
                                type="number"
                                placeholder="Enter New Weight"
                                className="editText"
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
                                required
                            />
                            <input 
                                type="number"
                                placeholder="Enter New Max Bench"
                                className="editText"
                                value={newMaxBench}
                                onChange={(e) => setNewMaxBench(e.target.value)}
                                required
                            />
                            <input 
                                type="number"
                                placeholder="Enter New Max Squat"
                                className="editText"
                                value={newMaxSquat}
                                onChange={(e) => setNewMaxSquat(e.target.value)}
                                required
                            />
                            <input 
                                type="number"
                                placeholder="Enter New Max Deadlift"
                                className="editText"
                                value={newMaxDeadlift}
                                onChange={(e) => setNewMaxDeadlift(e.target.value)}
                                required
                            />
                        </div>
                        <div className="buttons">
                            <button type="submit" disabled={loading}>Submit</button>
                            <button type="button" onClick={goBack}>Cancel</button>
                        </div>
                        {error && <p className="errorMessage">{error}</p>} <br />
                    </form>
            </div>
        </div>
    )
}

export default EditStats;