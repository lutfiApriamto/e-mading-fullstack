import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
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

    const handleLogout = () => {
        localStorage.removeItem("token")
        axios.get('http://localhost:3000/admin/logout')
        .then(res => {
            if(res.data.status){
            alert("berhasil melakukan Logout")
            navigate('/Login')
            }
        }).catch(err => console.log(err)) 
        }
    return(
        <>
         <nav className="w-full fixed flex bg-purple-600 justify-between items-center py-4 px-10">
            <h1 className="font-bold  text-white text-2xl">JEWEPE</h1>
            <div className="flex gap-6 items-center">
                <Link className="font-bold  text-white text" to={`/HomeAdmin`}>Home</Link>
                <Link className="font-bold  text-white text" to={`/HomeAdmin/tambahData`}>Tambah Artikel</Link>
                <Link className="font-bold  text-white text" to={`/HomeAdmin/listArtikel`}>List Artikel </Link>
                <button onClick={handleLogout} className="font-bold  text-white text bg-red-500 py-2 px-5 rounded-xl">Log Out</button>
            </div>
        </nav>
        </>
    )
}