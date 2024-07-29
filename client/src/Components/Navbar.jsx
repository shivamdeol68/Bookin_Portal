import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/action/user";
import axios from "axios";

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  let user = useSelector((state) => state.user.user);
  // console.log("nav", user);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const userIds = useSelector((state) => state.user.user && state.user.user.user && state.user.user.user[0]);


  useEffect(()=>{
    const fetchCartItems = async () => {
      try {
          const response = await axios.get(`http://localhost:3000/api/cart/${userIds}`);
          console.log("response",response);
          if (response.data.success && Array.isArray(response.data.cartItems)) {
              setCartItems(response.data.cartItems);
          } else {
              console.error('Response data is not as expected:', response.data);
          }
      } catch (error) {
          console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  },[])
  
  console.log("cartitem", cartItems);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
    localStorage.clear();
  };

  useEffect(() => {
    // Update localStorage when user authentication changes
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const menuItems = [
    "Home",
    "About",
    "Search",
    "Booking",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      className="py-3 "
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Avatar
            size="sm"
            isBordered
            color="primary"
            src="src/images/airplane.png"
          />

          <p className="font-bold text-inherit ml-2 text-xl">Travel's</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link
            to="/"
            color="foreground"
            aria-current="page"
            href="#"
            className="text-lg"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/about" className="text-lg">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/Search-Hotel"
            color="foreground"
            href="#"
            className="text-lg"
          >
            Search
          </Link>
        </NavbarItem>
        {user  === null ?(<>
          </>):(<>
            {user && user.user ? (<><NavbarContent>
              <NavbarItem className="hidden lg:flex">
    <Link to="/Cart" color="foreground" href="#" className="text-lg">
        Bookings {cartItems.length===0?(<></>):(<><span  style={{display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        height: '20px',
        width: '20px',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        position: 'absolute', }}>{cartItems.length}</span>
 </>)}
           </Link>
</NavbarItem>

          </NavbarContent></>):(<><h1></h1></>)}
          </>)}
      </NavbarContent>
     
      {user && user.user ? (
        <>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Button
                color="danger"
                href="#"
                variant="flat"
                className="text-lg"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      ) : (
        <>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link to="/Login" className="text-lg">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="flat"
                className="text-lg"
              >
                <Link to="/Signin">Sign Up</Link>
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      )}

      <NavbarMenu className="pt-5">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
        
            {item === "Log Out" ? (
              <button
                className="w-full text-lg"
                onClick={handleLogout} // Add onClick handler for "Log Out" option only
              >
                {item}
              </button>
            ) : (
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
