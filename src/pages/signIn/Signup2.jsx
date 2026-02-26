import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { createUserProfile } from "../../services/profileServices";
import './SignIn.css';

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
        setError("")
        if (weight < 1) {
            setError("Weight cannot be less than 1 lb");
            return;
        }
        if (maxBench < 0) {
            setError("Max Bench cannot be less than 0 lbs");
            return;
        }
        if (maxSquat < 0) {
            setError("Max Squat cannot be less than 0 lbs");
            return;
        }
        if (maxDeadlift < 0) {
            setError("Max Deadlift cannot be less than 0 lbs");
            return;
        }
        setLoading(true)
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
        <div className="loginPageContainer">
            <div className="loginContainer">
                <form onSubmit={handleSignUp2} className="loginForm">
                    <h2>Sign Up (Continued)</h2> <br />
                    <div className="loginInfoContainer">
                        <input onChange={(e) => setName(e.target.value)} 
                            type="text" 
                            placeholder="Name"
                            className="loginInfo" 
                            required
                        /> <br />
                        <input onChange={(e) => setWeight(e.target.value)} 
                            type="number" 
                            placeholder="Weight"
                            className="loginInfo"
                            required 
                        /> <br />
                        <input onChange={(e) => setMaxBench(e.target.value)} 
                            type="number" 
                            placeholder="Bench" 
                            className="loginInfo"
                            required
                        /> <br />
                        <input onChange={(e) => setMaxSquat(e.target.value)} 
                            type="number" 
                            placeholder="Squat"
                            className="loginInfo"
                            required
                        /> <br />
                        <input onChange={(e) => setMaxDeadlift(e.target.value)} 
                            type="number" 
                            placeholder="Deadlift" 
                            className="loginInfo"
                            required
                        /> <br />
                    </div>
                    <button type="submit" disabled={loading} className="loginButton">Complete Profile</button>
                    {error && <p className="errorMessage">{error}</p>}
                    <br />
                    <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup2;