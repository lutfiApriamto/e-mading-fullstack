import { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditArtikel() {
    const [judul, setJudul] = useState("");
    const [desc, setDesc] = useState("");
    const [isDraft, setIsDraft] = useState("draft");
    const [gambar, setGambar] = useState(null); // State untuk file gambar baru
    const [gambarPreview, setGambarPreview] = useState(null); // State untuk preview gambar lama
    const [isLoading, setIsLoading] = useState(false); // State untuk loading
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getArtikelById();
    }, []);

    const getArtikelById = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/artikel/${id}`);
            console.log(response.data); // Debugging untuk memastikan respons

            setJudul(response.data.judul);
            setDesc(response.data.desc);
            setIsDraft(response.data.isDraft);
            
            // Pastikan path gambar yang diterima dari API sudah benar
            const imagePath = response.data.gambar;
            if (imagePath) {
                setGambarPreview(`http://localhost:3000${imagePath}`);
                console.log(imagePath)
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Validasi sebelum submit
    const validateForm = () => {
        if (!judul || !desc) {
            alert("Judul dan Deskripsi tidak boleh kosong");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop jika validasi gagal
        }

        setIsLoading(true); // Set loading state menjadi true saat mulai submit

        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('desc', desc);
        formData.append('isDraft', isDraft);
        if (gambar) {
            formData.append('gambar', gambar); // Tambahkan gambar baru jika diubah
        }

        try {
            await axios.patch(`http://localhost:3000/artikel/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert('Artikel Berhasil diupdate');
            navigate("/HomeAdmin/listArtikel");
        } catch (error) {
            alert(error.response.data.message || 'Terjadi kesalahan');
            console.log(error);
        } finally {
            setIsLoading(false); // Kembalikan loading state menjadi false setelah submit selesai
        }
    };

    return (
        <>
            <Navbar />
            <div className="h-[100vh] flex flex-col justify-center items-center">
                <form className="bg-slate-200 flex flex-col p-20 border-2 border-black shadow-lg rounded-lg gap-5" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-10 text-3xl font-bold">Edit Artikel</h1>
                    <div className="flex flex-col">
                        <label htmlFor="judul">Judul Artikel</label>
                        <input type="text" className="border" id="judul" name="judul" value={judul} onChange={(e) => setJudul(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="desc">Isi Artikel</label>
                        <textarea name="desc" id="desc" className="bg border" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label htmlFor="isDraft">Status Artikel</label>
                        <select
                            name="select"
                            id="isDraft"
                            value={isDraft}
                            onChange={(e) => setIsDraft(e.target.value)}
                        >
                            <option value="draft">Draft</option>
                            <option value="upload">Upload</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="gambar">Upload Gambar Baru (Opsional)</label>
                        <input type="file" className="border" id="gambar" name="gambar" onChange={(e) => setGambar(e.target.files[0])} />
                        
                        {/* Preview gambar lama */}
                        {gambarPreview && !gambar && (
                            <div>
                                <p>Gambar saat ini:</p>
                                <img src={gambarPreview} alt="Gambar saat ini" width="200" />
                            </div>
                        )}
                        
                        {/* Preview gambar baru jika dipilih */}
                        {gambar && (
                            <div>
                                <p>Gambar baru:</p>
                                <img src={URL.createObjectURL(gambar)} alt="Gambar baru" width="200" />
                            </div>
                        )}
                    </div>
                    <button type="submit" className="bg-emerald-400" disabled={isLoading}>
                        {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </form>
            </div>
        </>
    );
}
