import AuthImage from "../../assets/Red-and-Black-Monogram-Sports-Baseball-Club-Logo.png";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        country: ""
    });
    const [error, setError] = useState("");
    const { signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/playsection');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        setError("");
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.secondName) {
            setError("Please enter both first and second name.");
            return false;
        }
        if (!formData.email || !formData.email.includes("@")) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (!formData.phone) {
            setError("Please enter your phone number.");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }
        if (!formData.country) {
            setError("Please enter your country.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post("http://api.example.com/signup", {
                firstName: formData.firstName,
                secondName: formData.secondName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                country: formData.country,
            });
            console.log("User signed up:", response.data);
            // Assuming your auth context has a setUser function
            // setUser(response.data);
            navigate("/playsection");
        } catch (error) {
            setError(error.response?.data?.message || "Error signing up. Please try again.");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            setError("Error signing in with Google. Please try again.");
            console.error("Error signing in with Google:", error.message);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${AuthImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="min-h-screen w-full bg-black relative"
        >
            <div className="absolute inset-0 bg-[#1B1B2E] bg-opacity-90"></div>

            <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 lg:px-10 text-white py-5 lg:py-10">
                <h2 className="text-xl mb-4 text-center lg:text-3xl lg:mb-8 font-black uppercase">
                    Start your journey with baseball gaming championship
                </h2>

                <div className="flex items-center w-full max-w-lg lg:max-w-2xl">
                    <div className="w-full py-8 px-6 bg-[#2C2C44] bg-opacity-70 rounded-lg border-4">
                        <div className="flex items-center gap-3 pb-6">
                            <span className="bg-white h-10 w-10 rounded-full"></span>
                            <h3 className="text-xl lg:text-2xl font-bold capitalize">
                                Register to start playing with friends
                            </h3>
                        </div>

                        {error && (
                            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[60vh] lg:max-h-full scrollbar-none overflow-y-auto">
                            <div className="flex flex-col lg:flex-row gap-2">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="First Name"
                                    required
                                />
                                <input
                                    type="text"
                                    name="secondName"
                                    value={formData.secondName}
                                    onChange={handleChange}
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Second Name"
                                    required
                                />
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Enter Your Email"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Enter Your Number"
                                    required
                                />
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Enter Your Password"
                                    required
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Confirm Your Password"
                                    required
                                />
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2">
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Enter your country name"
                                    required
                                />
                            </div>

                            <p className="text-sm">
                                Have an account?{" "}
                                <Link to="/login" className="text-blue-400 hover:text-blue-300">
                                    <i>Login</i>
                                </Link>
                            </p>

                            <Button type="submit" className="border rounded-lg py-3 w-full text-sm lg:text-base">
                                Sign Up
                            </Button>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg w-full"
                            >
                                Sign in with Google Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
