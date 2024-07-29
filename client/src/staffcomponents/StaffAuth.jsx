import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function StaffAuth(prop) {
    const { Component } = prop;
    const [authenticated, setAuthenticated] = useState(null);
    const staffId=JSON.parse(localStorage.getItem('staff-member'));
    console.log(staffId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api/staffauth");
                console.log("authh", response.data);
                if (response.data.success) {
                    setAuthenticated(response.data.staff);
                }
            } catch (error) {
                console.error("Error authenticating user:", error);
            } 
        };
    
        fetchUserData();
    }, []);
    console.log(authenticated);

    useEffect(() => {
        if (staffId === null) {
           return navigate("/Staff-login");
        }
    }, [staffId, navigate]);
    if (authenticated === null) {
        return <div className='flex justify-center mt-20 text-5xl font-extrabold'>Loading...</div>;
    }

    return (
        <>
            <Component />
        </>
    );
}

export default StaffAuth;
