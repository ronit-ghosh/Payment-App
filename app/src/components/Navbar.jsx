import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <>
            <div className="w-full flex items-center justify-between px-5 py-4">
                <div className="text-2xl text-gray-300 font-bold">Dashboard</div>
                <button onClick={handleLogout} className="btn btn-outline btn-primary text-base">Log Out</button>
            </div>
        </>
    )
}

export default Navbar
