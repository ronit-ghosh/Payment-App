import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSetRecoilState } from "recoil";
import { AuthAtom } from "../store/atom";
import CheckSignedin from "../config/CheckSignedin";

const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const URL = import.meta.env.VITE_REACT_APP_HOSTED_URL

    async function handleSignup() {
        setLoading(true)
        try {
            const response = await axios.post(`${URL}/api/v1/user/signup`, { username, firstName, lastName, email, password })
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')
            toast.success(response.data.msg)
            setLoading(false)
            setUsername('')
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
            setUsername('')
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
        }
    }

    let isSignedin = useSetRecoilState(AuthAtom)
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
                <div className="text-4xl font-extrabold text-gray-200 mb-10">Sign Up Your Account</div>
                <input
                    type="text"
                    value={username}
                    required
                    placeholder="Username"
                    className="input input-bordered input-primary w-full max-w-xs bg-transparent text-gray-300"
                    onChange={(e) => setUsername(e.target.value)} />
                <input
                    type="text"
                    value={firstName}
                    required
                    placeholder="First Name"
                    className="input input-bordered input-primary w-full max-w-xs bg-transparent text-gray-300"
                    onChange={(e) => setFirstName(e.target.value)} />
                <input
                    type="text"
                    value={lastName}
                    required
                    placeholder="Last Name"
                    className="input input-bordered input-primary w-full max-w-xs bg-transparent text-gray-300"
                    onChange={(e) => setLastName(e.target.value)} />
                <input
                    type="text"
                    value={email}
                    required
                    placeholder="Email"
                    className="input input-bordered input-primary w-full max-w-xs bg-transparent text-gray-300"
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    value={password}
                    required
                    placeholder="Password"
                    className="input input-bordered input-primary w-full max-w-xs bg-transparent text-gray-300"
                    onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSignup} className={`mt-4 btn ${loading ? 'btn-disabled' : 'btn-primary'}`}>
                    {loading ? <span className="loading loading-spinner text-blue-600"></span> : <span className="flex items-center gap-2 font-bold text-lg">Sign Up</span>}
                </button>
                <div className="text-gray-400">Already have an account? <Link to='/signin' className="underline">Login.</Link></div>
            </div>
        </>
    )
}

export default Signup
