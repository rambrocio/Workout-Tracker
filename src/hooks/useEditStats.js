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
            editStats
    };
};