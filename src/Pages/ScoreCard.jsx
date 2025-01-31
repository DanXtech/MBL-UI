import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FaBaseballBall } from "react-icons/fa";
import { Link } from "react-router-dom";

const ScoreCard = () => {
    const [colorIndex, setColorIndex] = useState(0);

    const colors = ["#22c55e", "#3b82f6", "#eab308", "#ef4444", "#a855f7", "#f97316"];

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % colors.length);
        }, 1000); // Change color every second

        return () => clearInterval(interval);
    }, [colors.length]);
    return (
        <div className="min-h-screen bg-purple-100 ">
            <div className="p-5">
                <div className=" bg-green-500 shadow-lg rounded-lg w-10 p-2">
                    <Link to="/">
                        <ArrowBack className="text-6xl text-white cursor-pointer  " />
                    </Link>
                </div>

            </div>
            <div className="p-6  flex items-center  justify-center relative">

                <div className="flex flex-col gap-4 max-h-[70vh]  bg-transparent border-4 rounded-lg  border-white border-b-gray-900 border-b-8  p-5 lg:p-16 lg:max-h-full">

                    <h1 className="text-2xl font-bold text-purple-800 mb-4 text-center">Generate your score card for the game</h1>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter Team Name"
                            className="w-full p-3 border rounded-lg  focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Player 1"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Player 2"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                            {/* Add dynamic inputs for more players here */}
                        </div>
                        <button
                            type="submit"
                            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 w-full"
                        >
                            Generate Score Card
                        </button>
                    </form>


                </div>
                <div className="absolute lg:top-12 top-24 lg:text-7xl text-5xl">
                    <FaBaseballBall style={{ color: colors[colorIndex] }} className="animate-ping" />
                </div>

            </div>
        </div>

    );
};

export default ScoreCard;
