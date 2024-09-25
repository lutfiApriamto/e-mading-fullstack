import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginAdmin () {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    axios.defaults.withCredentials = true
    const handleSubmit = (e) => {
        e.preventDefault();
        if(username === "" || password === "") {
            alert("Usernam Dan Password tidak Boleh Kosong")
        } else {
            axios.post('http://localhost:3000/admin/loginAdmin', {
                username, password
            })
            .then(response => {
                console.log(response)
                localStorage.setItem("token", response.data.token)
                alert('Berhasil Melakukan Login')
                navigate('/HomeAdmin')
            })
            .catch(err => {
                if (err.response && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Terjadi kesalahan saat login"); 
                }
                console.log(err)
            })
        }
    }

    return (
        <>
        <Link to={'/'} className=' fixed top-3 left-3 bg-slate-600 text-white font-bold text-xl py-3 px-6 rounded-xl shadow-xl'>Back To Home</Link>
            <section className="h-screen w-full flex justify-center items-center">
            <form  
            onSubmit={handleSubmit}
            className="p-4  rounded w-4/5 sm:w-1/2 lg:w-1/3 bg-slate-700">
                <h1 className="font-black text-center text-3xl italic mb-10 text-white">Login Admin</h1>
                <label htmlFor="username" className="w-full block font-bold text-xl text-white">Username</label>
                    <input
                        type="text"
                        placeholder="Username ..."
                        name='username'
                        id='username'
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-slate-500 w-full px-3 py-2 text-white rounded bg-opacity-90 mb-1"
                    />

                    <label htmlFor="password" className="w-full block font-bold text-xl text-white">Password</label>
                    <input
                        type="password"
                        placeholder="*******"
                        name='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-slate-500 w-full px-3 py-2 text-white rounded bg-opacity-90"
                    />
                    <button
                    type="submit"
                        className="bg-black w-full rounded text-center italic text-white py-1 mt-10 lg:py-2 lg:text-xl"
                    >
                        Login
                    </button>
            </form>
        </section>
        </>
    )
}