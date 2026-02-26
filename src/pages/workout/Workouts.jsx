import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { formatDate } from "../../services/dateServices";
import { useWorkoutLoader } from "../../hooks/useWorkoutLoader";
import Heading from "../../components/heading";
import './Workouts.css'

const Workouts = () => {
    const { session } = UserAuth();
    const [inputDate, setInputDate] = useState("");
    const { workouts, searchDate, error, loading, loadWorkout } = useWorkoutLoader(session, inputDate);
    
    const bodyPartsHit = [... new Set(workouts.map(bodyPart => bodyPart.muscle_group))];

    const handleGetWorkout = async(e) => {
        e.preventDefault();
        await loadWorkout();
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
                    {error && <p className="errorMessage">{error}</p>}
                </form>
                {searchDate ? (
                    <div className="workoutInfoContainer"> 
                        {workouts.length > 0 ? (
                            <>
                                <h2><u>Your <b>{formatDate(searchDate)}</b> Workout</u></h2>
                                <div className="muscleGroup">
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