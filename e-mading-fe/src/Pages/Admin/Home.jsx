import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Component/Navbar";

export default function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        const getTokenAndDecode = async () => {
          const token = await localStorage.getItem("token");
          if (!token) {
            navigate("/Login")
          } 
        };
        getTokenAndDecode();
      }, [navigate]);

    axios.defaults.withCredentials = true
    return (
        <>
        <Navbar></Navbar>
        <div className="h-[100vh] flex justify-center items-center">
            <div className="text-7xl">Halaman Admin</div>
        </div>
        </>
    )
}