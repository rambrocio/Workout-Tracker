import { useState, useEffect } from "react";
import Heading from "../components/heading";
import { UserAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/profileServices";
import { getWorkout } from "../services/workoutServices";
import { formatDate } from "../services/dateServices";
import '../styling/Workouts.css'

const Workouts = () => {
    const { session } = UserAuth();
    const [userData, setUserData] = useState(null);
    const [inputDate, setInputDate] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const bodyPartsHit = [... new Set(workouts.map(bodyPart => bodyPart.muscle_group))];

    useEffect(() => {
        const loadData = async () => {
        if (session?.user?.id) {
                try {
                    const data = await getUserProfile(session.user.id);
                    setUserData(data);
                } catch (err) {
                    console.error("Fetch failed:", err);
                    setError(error.message);
                }
            }
        };
        loadData(); 
    }, [session]);

    const handleGetWorkout = async(e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            const workout = await getWorkout(session.user.id, inputDate);
            setWorkouts(workout);
            setSearchDate(inputDate);

        } catch (error) {
            setError("Error occured retrieving workout")
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Heading />
            <div className="pageContainer">
                <h2>Your Workout Page</h2>
                <form onSubmit={handleGetWorkout}>
                    <input onChange={(e) => setInputDate(e.target.value)}
                    type="date"
                    /> <br />
                    <button type="submit" disabled={loading}>Submit</button>
                </form>
                {searchDate ? (
                    <> 
                        {workouts.length > 0 ? (
                            <>
                                <h2>Your {formatDate(searchDate)} Workout</h2>
                                <div>
                                    <h3>Body Parts Hit On This Day:</h3>
                                    {bodyPartsHit.map((name, index) => (
                                        <li key={index}>{name}</li>
                                    ))}
                                </div>
                                <h3>Exercises Done:</h3>
                                {workouts.map((workout) => (
                                    <div key={workout.id}>
                                        <p>Excersize Name: {workout?.exersize_name}</p>
                                        <p>Number of Sets: {workout?.sets}</p>
                                        <p>Number of Reps: {workout?.reps}</p>
                                        <p>Amount Lifted: {workout?.weight} lbs</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <p>Sorry {userData?.name}, </p>
                                <p> YOU DID NOT WORKOUT ON: {formatDate(searchDate)}</p>
                            </>
                        )}
                    </>
                ) : (
                    <p>Please enter date</p>
                )}
            </div>
        </>
    );
}

export default Workouts;