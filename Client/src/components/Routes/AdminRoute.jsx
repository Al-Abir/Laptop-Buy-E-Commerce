import { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import AdminDashborad from "../../pages/Admin/AdminDashborad";

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
       const authCheck = async () => {
           const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/admin-auth`, {
               headers: {
                   "Authorization": auth?.token
               }
           });
           setOk(res.data.ok);
       };
       if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> :<Spinner path=""></Spinner>;
};

export default AdminRoute;
