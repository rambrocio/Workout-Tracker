import { supabase } from "../supabase";

export async function createUserProfile(userId, name, weight, maxBench, maxSquat, maxDeadlift) {
    const { data, error } = await supabase
        .from("profile")
        .insert([{
            id: userId,
            name: name,
            weight: weight,
            bench_max: maxBench,
            squat_max: maxSquat,
            deadlift_max: maxDeadlift
        }]);

        if (error) {
            console.error("Error creating Profile");
            throw error
        }

        return {success: true, data };
}