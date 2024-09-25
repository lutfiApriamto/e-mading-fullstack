import { useState } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";

export default function TambahData() {
    const [judul, setJudul] = useState("");
    const [desc, setDesc] = useState("");
    const [isDraft, setIsDraft] = useState("draft");
    const [gambar, setGambar] = useState(null); // State untuk file gambar
    const [preview, setPreview] = useState(""); // State untuk preview gambar

    // Fungsi untuk menangani perubahan input file
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setGambar(file);
            setPreview(URL.createObjectURL(file)); // Generate preview URL dari file yang diupload
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('desc', desc);
        formData.append('isDraft', isDraft);
        formData.append('gambar', gambar); // Tambah gambar ke form data

        try {
            await axios.post("http://localhost:3000/artikel/addArtikel", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert('Artikel Berhasil ditambahkan');
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className=" h-[100vh] flex flex-col justify-center items-center">
                <form className="bg-slate-200 flex flex-col p-20 border-2 border-black shadow-lg rounded-lg gap-5" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-10 text-3xl font-bold">Tambah Artikel</h1>
                    <div className="flex flex-col">
                        <label htmlFor="judul">Judul Artikel</label>
                        <input 
                            type="text" 
                            className="border" 
                            id="judul" 
                            name="judul" 
                            onChange={(e) => setJudul(e.target.value)} 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="desc">Isi Artikel</label>
                        <textarea 
                            name="desc" 
                            id="desc" 
                            className="bg border" 
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
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
                        <label htmlFor="gambar">Upload Gambar</label>
                        <input 
                            type="file" 
                            className="border" 
                            id="gambar" 
                            name="gambar" 
                            onChange={handleImageChange} // Perubahan di sini untuk menangani upload gambar
                        />
                    </div>

                    {/* Bagian Preview Gambar */}
                    {preview && (
                        <div className="mt-4">
                            <h3>Preview Gambar:</h3>
                            <img src={preview} alt="Preview Gambar" className="max-w-xs max-h-64" />
                        </div>
                    )}

                    <button type="submit" className="bg-emerald-400">Simpan Perubahan</button>
                </form>
            </div>
        </>
    );
}
