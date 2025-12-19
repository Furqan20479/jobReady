import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/doLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.ok) {
        console.log(data.message);

        // ✅ Redirect after 3 seconds
        // setTimeout(() => {
        navigate(`/profile/${data.userEmail.sessionID}`);
        // }, 3000);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login Form
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">Not registered yet?</p>

          <Link to="/register">
            <button className="w-full mt-2 border border-blue-500 text-blue-600 py-3 rounded-xl font-semibold">
              Register Here
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
