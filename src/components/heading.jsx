import { Link } from "react-router-dom";
import { useSignOut } from "../hooks/useSignOut";
import '../styling/Heading.css';

const Heading = () => {
    const { logout } = useSignOut();

    const handleSignOut = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <>
            <h1 className="title">Roberto's Workout Tracker</h1>
            <div className="navbar">
                <div>
                    <p onClick={handleSignOut} className="signOut"><i>Sign Out</i></p>
                </div>
                <div className="navbar-items">
                    <Link to='/input'>Input</Link>
                    <Link to='/workouts'>Workouts</Link>
                    <Link to='/stats'>Stats</Link>
                </div>
            </div>
        </>
    );
}

export default Heading;