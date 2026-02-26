import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import './SignIn.css';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const { session, signUpNewUser } = UserAuth();
    const navigate = useNavigate();
    console.log(session);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const result = await signUpNewUser(email, password)
            
            if (result.success) {
                navigate('/signup2');
            }
        } catch (error) {
            setError("Error Occured: ", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="loginPageContainer">
            <div className="loginContainer">
                <form onSubmit={handleSignUp} className="loginForm">
                    <h2>Sign Up</h2> <br />
                    <div className="loginInfoContainer">
                        <input onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            placeholder="Email"
                            className="loginInfo" 
                            required
                        /> <br />
                        <input onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            placeholder="Password"
                            className="loginInfo" 
                            required
                        /> <br />
                    </div>
                    <button type="submit" disabled={loading} className="loginButton">Sign Up</button>
                    {error && <p>{error}</p>}
                    <br />
                    <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup;