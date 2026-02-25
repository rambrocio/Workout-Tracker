import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

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
                navigate('/signup2')
            }
        } catch (error) {
            setError("ERROR OCCURED!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="pageContainer">
            <form onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
                <div>
                    <input onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        placeholder="Email" 
                    /> <br />
                    <input onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        placeholder="Password" 
                    /> <br />
                    <button type="submit" disabled={loading}>Sign Up</button>
                    {error && <p>{error}</p>}
                </div>
                <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
            </form>
        </div>
    )
}

export default Signup;