import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { createWorkout } from "../../services/workoutServices";
import useUserLoader from '../../hooks/useUserLoader';
import Heading from "../../components/heading";
import "./Input.css";

const Input = () => {
    const { session } = UserAuth();
    const { userData } = useUserLoader(session);
    const [muscleGroup, setMuscleGroup] = useState("Chest");
    const [exersizeName, setExersizeName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleWorkoutInput = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try{
            if (!session?.user) {
                throw new Error("No user found");
            }

            const result = await createWorkout(
                session.user.id,
                muscleGroup,
                exersizeName,
                sets,
                reps,
                weight,
                date
            );
            
            if (result.success) {
                console.log("Workout inputted successfully");
                setExersizeName("");
                setSets("");
                setReps("");
                setWeight("");
                setDate("");
            }

        } catch (error) {
            setError("Error occured inputting workout");
        } finally {
            setLoading(false);
        }
    }

    const clearInputs =  () => {
        setMuscleGroup("Chest");
        setExersizeName("");
        setSets("");
        setReps("");
        setWeight("");
        setDate("");
        setError("");
    }

    return (
        <>
            <Heading />
            <div className="pageContainer">
                    <h2>Hello  {userData?.name || "Loading..."}, Input Your Workout Below</h2>
                    <form onSubmit={handleWorkoutInput} className="inputContainer">
                        <div className="section">
                            <p><b>Select Workout Date</b></p>
                             <input onChange={(e) => setDate(e.target.value)}
                                type="date"
                                placeholder="Date"
                                value={date}
                            />
                        </div>
                        <label className="section">
                            <p><b>Select Muscle Group:</b></p>
                            <select 
                                value={muscleGroup}
                                onChange={(e) => setMuscleGroup(e.target.value)}
                            >
                                <option value="Chest">Chest</option>
                                <option value="Back">Back</option>
                                <option value="Legs">Legs</option>
                                <option value="Arms">Arms</option>
                            </select>
                        </label>
                        <div className="section">
                            <p>Enter Workout Information</p>
                                <input onChange={(e) => setExersizeName(e.target.value)}
                                    type="text"
                                    placeholder="Exercise Name"
                                    value={exersizeName}
                                    className="inputs"
                                />
                                <input onChange={(e) => setSets(e.target.value)}
                                    type="number"
                                    placeholder="Sets"
                                    value={sets}
                                    className="inputs"
                                />
                                <input onChange={(e) => setReps(e.target.value)}
                                    type="number"
                                    placeholder="Reps"
                                    value={reps}
                                    className="inputs"
                                />
                                <input onChange={(e) => setWeight(e.target.value)}
                                    type="number"
                                    placeholder="Weight"
                                    value={weight}
                                    className="inputs"
                                />
                        </div>
                        <div className="buttons">
                            <button type="submit" disabled={loading}>Submit</button> 
                            {error && <p>{error}</p>}
                            <button type="button" onClick={clearInputs}>Clear</button>
                        </div>

                    </form>
            </div>
        </>

    )
}

export default Input;
