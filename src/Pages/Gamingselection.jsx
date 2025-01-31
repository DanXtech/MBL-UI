import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo1.png";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FaBaseballBall } from "react-icons/fa";

const GameSection = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [colorIndex, setColorIndex] = useState(0);
    const [team, setTeam] = useState("");
    const [player, setPlayer] = useState("");
    const [language, setLanguage] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const colors = ["#22c55e", "#3b82f6", "#eab308", "#ef4444", "#a855f7", "#f97316"];

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % colors.length);
        }, 1000); // Change color every second

        return () => clearInterval(interval);
    }, [colors.length]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    const handleStartGame = () => {
        setOpenModal(true); // Open the modal
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Close the modal
    };

    return (
        <div className="game-section min-h-screen bg-gray-100">
            {/* Header Section */}
            <header className="flex items-center justify-between px-5 py-3 lg:py-0 bg-gray-900 text-white">
                <Link to="/">
                    <img src={Logo} className="lg:w-28 w-20" alt="Logo" />
                </Link>
                <div className="flex items-center gap-3">
                    <img
                        className="rounded-full w-10 h-10 object-cover"
                        src={user?.photoURL || "https://via.placeholder.com/40"}
                        alt="Profile"
                    />
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
                        >
                            Login
                        </button>
                    )}
                </div>
            </header>

            {/* Main Section */}
            <main className="flex flex-col items-center py-5 lg:py-16 px-4 relative">
                <h1 className="text-2xl lg:text-4xl font-semibold text-gray-800 mb-4 text-center">
                    Welcome back, {user?.displayName || "Guest"}!
                </h1>
                <h2 className="text-xl text-gray-600 mb-5 lg:mb-8 text-center">
                    Select your options to start playing your games
                </h2>

                {/* Card Section */}
                <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Favorite Teams */}
                        <Box sx={{ m: 1, width: "100%" }}>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="team-native">
                                    Select favorite teams
                                </InputLabel>
                                <NativeSelect
                                    value={team}
                                    onChange={(e) => setTeam(e.target.value)}
                                    inputProps={{
                                        name: "team",
                                        id: "team-native",
                                        "aria-label": "Select favorite teams",
                                    }}
                                >
                                    <option value="" disabled>
                                        Select favorite teams
                                    </option>
                                    <option value="Kevin De Bruyne">Kevin De Bruyne</option>
                                    <option value="Rodri">Rodri</option>
                                    <option value="Erling Haaland">Erling Haaland</option>
                                    <option value="Mohamed Salah">Mohamed Salah</option>
                                    <option value="Aaron Judge">Aaron Judge</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>

                        {/* Favorite Players */}
                        <Box sx={{ m: 1, width: "100%" }}>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="player-native">
                                    Select favorite players
                                </InputLabel>
                                <NativeSelect
                                    value={player}
                                    onChange={(e) => setPlayer(e.target.value)}
                                    inputProps={{
                                        name: "player",
                                        id: "player-native",
                                        "aria-label": "Select favorite players",
                                    }}
                                >
                                    <option value="" disabled>
                                        Select favorite players
                                    </option>
                                    <option value="Player 1">Player 1</option>
                                    <option value="Player 2">Player 2</option>
                                    <option value="Player 3">Player 3</option>
                                    <option value="Player 4">Player 4</option>
                                    <option value="Player 5">Player 5</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>

                        {/* Language */}
                        <Box sx={{ m: 1, width: "100%" }}>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="language-native">
                                    Select a language
                                </InputLabel>
                                <NativeSelect
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    inputProps={{
                                        name: "language",
                                        id: "language-native",
                                        "aria-label": "Select a Language",
                                    }}
                                >
                                    <option value="" disabled>
                                        Select a language
                                    </option>
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Japanese">Japanese</option>
                                </NativeSelect>
                            </FormControl>
                        </Box>
                    </div>

                    <button
                        onClick={handleStartGame}
                        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md text-lg font-medium transition duration-300"
                    >
                        Start your game
                    </button>
                </div>

                {/* Modal */}

                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <h2 id="modal-title" className="text-xl font-semibold mb-4">
                            User Information
                        </h2>
                        <p className="text-gray-700 mb-2">
                            <strong>Name:</strong> {user?.displayName || "Guest"}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Email:</strong> {user?.email || "Not Available"}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Favorite Team:</strong> {team || "Not Selected"}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <strong>Favorite Player:</strong> {player || "Not Selected"}
                        </p>
                        <p className="text-gray-700">
                            <strong>Language:</strong> {language || "Not Selected"}
                        </p>
                        <Button
                            onClick={handleCloseModal}
                            className="mt-4"
                            variant="contained"
                            color="primary"
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>



                {/* Animated Icons */}
                <div className="absolute bottom-20 left-8 text-5xl hidden lg:block">
                    <FaBaseballBall style={{ color: colors[colorIndex] }} className="animate-bounce" />
                </div>
                <div className="absolute top-12 right-8 text-5xl hidden lg:block">
                    <FaBaseballBall style={{ color: colors[(colorIndex + 2) % colors.length] }} className="animate-bounce" />
                </div>
            </main>
        </div>
    );
};

export default GameSection;
