import { useEffect, useRef } from "react";
import AuthImage from "../../assets/Red-and-Black-Monogram-Sports-Baseball-Club-Logo.png";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      navigate("/playsection");
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Add your login logic here
    console.log("Logging in with email:", email);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${AuthImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-screen w-full bg-black relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1B1B2E] bg-opacity-90"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center p-4 lg:p-10 text-white  py-5 lg:py-10">
        <h2 className="text-xl mb-4 text-center lg:text-3xl lg:mb-8 font-black uppercase">
          Continue Playing Baseball Gaming Championship
        </h2>

        <div className="flex items-center w-full max-w-lg lg:max-w-2xl">
          <div className="w-full py-8 px-6 bg-[#2C2C44] bg-opacity-70 rounded-lg border-4">
            {/* Header */}
            <div className="flex items-center gap-3 pb-6">
              <span className="bg-white h-10 w-10 rounded-full"></span>
              <h3 className="text-xl lg:text-2xl font-bold capitalize">
                Welcome Back to MBL
              </h3>
            </div>

            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 h-[350px] lg:h-full overflow-y-auto scrollbar-none"
            >
              <div className="flex flex-col lg:flex-row gap-2">
                <input
                  ref={emailRef}
                  type="email"
                  className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                  placeholder="Enter Your Email"
                  required
                />
                <input
                  ref={passwordRef}
                  type="password"
                  className="bg-transparent border p-3 flex-1 rounded-lg text-sm lg:text-base"
                  placeholder="Enter Your Password"
                  required
                />
              </div>

              <p>
                Don't have an account?{" "}
                <Link to="/register" className="underline hover:text-blue-400">
                  <i>Register</i>
                </Link>
              </p>

              <Button
                type="submit"
                className="border rounded-lg py-3 w-full text-sm lg:text-base"
              >
                Login
              </Button>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg"
              >
                Login with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
