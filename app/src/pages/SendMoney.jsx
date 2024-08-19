import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { LuSendToBack } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSetRecoilState } from "recoil";
import { AuthAtom } from "../store/atom";
import CheckSignedin from "../config/CheckSignedin";

const SendMoney = () => {
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
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
            setAmount('')
            setLoading(false)
        } catch (error) {
            setLoading(true)
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
                </div>
            </div>
        </>
    )
}

export default SendMoney
