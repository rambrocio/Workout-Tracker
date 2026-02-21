import {createContext, useEffect, useState, useContext} from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    // Function to Sign Up
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.error("ERROR SIGNING IN : ", error);
            return { success: false, error };    
        }
        return { success: true, data }; 
    };

    // Function to Sign In
    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) {
                console.error("SIGN IN ERROR OCCURED: ", error);
                return {success: false, error: error.message};
            }
            console.log("SIGN IN SUCCESS: ", data);
            return {success: true, data };
        }   catch(error) {
            console.error("ERROR: ", error);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session }}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    // Function to Sign Out
    const signOut = () => {
        const {error} = supabase.auth.signOut();
        if (error) {
            console.error("ERROR SIGNING OUT: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};