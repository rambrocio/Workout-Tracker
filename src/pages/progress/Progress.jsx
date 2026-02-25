import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { getWorkoutStats } from '../../services/workoutServices';
import Heading from "../../components/heading";
import ProgressChart from "../../components/progressChart";


const Progress = () => {
    const { session } = UserAuth();
    const [weeklyData, setWeeklyData] = useState([]);

    useEffect(() => {
        const fetchAndProcess = async () => {
            if (session?.user?.id) {
                const data = await getWorkoutStats(session.user.id);
                if (!data) return;

                // TRANSFORM DATA: Group by Week
                const groupedByWeek = data.reduce((acc, workout) => {
                    const date = new Date(workout.workout_date);
                    // Get the start of the week (Sunday)
                    const diff = date.getDate() - date.getDay();
                    const weekStart = new Date(date.setDate(diff)).toLocaleDateString();

                    if (!acc[weekStart]) {
                        acc[weekStart] = { week: weekStart, totalWeight: 0, count: 0 };
                    }
                    
                    // You can track total volume, or just the weight
                    acc[weekStart].totalWeight += Number(workout.weight || 0);
                    acc[weekStart].count += 1;
                    
                    return acc;
                }, {});

                // Convert object back to array and sort by date
                const chartArray = Object.values(groupedByWeek).sort((a, b) => 
                    new Date(a.week) - new Date(b.week)
                );

                setWeeklyData(chartArray);
            }
        };
        fetchAndProcess();
    }, [session?.user?.id]);

    return (
        <>
            <Heading />
            <p>Progress Page</p>
            <ProgressChart data={weeklyData} />
        </>
    )
}

export default Progress;