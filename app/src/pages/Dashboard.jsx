import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Userlist from "../components/Userlist"
import axios from "axios"

const Dashboard = () => {
    const [balance, setBalance] = useState(null)
    const [firstName, setFirstName] = useState('')
    const token = localStorage.getItem('token')
    const URL = import.meta.env.VITE_REACT_APP_HOSTED_URL

    useEffect(() => {
        axios.get(`${URL}/api/v1/account/balance`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                setBalance(response.data.balance)
                setFirstName(response.data.firstName)
            })
            .catch(err => console.log(err.response.data.msg))
    }, [token])

    return (
        <>
            <div className="overflow-y-auto bg-[#111827] h-[100dvh] w-full">
                <Navbar />
                <div className="text-gray-400 text-2xl whitespace-nowrap text-center mb-5 mt-3 capitalize">
                    <span className="font-bold bg-clip-text text-transparent py-2 bg-gradient-to-r from-cyan-500 to-blue-500 tracking-wider">Hey! {firstName},</span> Your Balance is ₹{balance}
                </div>
                <Userlist />
            </div>
        </>
    )
}

export default Dashboard
