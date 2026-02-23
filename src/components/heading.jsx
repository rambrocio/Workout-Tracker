import { Link } from "react-router-dom";
import '../styling/Heading.css';

export default function Heading() {
    return (
        <>
            <h1 className="title">Roberto's Workout Tracker</h1>
            <div className="navbar">
                <div>
                    <p>placeholder</p>
                </div>
                <div className="navbar-items">
                    <Link to='/input'>Input</Link>
                    <Link to='/workouts'>My Workouts</Link>
                    <Link to='/profile'>Profile</Link>
                </div>
            </div>
        </>
    );
}