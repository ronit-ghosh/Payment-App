import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSetRecoilState } from "recoil";
import { AuthAtom } from "../store/atom";
import CheckSignedin from "../config/CheckSignedin";

const Signin = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const URL = import.meta.env.VITE_REACT_APP_HOSTED_URL
    let isSignedin = useSetRecoilState(AuthAtom)

    async function handleSignin() {
        setLoading(true)
        try {
            const response = await axios.post(`${URL}/api/v1/user/signin`, { username, password })
            localStorage.setItem('token', response.data.token)
            isSignedin(true)
            navigate('/dashboard')
            toast.success("Logged In Successfully")
            setLoading(false)
            setUsername('')
            setPassword('')
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
            setUsername('')
            setPassword('')
        }
    }

    useEffect(() => {

        CheckSignedin().then((res) => {
            isSignedin(res)
        }).catch(error => console.log(error))

    }, [isSignedin])

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-4 h-[100dvh] w-full bg-[#111827]">
                <ToastContainer
                    position="top-center"
                    autoClose={1200}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition:Bounce
                />
                <div className="text-4xl font-extrabold text-gray-200 mb-10">Log In to Your Account</div>
                <input
                    type="text"
                    value={username}
                    required
                    placeholder="Username"
                    className="input input-bordered input-primary w-full max-w-xs bg-transparent text-gray-300"
                    onChange={(e) => setUsername(e.target.value)} />
                <input
                    type="password"
                    value={password}
                    required
                    placeholder="Password"
                    className="input input-bordered input-primary w-full max-w-xs bg-transparent text-gray-300"
                    onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSignin} className={`mt-4 btn ${loading ? 'btn-disabled' : 'btn-primary'}`}>
                    {loading ? <span className="loading loading-spinner text-blue-600"></span> : <span className="flex items-center gap-2 font-bold text-lg">Log In</span>}
                </button>
                <div className="text-gray-400">Don't have an account? <Link to='/signup' className="underline">Signup.</Link></div>
            </div>
        </>
    )
}

export default Signin
