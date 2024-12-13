import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./components/home";
import Protected from "./Protect";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";


import { useDispatch } from "react-redux";
import { userList } from "./Redux/usersListShow";
import { useNavigate } from "react-router-dom";
import Analytics from "./Pages/Analytics";


function App() {
   
  return (
    <>
      <Router>
        <Routes>
        <Route element={<Protected><Layout /></Protected> }>
           <Route path="/" element={<Protected> <Home/></Protected>} />
           <Route path="/analytic" element={<Protected> <Analytics/></Protected>} />
        </Route>  
           <Route path="/login" element={<Login/>} />        
        </Routes>
      </Router>

    </>
  );
}



function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
     <Outlet/>
    </>
  );
}

export default App;
