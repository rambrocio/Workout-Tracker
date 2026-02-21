import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Signup from "./Signup";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const { session, signInUser } = UserAuth();
    const navigate = useNavigate();
    console.log(session);

    const handleSignIn = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await signInUser(email, password)
            
            if (result.success) {
                navigate('/input')
            }
        } catch (error) {
            setError("ERROR OCCURED!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
            <div>
                <input onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                placeholder="Email" 
                /> <br />
                <input onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                placeholder="Password" 
                /> <br />
                <button type="submit" disabled={loading}>Sign In</button>
                {error && <p>{error}</p>}
            </div>
        </form>
    )
}

export default Signin;