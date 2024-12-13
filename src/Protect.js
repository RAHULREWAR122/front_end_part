import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const [flag, setFlag] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"))
   
  useEffect(() => {
    if (user) {
      setFlag(true)
    }else{
      sessionStorage.removeItem("user");
      window.location.href =  "/login";
    }
  },[user, navigate]);
  if (flag === null){
    <div className="mt-[50%]">
      <a href="/login">loading...</a>
    </div>
  }else{
    return children;
  }
};

export default Protected;
