import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const useSignOut = () => {
    const { signOut } = UserAuth();
    const navigate = useNavigate();

    const logout = async () => {
        await signOut();
        navigate('/');
    };
    return {logout};
}
