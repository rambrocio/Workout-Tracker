import { getWorkoutStats } from "../services/workoutServices";  
import { useEffect, useState } from "react";

export const useStatsLoader = (session) => {
    const [daysWorkedOut, setDaysWorkedOut] = useState(0);
    const [totalSets, setTotalSets] = useState(0);
    const [totalReps, setTotalReps] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);

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

    return { daysWorkedOut, totalSets, totalReps, totalWeight}
};