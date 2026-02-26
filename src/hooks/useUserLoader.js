import { useState, useEffect } from "react";
import { getUserProfile } from "../services/profileServices";

export const useUserLoader = (session) => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (session?.user?.id) {
                setLoading(true);
                try {
                    const data = await getUserProfile(session.user.id);
                    setUserData(data);
                    setError(null);
                } catch (err) {
                    console.error("Fetch failed:", err);
                    setError(err.message);
                }
                finally {
                    setLoading(false);
                }
            }
        };
        loadData(); 
    }, [session]);

    return { userData, error, loading };
};