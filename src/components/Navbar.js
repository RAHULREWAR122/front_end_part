import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const logOut = () => {
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="w-full  flex justify-between items-center px-6 py-2 h-[60px] bg-white shadow-xl">
      <NavLink to={"/"} className="md:text-xl text-sm">
        Welcome to Dashboard
      </NavLink>
      <div className="md:w-[50%] w-[70%] flex justify-end gap-10 items-center h-full px-2">
        <NavLink
          to={"/analytic"}
          className="font-semibold text-blue-500 underline hover:text-blue-700 md:text-xl text-sm"
        >
          Analytics Dashboard
        </NavLink>
        <button
          onClick={logOut}
          className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-75"
        >
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
