import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const [artikel, setArtikel] = useState([]);
    

    useEffect(() => {
        getArtikels();
    }, []);

    const getArtikels = async () => {
        const response = await axios.get("http://localhost:3000/artikel/getArtikel");
        setArtikel(response.data);
    };

    return (
        <>
        <nav className="w-full py-4 px-20 bg-blue-500 fixed shadow-lg flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold uppercase">JEWEPE</h1>
            <Link to={'/Login'} className="bg-green-400 px-6 py-2 rounded-xl font-bold uppercase text-xl text-white italic">Login</Link>
        </nav>
            <div className="w-full h-[100vh]  flex items-center justify-center bg-cover bg-center bg-fixed"  style={{ backgroundImage: "url('../public/img/hero1.jpg')" }}>
                <h1 className="font-bold text-6xl text-white uppercase">Selamat Datang di E-mading</h1>
            </div>
            <div className="w-full p-10">
                <button className="bg-blue-400 mb-10 font-bold text-3xl uppercase italic text-white px-6 py-2 rounded-lg" disabled>Berita terkini</button>
                {/* container */}
                <div className="w-full border shadow-lg rounded-lg px-4 py-20 flex justify-evenly flex-wrap gap-x-7 gap-y-14">
                    {/* Mapping artikel */}
                    {artikel.map((item) => (
                        <div key={item.id} className="w-2/5 border shadow-lg">
                            <div className="h-44 bg-slate-700 rounded bg-cover bg-center bg-no-repeat " style={{ backgroundImage: `url('http://localhost:3000${item.gambar}')` }}>
                                {/* Jika ada gambar, Anda bisa menambahkannya di sini */}
                            </div>
                            <div className="py-8 px-5">
                                <h1 className="font-bold text-2xl mb-3">Judul: {item.judul}</h1>
                                <button className="bg-black text-white italic font-bold py-2 px-5 rounded-xl">
                                    See More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
