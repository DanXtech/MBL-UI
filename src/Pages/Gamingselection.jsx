import React from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo1.png"
const GameSection = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };
    return (
        <div className="game-section">

            {/* header section */}
            <div className="flex items-center justify-between px-3 lg:px-5 py-4 bg-n-8/90 backdrop-blur-sm border-b">
                <div>

                    <Link to="/"> <img src={Logo} className='lg:w-24 w-24' alt="" /></Link>
                </div>
                <div className="flex items-center gap-2 inset-0 bg-[#1B1B2E] bg-opacity-90 px-3 py-1 rounded-full">
                    <img className="rounded-full w-10" src={user?.photoURL} alt="Profile" />

                    {user ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <button onClick={() => navigate("/login")}>Login</button>
                    )}
                </div>
            </div>


            {/* subsection */}
            <div className="flex items-center justify-center flex-col py-10">
                <div>
                    <h1 className="text-3xl">Welcome back {user?.displayName || "Guest"} !</h1>
                </div>

                <div className="">
                    <h2 className="text-2xl">  Select what the teams and start playing your games</h2>
                </div>
            </div>

        </div>
    );
};

export default GameSection;
