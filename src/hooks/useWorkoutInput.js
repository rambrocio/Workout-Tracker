import { useState } from "react";
import { createWorkout } from "../services/workoutServices";

export const useWorkoutInput = (session) => {
    const [muscleGroup, setMuscleGroup] = useState("Chest");
    const [exersizeName, setExersizeName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const inputWorkout = async () => {
        setError("");
        setLoading(true);
        try {
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
                return true;
            }

        } catch (err) {
            console.error(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        muscleGroup, setMuscleGroup,
        exersizeName, setExersizeName,
        sets, setSets,
        reps, setReps,
        weight, setWeight,
        date, setDate,
        inputWorkout
    };
};