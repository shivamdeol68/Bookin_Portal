import React, { useEffect } from "react";
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
import { logout_staff } from "../redux/action/staff";

export default function  StaffNavbar () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  let staff =  JSON.parse(localStorage.getItem("staff-member"));
  console.log("nav", staff);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout_staff());
    window.location.reload();
  };

  // useEffect(() => {
  //   // Update localStorage when user authentication changes
  //   localStorage.setItem("staff", JSON.stringify(staff));
  // }, [staff]);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
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
      {/* <NavbarItem isActive>
          <Link 
            to="/Staff-Bookings"
            color="foreground"
            aria-current="page"
            href="#"
            className="text-lg"
          >
            Staff Home
          </Link>
        </NavbarItem> */}
        {/* <NavbarItem isActive>
          <Link
            to="/Cart-Item"
            color="foreground"
            aria-current="page"
            href="#"
            className="text-lg"
          >
            Booking
          </Link>
        </NavbarItem> */}
        <NavbarItem>
          <Link to="/Staff-Chat" className="text-lg">
            ChatBox
          </Link>
        </NavbarItem>
       
        {/* <NavbarItem>
          <Link
            // to="/Search-Hotel"
            color="foreground"
            href="#"
            className="text-lg"
          >
            FeedBack & Review
          </Link>
        </NavbarItem> */}
      </NavbarContent>
     
     
      {staff  ? (
                  <>
                  <NavbarContent justify="end">
                  <NavbarItem className="hidden lg:flex">
                  <Button   href="#"  color="danger"
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
            <Link to="/Staff-login"  color="primary"
                href="#"
                variant="flat"
                className="text-lg">Login</Link>
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
