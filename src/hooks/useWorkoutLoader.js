import { useState } from "react";
import { getWorkout } from "../services/workoutServices";

export const useWorkoutLoader = (session, inputDate) => {
    const [workouts, setWorkouts] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loadWorkout = async () => {
        setError("");
        setLoading(false);
        try {
            const userId = session?.user?.id;
            const workout = await getWorkout(userId, inputDate);
            setWorkouts(workout);
            setSearchDate(inputDate);

        } catch (error) {
            setError("Error occured retrieving workout");
        } finally {
            setLoading(false);
        }
    }
    return {workouts, setWorkouts,
            searchDate, setSearchDate,
            loadWorkout
    };
};