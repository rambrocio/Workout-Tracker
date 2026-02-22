import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/profileServices";
import Navbar from "../components/navbar";

const Profile = () => {
    const { session, signOut } = UserAuth();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
        if (session?.user?.id) {
                try {
                    const data = await getUserProfile(session.user.id);
                    setUserData(data);
                } catch (err) {
                    console.error("Fetch failed:", err);
                }
            }
        };
        loadData(); 
    }, [session]);

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
            <h1>Profile Page</h1>
            <h2>Welcome, {userData?.name || "Loading..."}</h2>
            <div>
                <h3>Your Stats</h3>
                <p>Weight: {userData?.weight}</p>
                <p>Max Bench Press: {userData?.bench_max || "Not Available"} lbs</p>
                <p>Max Squat: {userData?.squat_max || "Not Available"} lbs</p>
                <p>Max Deadlift: {userData?.deadlift_max || "Not Available"} lbs</p>
            </div>
            <div>
                <p onClick={handleSignOut}>Sign Out</p>
            </div>
        </div>
    )
}

export default Profile;