"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleUserIcon,
  setShowDropdown,
  hideDropdown,
  logoutUser,
} from "@/redux/reducerSlices/navbarSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userIconClicked, isLoggedIn, showDropdown } = useSelector(
    (state) => state.navbar
  );
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const handleMouseEnter = (menu) => {
    dispatch(setShowDropdown(menu));
  };

  const handleMouseLeave = () => {
    dispatch(hideDropdown());
  };

  const handleUserIconClick = () => {
    dispatch(toggleUserIcon());
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
  };

  return (
    <div className="w-full bg-blue-500 h-[80px] z-50 shadow-md">
      <div className="container mx-auto px-4 h-full relative flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl cursor-pointer">
          <Link href="/">HospitalLogo</Link>
        </div>

        {/* Navbar links */}
        <ul className="hidden md:flex gap-x-8 items-center">
          {[
            { href: "/", label: "Home" },
            { href: "/components/contact", label: "Contact" },
            { href: "/components/service", label: "Our Services" },
            { href: "/components/About", label: "About Us" },
            { href: "/pages/Appointment", label: "Online Appointment" },
            { href: "/dashboard", label: "Dashboard" },
          ].map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <p
                  className={`hover:text-gray-300 transition-colors ${
                    isActive(link.href) ? "text-gray-300" : "text-white"
                  }`}
                >
                  {link.label}
                </p>
              </Link>
            </li>
          ))}
          {/* User icon */}
          <li className="relative">
            <User
              className="text-white h-6 w-6 ml-5 cursor-pointer"
              onClick={handleUserIconClick}
            />
            {userIconClicked && (
              <div className="absolute top-12 right-0 z-50 bg-white rounded-lg shadow-lg p-4">
                {isLoggedIn ? (
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 transition-all"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link href="/pages/login">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-all">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            )}
          </li>
        </ul>

        {/* Mobile menu (optional) */}
        {/* Add a burger icon and mobile drawer here if needed */}
      </div>
    </div>
  );
};

export default Navbar;
