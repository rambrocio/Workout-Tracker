import React from "react";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";

const Input = () => {
    const { session } = UserAuth();

    return (
        <>
            <Navbar />
            <div>
                <h1>Hello {session?.user?.email}</h1>
                <h1>Hello </h1>
                <h2>Input Your Workout:</h2>
            </div>
        </>

    )
}

export default Input;
