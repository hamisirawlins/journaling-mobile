// contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={session}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
