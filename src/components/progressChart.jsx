import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart = ({data}) => {
    if (!data || data.length === 0) {
        return <p>No workout data available to graph yet!</p>;
    }
    return (
        <div>
            <div>

        <ResponsiveContainer>

            <LineChart data={data}>

    <XAxis dataKey="week" /> {/* This matches our weekStart string */}

    <YAxis />

    <Tooltip />

    <Line type="monotone" dataKey="totalWeight" stroke="#8884d8" />

</LineChart>

        </ResponsiveContainer>

    </div>
    </div>
    )
    
};

export default ProgressChart;