import { useState } from "react";
import { updateUserProfile } from "../services/profileServices";

export const useEditStats = (session) => {
    const [newWeight, setNewWeight] = useState("");
    const [newMaxBench, setNewMaxBench] = useState("");
    const [newMaxSquat, setNewMaxSquat] = useState("");
    const [newMaxDeadlift, setNewMaxDeadlift] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const editStats = async () => {
        setError("");
        if (newWeight < 1) {
            setError("New Weight cannot be less than 1 lb");
            return;
        }
        if (newMaxBench < 0) {
            setError("New Max Bench cannot be less than 0 lbs");
            return;
        }
        if (newMaxSquat < 0) {
            setError("New Max Squat cannot be less than 0 lbs");
            return;
        }
        if (newMaxDeadlift < 0) {
            setError("New Max Deadlift cannot be less than 0 lbs");
            return;
        }
        setLoading(true);
        try {
            const userId = session?.user?.id;
            if (!userId) {
                throw new Error("No user found");
            } 

            await updateUserProfile(
                userId,
                newWeight, 
                newMaxBench, 
                newMaxSquat, 
                newMaxDeadlift
            );

            return { success: true };

        } catch (err) {
            console.error(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };
    
    return { newWeight, setNewWeight,
            newMaxBench, setNewMaxBench,
            newMaxSquat, setNewMaxSquat,
            newMaxDeadlift, setNewMaxDeadlift,
            error, loading,
            editStats
    };
};