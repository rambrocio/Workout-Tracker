import { supabase } from "../supabase";

export async function createWorkout(userId, muscleGroup, exersizeName, numSets, numReps, workoutWeight, date) {
    const { data, error } = await supabase
        .from("workouts")
        .insert([{
            user_id: userId,
            muscle_group: muscleGroup,
            exersize_name: exersizeName,
            sets: numSets,
            reps: numReps,
            weight: workoutWeight,
            workout_date: date
        }]);
        
        if (error) {
            console.error("Error inserting workout");
        }

        return {success: true, data};
}

export async function updateWorkout(id, muscleGroup, exersizeName, numSets, numReps, workoutWeight, date) {
    if (!id) return { success: false, error: "A valid ID is required to update." };

    const { data, error } = await supabase
        .from("workouts")
        .update({
            muscle_group: muscleGroup,
            exersize_name: exersizeName,
            sets: numSets,
            reps: numReps,
            weight: workoutWeight,
            workout_date: date
        })
        .eq("id", id)
        .select();

    if (error) {
        console.error("Error updating workout:", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data };
}

export async function getWorkout(userId, date) {
    const { data, error } = await supabase 
        .from("workouts")
        .select("*")
        .eq("user_id", userId)
        .eq("workout_date", date)

        if (error) {
            console.error("Error fetching workout: ", error);
        }

        return data;
}

export async function getWorkoutStats(userId) {
    const { data, error } = await supabase
    .from("workouts")
    .select("workout_date, sets, reps, weight")
    .eq("user_id", userId)

    if (error) {
        console.error("Error fetching all workouts", error);
        return null;
    }
    
    return data;
}