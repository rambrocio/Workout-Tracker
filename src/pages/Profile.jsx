import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/profileServices";
import { getWorkoutStats } from "../services/workoutServices";
import Heading from "../components/heading";
import { background } from "@chakra-ui/react";

const Profile = () => {
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
                <h2>Welcome to your Profile, {userData?.name || "Loading..."}</h2>
                <div>
                    <h3>MAIN STATS</h3>
                    <p>Weight: {userData?.weight}</p>
                    <p>Max Bench Press: {userData?.bench_max || "0"} lbs</p>
                    <p>Max Squat: {userData?.squat_max || "0"} lbs</p>
                    <p>Max Deadlift: {userData?.deadlift_max || "0"} lbs</p>
                </div>
                <div>
                    <h3>TOTAL STATS:</h3>
                    <p>Total Days Worked Out: {daysWorkedOut || 0} days</p>
                    <p>Total Sets Lifted: {totalSets} sets</p>
                    <p>Total Reps Listed: {totalReps || 0} reps</p>
                    <p>Total Weight Lifted: {totalWeight || 0} lbs</p>
                </div>
                <div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;