import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";
import { getUserProfile } from "../services/profileServices";

const Input = () => {
    const { session } = UserAuth();
    const [userData, setUserData] = useState(null);

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

    return (
        <>
            <Navbar />
            <div>
                <h1>Hello  {userData?.name || "Loading..."}, Input Your Workout Below</h1>
                <form>
                    <input 
                        type="text"
                        placeholder="Date"
                    /> <br />
                    <input
                        type="text"
                        placeholder="Muscle Group Hit"
                    /> <br />
                    <input 
                        type="number"
                        placeholder="Sets"
                    /> <br />
                    <input
                        type="number"
                        placeholder="Reps"
                    /> <br />
                    <input
                        type="number"
                        placeholder="Weight"
                    /> <br/ >
                    <button>Submit</button> 
                    <button>Clear</button>
                </form>
            </div>
        </>

    )
}

export default Input;
