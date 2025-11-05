import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
      {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    console.log(data);
    navigate("/login");
  };

  return (
    <div className="p-3 max-w-lg mx-auto pb-40">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="pl-3 font-mono font-bold" htmlFor="username">
          Username :{" "}
        </label>
        <input
          type="text"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleOnChange}
        />
        <label className="pl-3 font-mono font-bold" htmlFor="Email">
          Email :{" "}
        </label>
        <input
          onChange={handleOnChange}
          type="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <label className="pl-3 font-mono font-bold" htmlFor="password">
          Password :{" "}
        </label>
        <input
          onChange={handleOnChange}
          type="password"
          className="border p-3 rounded-lg"
          id="password"
        />

        <button
          type="submit"
          className="mt-5 bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign Up
        </button>
      </form>
      <div className="pl-2 flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to={"/login"}>
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
      {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
    </div>
  );
}
