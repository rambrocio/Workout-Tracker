import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { createUserProfile } from "../services/profileServices";

const Signup2 = () => {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [maxBench, setMaxBench] = useState("");
    const [maxSquat, setMaxSquat] = useState("");
    const [maxDeadlift, setMaxDeadlift] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { session } = UserAuth();
    const navigate = useNavigate();

    const handleSignUp2 = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            if (!session?.user) {
                throw new Error("No user found");
            }
        
            const result = await createUserProfile(
                session.user.id, 
                name, 
                weight, 
                maxBench, 
                maxSquat, 
                maxDeadlift
            );

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
        <form onSubmit={handleSignUp2}>
            <h2>Sign Up Continued</h2>
            <div>
                <input onChange={(e) => setName(e.target.value)} 
                    type="text" 
                    placeholder="Name" 
                /> <br />
                <input onChange={(e) => setWeight(e.target.value)} 
                    type="number" 
                    placeholder="Weight" 
                /> <br />
                <input onChange={(e) => setMaxBench(e.target.value)} 
                    type="number" 
                    placeholder="Bench" 
                /> <br />
                <input onChange={(e) => setMaxSquat(e.target.value)} 
                    type="number" 
                    placeholder="Squat" 
                /> <br />
                <input onChange={(e) => setMaxDeadlift(e.target.value)} 
                    type="number" 
                    placeholder="Deadlift" 
                /> <br />
                <button type="submit" disabled={loading}>Complete P</button>
                {error && <p>{error}</p>}
            </div>
            <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
        </form>
    )
}

export default Signup2;