import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const useSignOut = () => {
    const { signOut } = UserAuth();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return {logout};
};