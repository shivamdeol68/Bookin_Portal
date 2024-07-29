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

export default function  CartNavbar () {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  let user = useSelector((state) => state.user.user);
  console.log("nav", user);
  const dispatch = useDispatch();

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
      <NavbarItem >
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
        <NavbarItem isActive>
          <Link
            to="/Cart-Item"
            color="foreground"
            aria-current="page"
            href="#"
            className="text-lg"
          >
            Item
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/Cart-Chat" className="text-lg">
            ChatBox
          </Link>
        </NavbarItem>
       
       
      </NavbarContent>
     
     

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
