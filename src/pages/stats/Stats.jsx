import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/profileServices";
import { getWorkoutStats } from "../../services/workoutServices";
import Heading from "../../components/heading";
import './Stats.css';


const Stats = () => {
    const { session, signOut } = UserAuth();
    const [userData, setUserData] = useState(null);
    const [daysWorkedOut, setDaysWorkedOut] = useState(0);
    const [totalSets, setTotalSets] = useState(0);
    const [totalReps, setTotalReps] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const navigate = useNavigate();

    // useEffect to load user's data (name, weight, etc)
    useEffect(() => {
        const loadData = async () => {
        if (session?.user?.id) {
                try {
                    const data = await getUserProfile(session.user.id);
                    setUserData(data);
                } catch (err) {
                    console.error("Fetch failed:", err);
                }
            }
        };
        loadData(); 
    }, [session]); // Only loads if session is available

    // useEffect to load user's days worked out
    useEffect(() => {
        const getStats = async () => {
            if (session?.user?.id) {
                const data = await getWorkoutStats(session.user.id);
                if (!data) {
                    return;
                }
                
                let sets = 0;
                let reps = 0;
                let weight = 0;
                let totalWeight = 0;
                
                const numDays = [... new Set(data.map(item => item.workout_date))];

                for (let i = 0; i < data.length; i++) {
                    const workout = data[i];

                    sets = sets + workout.sets;
                    reps = reps + workout.reps;
                    weight = workout.weight * workout.reps * workout.sets;
                    totalWeight = totalWeight + weight;
                }

                setDaysWorkedOut(numDays.length);
                setTotalSets(sets);
                setTotalReps(reps * sets);
                setTotalWeight(totalWeight);
            }
        };
        getStats();
    }, [session.user.id]);

    const handleSignOut = async (e) => {
        e.preventDefault()
        try {
            await signOut();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

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
                <div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default Stats;