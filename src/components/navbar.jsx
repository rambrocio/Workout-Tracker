import React from "react";
import { Link } from "react-router-dom";
import Profile from "../pages/Profile";
import Input from "../pages/Input";
import Workouts from "../pages/Workouts";

export default function Navbar() {
    return (
        <>
            <ul>
                <Link to='/profile'>Profile</Link>
                <Link to='/input'>Input</Link>
                <Link to='/workouts'>My Workouts</Link>
            </ul>
        </>
    );
}