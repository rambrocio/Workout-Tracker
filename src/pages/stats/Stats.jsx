import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserLoader } from "../../hooks/useUserLoader";
import { useStatsLoader } from "../../hooks/useStatsLoader";
import Heading from "../../components/heading";
import './Stats.css';


const Stats = () => {
    const { session } = UserAuth();
    const { userData } = useUserLoader(session);
    const { daysWorkedOut, totalSets, totalReps, totalWeight} = useStatsLoader(session);


    return (
        <div>
            <Heading />
            <div className="pageContainer">
                <h2>Here Are Your Stats, {userData?.name || "Loading..."}</h2>
                <div className="contentContainer">
                    <div className="section">
                        <h2><u>MAIN STATS:</u></h2>
                        <div className="stats">
                            <p className="statsText"><b>Weight:</b> {userData?.weight}</p>
                            <p className="statsText"><b>Max Bench Press:</b> {userData?.bench_max || "0"} lbs</p>
                            <p className="statsText"><b>Max Squat:</b> {userData?.squat_max || "0"} lbs</p>
                            <p><b>Max Deadlift:</b> {userData?.deadlift_max || "0"} lbs</p>
                        </div>
                    </div>
                    <div className="section">
                        <h2><u>TOTAL STATS:</u></h2>
                        <div className="stats">
                            <p className="statsText"><b>Total Days Worked Out:</b> {daysWorkedOut || 0} days</p>
                            <p className="statsText"><b>Total Sets Lifted:</b> {totalSets} sets</p>
                            <p className="statsText"><b>Total Reps Listed:</b> {totalReps || 0} reps</p>
                            <p><b>Total Weight Lifted:</b> {totalWeight || 0} lbs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;