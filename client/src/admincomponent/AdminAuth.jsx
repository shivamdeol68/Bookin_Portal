import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function AdminAuth(prop) {
    const { Component } = prop;
    const [authenticated, setAuthenticated] = useState(null);
    const adminId=JSON.parse(localStorage.getItem("admin"));
    console.log(adminId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api/adminauth");
                console.log("auth", response);
                if (response.data.success) { 
                    setAuthenticated(response.data.admin);
                }
            } catch (error) {
                console.error("Error authenticating user:", error);
            } 
        };
    
        fetchAdminData();
    }, []);
    console.log(authenticated);

    useEffect(() => {
        if (adminId === null) {
           return navigate("/Admin-login");
        }
    }, [adminId, navigate]);
    // if (authenticated === null) {
    //     return <div className='flex justify-center mt-20 text-5xl font-extrabold'>Loading...</div>;
    // }

    return (
        <>
            <Component />
        </>
    );
}

export default AdminAuth;
