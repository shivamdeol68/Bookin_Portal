import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

function ManageBooking() {
    const admindata = JSON.parse(localStorage.getItem("admin"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.user[0];
    const adminId = admindata._id;
    const [userData, setUserData] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [showMessageInput, setShowMessageInput] = useState(false);
    const [staffList, setStaffList] = useState([]);
    console.log("staffList",staffList);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedCart, setSelectedCart] = useState(null);
    const [assignedMessage, setAssignedMessage] = useState('');
    const [rejectedMessage, setRejectedMessage] = useState('');

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/staff');
                setStaffList(response.data.findstaff);
            } catch (error) {
                console.log(error);
            }
        };
        fetchStaffData();
    }, []);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/Admin-Data/${adminId}`);
                setUserData(response.data.data.Carts);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAdminData();
    }, [adminId]);

    useEffect(() => {
        const userIdCount = userData.filter(cart => cart.user === userId).length;
        setShowMessageInput(userIdCount > 2);
    }, [userData, userId]);

    const isStaffAvailable = () => {
        return staffList.length > 0;
    };

    const assignStaffMember = async (staffId, cartId) => {
        try {
            const response = await axios.post('http://localhost:3000/api/Assign', { userId, staffId, cartId });
            if (response.data.success) {
                const message = `Staff assigned successfully to Cart ID: ${cartId}.`;
                localStorage.setItem('assignedMessage', message);
                setAssignedMessage(message);
                setSelectedStaff(staffId);
                setSelectedCart(cartId);
            } else {
                const message = `Failed to assign staff to Cart ID: ${cartId}.`;
                localStorage.setItem('assignedMessage', message);
                setAssignedMessage(message);
            }
        } catch (error) {
            console.error("Error assigning staff member to item:", error);
        }
    };
    
    useEffect(() => {
        const assignedMessage = localStorage.getItem('assignedMessage') || '';
        const rejectedMessage = localStorage.getItem('rejectedMessage') || '';
        setAssignedMessage(assignedMessage);
        setRejectedMessage(rejectedMessage);
    }, []);
    
    const rejectStaffMember = (cartId) => {
        const message = `Unable to provide staff for Cart ID: ${cartId}.`;
        localStorage.setItem('rejectedMessage', message);
        setRejectedMessage(message);
    };
    

    const sendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/send-message', {
                userId,
                message: messageContent
            });
            if (response.data.success) {
                console.log('Message sent successfully');
                setMessageContent('');
            } else {
                console.error('Error sending message:', response.data.error);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container mx-auto flex justify-center">
  {userData.map((cart) => (
    <div key={cart._id} className="bg-gray-100 my-4 p-4 rounded-lg mx-4">
        <h2 className="text-lg font-semibold mb-2">Cart ID: {cart._id}</h2>
        <div><h1 className="text-lg">User : {cart.user}</h1></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
            {cart.items && cart.items.map((item) => (
                <div key={item._id} >
                   
                    {assignedMessage && assignedMessage.includes(cart._id) && (
                        <p className="text-green-500">Assigned: {assignedMessage}</p>
                    )}
                    {rejectedMessage && rejectedMessage.includes(cart._id) && (
                        <p className="text-red-500">Rejected: {rejectedMessage}</p>
                    )}
                    {(!assignedMessage || !assignedMessage.includes(cart._id)) &&
                    (!rejectedMessage || !rejectedMessage.includes(cart._id)) && (
                        <div>
                            <select
                                className="mb-2 p-2"
                                onChange={(e) => assignStaffMember(e.target.value, cart._id)}
                            >
                                <option value="">Select Staff</option>
                                {isStaffAvailable() ? (
                                    staffList.map((staff) => (
                                        <option
                                            key={staff._id}
                                            value={staff._id}
                                            disabled={staff.assigneditem}
                                        >
                                            {staff.name} {staff.assigneditem ? "Unavailable" : "Available"}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No staff available</option>
                                )}
                            </select>
                            <div className="flex gap-2">
                                <button
                                    className="bg-primary-500 text-white px-4 py-2 rounded"
                                    onClick={() => assignStaffMember(selectedStaff, selectedCart)}
                                >
                                    Accept 
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => rejectStaffMember(cart._id)}
                                >
                                    Reject 
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
  ))}
</div>




        </>
    );
}

export default ManageBooking;
