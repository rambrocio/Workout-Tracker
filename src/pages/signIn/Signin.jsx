import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import './SignIn.css';

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
        <div className="loginPageContainer">
            <div className="loginContainer">
                <form onSubmit={handleSignIn} className="loginForm">
                    <h2>Sign In</h2> <br />
                    <div className="loginInfoContainer">
                        <input onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            placeholder="Email" 
                            className="loginInfo"
                        /> <br />
                        <input onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            placeholder="Password"
                            className="loginInfo" 
                        /> <br />
                    </div>
                    <button type="submit" disabled={loading} className="loginButton">Sign In</button>
                    {error && <p>{error}</p>}
                    <br />
                    <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signin;