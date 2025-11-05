import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          withCredentials: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.status == "Login successfully!") {
        console.log("Successfully Logged In", data.userObject.email.split('@')[0]);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else if (
        data.status == "No user found .." ||
        data.status == "Wrong Credentials" ||
        data.status == "Login Problem"
      ) {
        setError(data.status);
      } else {
        setError(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 h-screen max-w-lg mx-auto pb-40">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="pl-3 font-mono font-bold" htmlFor="Email">
          Email Address :{" "}
        </label>
        <input
          type="email"
          className="border py-2 px-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <label className="pl-3 font-mono font-bold" htmlFor="Password">
          Password :{" "}
        </label>
        <input
          type="password"
          className="border px-3 py-2 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-slate-700 mt-5 active:scale-95 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Login;
