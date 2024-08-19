import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { LuSendToBack } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSetRecoilState } from "recoil";
import { AuthAtom } from "../store/atom";
import CheckSignedin from "../config/CheckSignedin";
import { FaCheckCircle } from "react-icons/fa";

const SendMoney = () => {
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [details, setDetails] = useState({})
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const URL = import.meta.env.VITE_REACT_APP_HOSTED_URL
    const token = localStorage.getItem('token')

    async function handlePayment() {
        try {
            setLoading(true)
            if (!amount) {
                toast.error("Enter Amount!")
                setLoading(false)
                return
            }
            const response = await axios.post(`${URL}/api/v1/account/transfer`, { amount, to: id }, { headers: { "Authorization": `Bearer ${token}` } })
            toast.success(response.data.msg)
            setDetails(response.data)
            console.log(response.data)
            setAmount('')
            setIsCompleted(true)
            setLoading(false)
        } catch (error) {
            setLoading(true)
            setIsCompleted(false)
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
            <div className="flex flex-col items-center gap-4 h-[100dvh] w-full bg-[#111827]">
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
                <div className={`${!openModal ? "hidden" : "block"} sm:w-[484px] w-full h-[164px] absolute top-20 bg-[#111827] border border-gray-800 rounded-lg shadow-md text-gray-300 p-4 grid`}>
                    <div className="flex items-center gap-3">
                        <FaCheckCircle fontSize={30} color="#6dce3b" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-emerald-400">Transferred Successfully</span>
                    </div>
                    <span className="mt-3 capitalize">Sent to: {name}</span>
                    <span>Amount: ₹{details.amount}</span>
                    <button className="btn btn-outline w-16 place-self-end" onClick={() => setOpenModal(false)}>Close</button>
                </div>
                <div className="text-4xl font-extrabold text-gray-200 mb-10 mt-40">Transfer Funds</div>
                <div className="flex flex-col gap-3 ">
                    <p className="text-gray-300 text-lg capitalize">Name: {name}</p>
                    <input
                        id="username"
                        type="Number"
                        required
                        value={amount}
                        placeholder="₹ - Enter Amount"
                        className="input input-bordered input-primary w-full max-w-xs bg-transparent text-gray-300"
                        onChange={(e) => setAmount(e.target.value)} />
                    <button onClick={handlePayment} className={`mt-4 btn ${loading ? 'btn-disabled' : 'btn-primary'}`}>
                        {loading ? <span className="loading loading-spinner text-blue-600"></span> : <span className="flex items-center gap-2 font-bold text-lg">Transfer <LuSendToBack /></span>}
                    </button>
                    <button className={`${!isCompleted ? "hidden" : "block"} btn btn-outline btn-primary`}
                        onClick={() => setOpenModal(true)}
                    >See Transaction Details</button>
                    <Link to='/dashboard' className="w-full flex items-center justify-center">
                        <button className="btn btn-outline btn-primary text-base">Go to Dashboard</button>
                    </Link>
                </div>
            </div >
        </>
    )
}

export default SendMoney
