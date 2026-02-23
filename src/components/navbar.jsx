import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <p><Link to='/input'>Input</Link> <Link to='/workouts'>My-Workouts</Link> <Link to='/profile'>Profile</Link></p>
        </>
    );
}