import { useRecoilValue, useSetRecoilState } from "recoil"
import { AuthAtom } from "../store/atom"
import { Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import CheckSignedin from "../config/CheckSignedin";

const PrivateRoute = () => {
    const [loading, setLoading] = useState(true);
    const isSignedIn = useRecoilValue(AuthAtom);
    const setAuth = useSetRecoilState(AuthAtom);

    useEffect(() => {
        CheckSignedin().then((authStatus) => {
            setAuth(authStatus);
            setLoading(false);
        });
    }, [setAuth]);

    if (loading) return <div className="h-[100dvh] w-full bg-[#111827] flex justify-center items-center"></div>

    return isSignedIn ? <Outlet /> : <Navigate to="/" replace={true} />
}

export default PrivateRoute
