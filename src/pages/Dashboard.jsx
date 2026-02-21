import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

const Dashboard = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();
    
    console.log(session);

    const handleSignOut = async (e) => {
        e.preventDefault()
        try {
            await signOut();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Dashboard</h1>
            <h2>Welcome, {session?.user?.email}</h2>
            <div>
                <p onClick={handleSignOut}>Sign Out</p>
            </div>
        </div>
    )
}

export default Dashboard;