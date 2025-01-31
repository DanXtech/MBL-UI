import AuthImage from "../../assets/Red-and-Black-Monogram-Sports-Baseball-Club-Logo.png";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../../firebase";
import { useEffect, useState } from "react";

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is already logged in
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                navigate('/playsection');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                lastLogin: new Date().toISOString()
            }, { merge: true });

            // Navigate after successful sign in
            navigate('/playsection');
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    };

    // Rest of your component remains the same
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
            {/* Overlay for deep black effect */}
            <div className="absolute inset-0 bg-[#1B1B2E] bg-opacity-90"></div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 lg:px-10 text-white py-5 lg:py-10">
                <h2 className="text-xl mb-4 text-center lg:text-3xl lg:mb-8 font-black uppercase">
                    Start your journey with baseball gaming championship
                </h2>

                <div className="flex items-center w-full max-w-lg lg:max-w-2xl ">
                    <div className="w-full py-8 px-6 bg-[#2C2C44] bg-opacity-70 rounded-lg border-4">
                        {/* Form Header */}
                        <div className="flex items-center gap-3 pb-6">
                            <span className="bg-white h-10 w-10 rounded-full"></span>
                            <h3 className="text-xl lg:text-2xl font-bold capitalize">
                                Register to start playing with friends
                            </h3>
                        </div>

                        {/* Form Fields */}
                        <div className="flex flex-col gap-4 max-h-[60vh] lg:max-h-full scrollbar-none overflow-y-auto">
                            <div className="flex flex-col lg:flex-row gap-2">
                                <input
                                    type="text"
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="First Name"
                                    required
                                />
                                <input
                                    type="text"
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Second Name"
                                    required
                                />
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2">
                                <input
                                    type="email"
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Enter Your Email"
                                    required
                                />
                                <input
                                    type="number"
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Enter Your Number"
                                    required
                                />
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2">
                                <input
                                    type="password"
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Enter Your Password"
                                    required
                                />
                                <input
                                    type="password"
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Confirm Your Password"
                                    required
                                />
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2">
                                <input
                                    type="text"
                                    className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                                    placeholder="Enter your country name"
                                    required
                                />
                            </div>

                            <p>
                                Have an account?{" "}
                                <Link to="/login" className="underline hover:text-blue-400">
                                    <i>Login</i>
                                </Link>
                            </p>

                            {/* Submit Button */}
                            <Button className="border rounded-lg py-3 w-full text-sm lg:text-base">
                                Sign Up
                            </Button>

                            <button
                                onClick={handleGoogleSignIn}
                                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg w-full"
                            >
                                Sign in with Google Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;