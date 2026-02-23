import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";
import { getUserProfile } from "../services/profileServices";
import { createWorkout } from "../services/workoutServices";

const Input = () => {
    const { session } = UserAuth();
    const [userData, setUserData] = useState(null);
    const [muscleGroup, setMuscleGroup] = useState("");
    const [exersizeName, setExersizeName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
            }

        } catch (error) {
            setError("Error occured inputting workout");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div>
                <h1>Hello  {userData?.name || "Loading..."}, Input Your Workout Below</h1>
                <form onSubmit={handleWorkoutInput}>
                    <input onChange={(e) => setDate(e.target.value)}
                        type="date"
                        placeholder="Date"
                        value={date}
                    /> <br />

                    <label>
                        Select Muscle Group Hit:
                        <select>
                            <option>Chest</option>
                            <option>Back</option>
                            <option>Legs</option>
                            <option>Arms</option>
                        </select>
                    </label> <br />
                    <input onChange={(e) => setMuscleGroup(e.target.value)}
                        type="text"
                        placeholder="Muscle Group Hit"
                        value={muscleGroup}
                    /> <br />
                    <input onChange={(e) => setExersizeName(e.target.value)}
                        type="text"
                        placeholder="Exercise Name"
                        value={exersizeName}
                    /> <br />
                    <input onChange={(e) => setSets(e.target.value)}
                        type="number"
                        placeholder="Sets"
                        value={sets}
                    /> <br />
                    <input onChange={(e) => setReps(e.target.value)}
                        type="number"
                        placeholder="Reps"
                        value={reps}
                    /> <br />
                    <input onChange={(e) => setWeight(e.target.value)}
                        type="number"
                        placeholder="Weight"
                        value={weight}
                    /> <br/ >
                    <button type="submit" disabled={loading}>Submit</button> 
                    {error && <p>{error}</p>}
                    <button>Clear</button>
                </form>
            </div>
        </>

    )
}

export default Input;
