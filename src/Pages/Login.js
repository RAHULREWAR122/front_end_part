import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../Redux/Auth";
import { useDispatch } from "react-redux";


function Login() {
  const [showPass, setShowPass] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const showPassword = () => {
    setShowPass(!showPass);
  };
   
  const handleUserChange = (e) => {
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
     
    if(!userData.email.trim() || !userData.password.trim()){
         return alert("please add details and try again.")
    }
   try {
   
    const { email , password} = userData;
    const data ={
        email,
        password
     } 
    
     const result = await dispatch(login(data));
     if(login.fulfilled.match(result) && result.payload){
        console.log(result.payload);
        sessionStorage.setItem("user" , JSON.stringify(result.payload));
        setTimeout(()=>{
        //  navigate("/")
        window.location.href = "/"   
        },1000)
      }else{
        alert("please try again" , result?.error)
     }

   } catch (error) {
       console.log(error.message)
   }   
};
  

  return (
    <div className="h-screen w-full font-[inter] flex justify-center items-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-4">
      <div className="border-2 bg-white shadow-xl max-w-md w-full p-6 rounded-lg flex flex-col items-center">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          Login Please
        </h2>
        <form
          onSubmit={handleUserSubmit}
          className="w-full flex flex-col items-center gap-6"
        >
          <input
            type="email"
            name="email"
            onChange={handleUserChange}
            value={userData.email}
            placeholder="Email Address"
            className="p-3 w-[90%] md:w-[80%] rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <div className="relative w-[90%] md:w-[80%]">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              onChange={handleUserChange}
              value={userData.password}
              placeholder="Password"
              className="p-3 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
            <span
              onClick={showPassword}
              className="absolute right-4 top-3 text-gray-500 cursor-pointer hover:text-blue-400 transition"
            >
              {showPass ? <FaRegEyeSlash size={20} /> : <IoEyeOutline size={20} />}
            </span>
          </div>
          <button
            type="submit"
            className="w-[90%] md:w-[80%] bg-blue-500 py-3 rounded-md text-white text-lg font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
