import { Link } from "react-router-dom"
import landingSvg from "../assets/landing.svg"

const Landing = () => {
    return (
        <>
            <section className="text-gray-400 bg-gray-900 body-font h-[100dvh] flex">
                <div className="container mx-auto flex md:px-36 px-2 md:py-24 pt-24 md:flex-row flex-col items-center overflow-hidden">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font text-5xl mb-4 font-bold bg-clip-text text-transparent py-2 bg-gradient-to-r from-cyan-500 to-blue-500">Payments App</h1>
                        <p className="mb-10 leading-relaxed capitalize">Manage your transactions securely and easily with our payments app, featuring real-time tracking and support for multiple payment methods.</p>
                        <div className="flex justify-center gap-5">
                            <Link to={"/signin"}>
                            <button className="btn btn-primary btn-outline text-base px-8">Log In</button>
                            </Link>
                            <Link to={"/signup"}>
                            <button className="btn btn-outline text-base px-8">Sign up</button>
                            </Link>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 sm:w-1/2 w-80">
                        <img className="object-cover object-center rounded w-full" alt="hero" src={landingSvg} />
                    </div>
                </div>
            </section>
        </>
    )
}
export default Landing
