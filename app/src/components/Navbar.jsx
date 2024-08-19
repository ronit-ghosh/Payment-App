import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { AuthAtom } from "../store/atom"

const Navbar = () => {
    const navigate = useNavigate()
    let isSignedin = useSetRecoilState(AuthAtom)
    function handleLogout() {
        localStorage.removeItem('token')
        navigate('/')
        isSignedin(false)
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
