import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function Auth(prop) {
    const { Component } = prop;
    const [authenticated, setAuthenticated] = useState(null);
    const userIds=JSON.parse(localStorage.getItem("user"));
    console.log(userIds);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api/auth");
                console.log("authh", response.data);
                if (response.data.sucess) {
                    setAuthenticated(response.data.use);
                }
            } catch (error) {
                console.error("Error authenticating user:", error);
            } 
        };
    
        fetchUserData();
    }, []);
    console.log("authenticate",authenticated);

    useEffect(() => {
        if (userIds === null) {
           return navigate("/Login");
        }
    }, [userIds, navigate]);
    if (authenticated === null) {
        return <div className='flex justify-center mt-20 text-5xl font-extrabold'>Loading...</div>;
    }

    return (
        <>
            <Component />
        </>
    );
}

export default Auth;
