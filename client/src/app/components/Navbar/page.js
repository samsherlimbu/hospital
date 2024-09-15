"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleUserIcon,
  logoutUser,
} from "@/redux/reducerSlices/navbarSlice";
import Image from "next/image";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userIconClicked, isLoggedIn } = useSelector((state) => state.navbar);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const handleUserIconClick = () => {
    dispatch(toggleUserIcon());
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
  };

  // Retrieve the isAdmin value from localStorage
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.isAdmin;

  return (
    <div className="w-full bg-blue-200 h-[80px] z-50 shadow-md">
      <div className="container mx-auto px-4 h-full relative flex justify-between items-center">
        {/* Logo */}
        <div className="text-black font-bold text-xl cursor-pointer ml-4">
          <Image
            src='/logo.png' 
            alt='Logo' 
            width={100} 
            height={90} 
            priority={true} 
          />
        </div>

        {/* Navbar links */}
        <ul className="hidden md:flex gap-x-8 items-center">
          {[
            { href: "/", label: "Home" },
            { href: "/components/contact", label: "Contact" },
            { href: "/components/service", label: "Our Services" },
            { href: "/components/About", label: "About Us" },
            { href: "/pages/Appointment", label: "Online Appointment" },
          ].map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <p
                  className={`hover:text-red-300 transition-colors ${
                    isActive(link.href) ? "text-emerald-500" : "text-black"
                  }`}
                >
                  {link.label}
                </p>
              </Link>
            </li>
          ))}

          {/* Conditionally render the Dashboard link if isAdmin is true */}
          {isAdmin && (
            <li>
              <Link href="/dashboard">
                <p
                  className={`hover:text-red-300 transition-colors ${
                    isActive("/dashboard") ? "text-emerald-500" : "text-black"
                  }`}
                >
                  Dashboard
                </p>
              </Link>
            </li>
          )}

          {/* User icon */}
          <li className="relative">
            <User
              className="text-black h-6 w-6 ml-5 cursor-pointer"
              onClick={handleUserIconClick}
            />
           {
  userIconClicked && (
    <div className="absolute top-12 right-0 z-50 bg-white rounded-md shadow-sm p-2 w-40 border border-gray-200">
      {isLoggedIn ? (
        <button
          className="w-full text-center bg-red-500 text-white rounded-md py-2 hover:bg-red-600 transition-all"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      ) : (
        <Link href="/pages/login">
          <button className="w-full text-center bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-all">
            Sign In
          </button>
        </Link>
      )}
    </div>
  )
}

          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
