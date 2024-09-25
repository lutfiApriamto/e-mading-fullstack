import axios from "axios";
import Navbar from "../Component/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListArtikel() {
  const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    getArtikels();
  }, []);

  const getArtikels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/artikel/getArtikel");
      console.log(response.data); // Log data untuk memeriksa format tanggal
      setArtikel(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteArtikel = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/artikel/${id}/deleteArtikel`);
      alert("Artikel Berhasil Dihapus");
      getArtikels();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-32 flex flex-col justify-center items-center">
        <h1 className="font-bold text-center text-6xl mb-11">LIST ARTIKEL</h1>
        <table className="table-auto border-separate border border-slate-400 bg-white text-center w-5/6">
          <thead>
            <tr>
              <th className="border border-slate-300 text-sm sm:text-lg md:text-xl lg:text-3xl py-3 lg:py-2">No.</th>
              <th className="border border-slate-300 text-sm sm:text-lg md:text-xl lg:text-3xl py-3 lg:py-2">JUDUL</th>
              <th className="border border-slate-300 text-sm sm:text-lg md:text-xl lg:text-3xl py-3 lg:py-2">STATUS</th>
              <th className="border border-slate-300 text-sm sm:text-lg md:text-xl lg:text-3xl py-3 lg:py-2">UPLOAD AT</th>
              <th className="border border-slate-300 text-sm sm:text-lg md:text-xl lg:text-3xl py-3 lg:py-2">MODIFY AT</th>
              <th className="border border-slate-300 text-sm sm:text-lg md:text-xl lg:text-3xl py-3 lg:py-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {artikel.map((artikel, index) => {
              // Mengonversi string ISO tanggal ke objek Date
              const createdAt = artikel.createdAt ? new Date(artikel.createdAt) : null;
              const updatedAt = artikel.updatedAt ? new Date(artikel.updatedAt) : null;

              // Format tanggal dan jam jika nilainya ada
              const formattedCreatedAt = createdAt
                ? createdAt.toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A";

              const formattedUpdatedAt = updatedAt
                ? updatedAt.toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A";

              return (
                <tr key={artikel._id}>
                  <td className="border border-slate-300 text-xs sm:text-sm md:text-base py-4">{index + 1}</td>
                  <td className="border border-slate-300 text-xs sm:text-sm md:text-base py-4">{artikel.judul}</td>
                  <td className="border border-slate-300 text-xs sm:text-sm md:text-base py-4">{artikel.isDraft === "draft" ? "Draft" : "Published"}</td>
                  <td className="border border-slate-300 text-xs sm:text-sm md:text-base py-4">{formattedCreatedAt}</td>
                  <td className="border border-slate-300 text-xs sm:text-sm md:text-base py-4">{formattedUpdatedAt}</td>
                  <td className="border border-slate-300 text-xs sm:text-sm md:text-base py-4">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/HomeAdmin/EditArtikel/${artikel._id}`} className="bg-emerald-500 text-white py-2 px-4">
                        Edit
                      </Link>
                      <button onClick={() => deleteArtikel(artikel._id)} className="bg-red-500 text-white py-2 px-4">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
