import { TbListSearch } from "react-icons/tb";
import { RiSendPlane2Fill } from "react-icons/ri";
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

const Userlist = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('')
    const [debouncedFilter, setDebouncedFilter] = useState(filter);
    const token = localStorage.getItem('token')
    const URL = import.meta.env.VITE_REACT_APP_HOSTED_URL

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilter(filter);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [filter]);


    useEffect(() => {
        try {
            axios.get(`${URL}/api/v1/user/bulk?filter=${filter}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => setUsers(response.data.user))
        } catch (error) {
            console.log(error.response?.data?.msg || "Error Occured!")
        }
    }, [debouncedFilter])

    return (
        <>
            <div className="mx-4 lg:mx-60 flex gap-1 text-gray-300">
                <input onChange={(e) => setFilter(e.target.value)} type="text" name="searchbox" placeholder="Search Users..." className="bg-transparent input input-bordered input-primary w-full" />
                <button className="btn btn-primary"><TbListSearch fontSize={28} color="#111827" /></button>
            </div>

            <div className="text-gray-500 mx-1 lg:mx-44 mt-6">
                <table className="table text-center">
                    <thead className="border-gray-500">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.userId} className="text-gray-200 border-gray-600 text-base">
                                    <td className="capitalize">{user.firstName + ' ' + user.lastName}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        <button onClick={
                                            () => navigate(`/send?id=${user.userId}&name=${user.firstName + ' ' + user.lastName}`)
                                        } className="btn btn-primary text-base font-bold "> <span className="sm:block hidden">Pay</span> <RiSendPlane2Fill fontSize={20} color="#111827" /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Userlist
