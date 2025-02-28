import express from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/getAdmins', async (req, res) => {
    try {
        const admins = await Admin.find();
        return res.status(200).json({message : "berhasil mendapatkan data admin", status : true ,admins})
    } catch (error) {
        console.log(error)
    }
})

router.post('/loginAdmin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: "Username atau password salah" });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Username atau Password Salah" });
        }

        const token = jwt.sign({ username: admin.username }, process.env.KEY, { expiresIn: '3h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
        return res.status(200).json({ status: true, message: "Login Berhasil", token });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status : true})
})

export {router as AdminRouter}