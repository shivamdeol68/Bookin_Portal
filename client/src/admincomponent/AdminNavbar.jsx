import React, { useEffect } from "react";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem,  Button, Avatar} from "@nextui-org/react";
import { Link } from "react-router-dom";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Flight from "./flight";
import { useDispatch, useSelector } from "react-redux";
import { admin_logout } from "../redux/action/admin";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  let admin = useSelector((state) => state.Admin.admin);
    console.log("nav", admin);
    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(admin_logout());
      window.location.reload();
  };

  useEffect(() => {
      // Update localStorage when user authentication changes
      localStorage.setItem('admin', JSON.stringify(admin));
  }, [admin]);



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
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll className="py-3 bg-black">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
        <Avatar size="sm" isBordered color="primary" src="src/images/airplane.png" />
        
          <p className="font-bold text-inherit ml-2 text-xl text-white">Travel's</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link  color="foreground" to="/Admin-deshboard" aria-current="page" href="#" className="text-lg text-white isActive">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to="/Admin-Bookings"  className="text-lg text-white ml-2">
            Manage Bookings
          </Link>
        </NavbarItem>
        <NavbarItem>

     
        <Dropdown >
      <DropdownTrigger>
        <Button 
          // variant="flat" 
          className=' text-white bg-transparent text-lg'
        >
          Publish
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" className="text-center">
        <DropdownItem ><Link to="/Hotel">Hotels</Link></DropdownItem>
        <DropdownItem ><Link to="/Cars">Car Rentel</Link></DropdownItem>
        <DropdownItem ><Link to="/flight">Flights</Link></DropdownItem>
        <DropdownItem ><Link to="/Packages">Vacation Pacakages</Link></DropdownItem>
      </DropdownMenu>
    </Dropdown>

        </NavbarItem>
    <NavbarItem >
          <Link to="/Staff"  className="text-lg text-white ml-2">
            Staff
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link to="/admin"  className="text-lg text-white ml-2">
            Chatbox
          </Link>
        </NavbarItem>
      </NavbarContent>

      {admin  ? (
                  <>
                  <NavbarContent justify="end">
                  <NavbarItem className="hidden lg:flex">
                  <Button   href="#" variant="flat" className="text-lg text-white"  
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
            <Link to="/Admin-login" className="text-lg text-white">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} variant="bordered"href="#"  className="text-lg text-white bg-transparent ">
            <Link to="/Admin-Signin">
              Sign Up
            </Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
                  </>
                )}

<NavbarMenu className="pt-5">
{menuItems.map((item, index) => (
  <NavbarMenuItem >
      <Link
        color={index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"}
        className="w-full"
        href="#"
        size="lg"
      >
        {item}
      </Link>
  </NavbarMenuItem>
))}
</NavbarMenu>

      {/* <NavbarMenu className="pt-5">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </Navbar>
  );
}


