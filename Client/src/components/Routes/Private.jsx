import { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
       const authCheck = async () => {
           const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/user-auth`, {
               headers: {
                   "Authorization": auth?.token
               }
           });
           setOk(res.data.ok);
       };
       if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> :<Spinner></Spinner>;
};

export default PrivateRoute;
