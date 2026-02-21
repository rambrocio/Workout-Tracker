import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signin from "./Signin";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const { session, signUpNewUser } = UserAuth();
    const navigate = useNavigate();
    console.log(session);

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await signUpNewUser(email, password)
            
            if (result.success) {
                navigate('/dashboard')
            }
        } catch (error) {
            setError("ERROR OCCURED!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
            <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
            <div>
                <input onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                placeholder="Email" 
                /> <br />
                <input 
                type="text"
                placeholder="Name"
                /> <br /> 
                <input onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                placeholder="Password" 
                /> <br />
                <button type="submit" disabled={loading}>Sign Up</button>
                {error && <p>{error}</p>}
            </div>
        </form>
    )
}

export default Signup;