import express from 'express';
import dotenv from 'dotenv';
import { Artikel } from '../models/Artikel.js';
import multer from 'multer'; // Library untuk upload gambar
import path from 'path';
import fs from 'fs'; // Untuk file system (menghapus file)
dotenv.config();

const router = express.Router();

// Konfigurasi multer untuk upload gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder tempat menyimpan gambar
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Penamaan file berdasarkan timestamp
    }
});
const upload = multer({ storage: storage });

// Route untuk mengambil semua artikel
router.get("/getArtikel", async (req, res) => {
    try {
        const artikel = await Artikel.find();
        res.json(artikel);
    } catch (error) {
        console.log(error);
    }
});

// Route untuk mengambil artikel berdasarkan ID
router.get("/:id", async (req, res) => {
    try {
        const artikel = await Artikel.findById(req.params.id);
        res.json(artikel);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }
});

// Route untuk menambah artikel (dengan gambar)
router.post('/addArtikel', upload.single('gambar'), async (req, res) => {
    const { judul, desc, isDraft } = req.body;
    const gambar = req.file ? `/uploads/${req.file.filename}` : null; // Menyimpan URL gambar

    const artikel = new Artikel({
        judul, 
        desc, 
        isDraft, 
        gambar
    });

    try {
        const insertArtikel = await artikel.save();
        res.status(201).json(insertArtikel);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "terjadi kesalahan saat menambah artikel" });
    }
});

// Route untuk update artikel (dengan gambar)
router.patch('/:id', upload.single('gambar'), async (req, res) => {
    try {
        const artikel = await Artikel.findById(req.params.id);

        if (!artikel) {
            return res.status(404).json({ message: 'Artikel tidak ditemukan' });
        }

        // Jika ada gambar baru yang di-upload, hapus gambar lama
        if (req.file) {
            if (artikel.gambar) {
                fs.unlink(`./${artikel.gambar}`, (err) => {
                    if (err) {
                        console.log('Gagal menghapus gambar lama:', err);
                    } else {
                        console.log('Gambar lama berhasil dihapus');
                    }
                });
            }

            // Ganti gambar lama dengan gambar baru
            artikel.gambar = `/uploads/${req.file.filename}`;
        }

        // Update data artikel lainnya
        artikel.judul = req.body.judul || artikel.judul;
        artikel.desc = req.body.desc || artikel.desc;
        artikel.isDraft = req.body.isDraft || artikel.isDraft;
        artikel.updatedAt = new Date();

        const updatedArtikel = await artikel.save();
        res.status(200).json(updatedArtikel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate artikel' });
    }
});

// Route untuk menghapus artikel
router.delete('/:id', async (req, res) => {
    try {
        const artikel = await Artikel.findById(req.params.id);

        if (!artikel) {
            return res.status(404).json({ message: 'Artikel tidak ditemukan' });
        }

        // Hapus gambar terkait jika ada
        if (artikel.gambar) {
            fs.unlink(`./${artikel.gambar}`, (err) => {
                if (err) {
                    console.log('Gagal menghapus gambar:', err);
                } else {
                    console.log('Gambar berhasil dihapus');
                }
            });
        }

        await Artikel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Artikel berhasil dihapus" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Terjadi kesalahan saat menghapus artikel" });
    }
});

export { router as ArtikelRouter };
