import { useState, useEffect } from "react";
import Heading from "../components/heading";
import { UserAuth } from "../context/AuthContext";
import { getUserProfile } from "../services/profileServices";
import { getWorkout } from "../services/workoutServices";
import { formatDate } from "../services/dateServices";
import '../styling/Workouts.css'

const Workouts = () => {
    const { session } = UserAuth();
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
                <div className="contentContainer">
                <form onSubmit={handleGetWorkout} className="date">
                    <p><b>Select Date to Display Workout</b></p>
                    <input onChange={(e) => setInputDate(e.target.value)}
                        type="date"
                    />
                    <button type="submit" className="submitButton" disabled={loading}>Submit</button>
                </form>
                {searchDate ? (
                    <div className="workoutInfoContainer"> 
                        {workouts.length > 0 ? (
                            <>
                                <h2><u>Your <b>{formatDate(searchDate)}</b> Workout</u></h2>
                                <div class="muscleGroup">
                                    <h3>Body Parts Hit On This Day:</h3>
                                    {bodyPartsHit.map((name, index) => (
                                        <li key={index}>{name}</li>
                                    ))}
                                </div>
                                <div className="workoutInfo">
                                    <h3>Exercises Done:</h3>
                                    {workouts.map((workout) => (
                                        <div key={workout.id} className="workouts">
                                            <div className="workoutName">
                                                <p>Excersize Name: <b>{workout?.exersize_name}</b></p>
                                            </div>
                                            <div className="workoutStats">
                                                <p>Number of Sets: {workout?.sets}</p>
                                                <p>Number of Reps: {workout?.reps}</p>
                                                <p>Amount Lifted: {workout?.weight} lbs</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="restDay">
                                <p> You Did Not Workout On: </p>
                                <h2>{formatDate(searchDate)}</h2>
                            </div>
                            )}                       
                    </div>
                ) : (
                    <p></p>
                    )}
            </div>
            </div>
        </>
    );
}

export default Workouts;