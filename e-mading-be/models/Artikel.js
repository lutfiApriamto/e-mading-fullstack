import mongoose from "mongoose";

const ArtikelSchema = new mongoose.Schema({
    judul: { type: String, required: true },
    desc: { type: String, required: true },
    isDraft: { type: String, required: true },
    gambar: { type: String }, // Field untuk menyimpan URL gambar
    createdAt: { type: Date, default: Date.now }, // Menyimpan waktu pembuatan artikel
    updatedAt: { type: Date }, // Menyimpan waktu saat artikel di-update
});

const ArtikelModel = mongoose.model("Artikel", ArtikelSchema);

ArtikelModel.init().then(() => {
    console.log("index created");
}).catch(err => console.log("Error creating Index: ", err));

export { ArtikelModel as Artikel };
