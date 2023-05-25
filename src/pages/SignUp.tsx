import React, { useState } from "react";
import { ProjectHiveLogo } from "../AppIcons/appIcons";
import { Link, navigate } from "raviger";
import { login, signup } from "../utils/APIutils";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";
import { TeamIllustration } from "../AppIcons/illustrations";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (username === "") {
        setError("Please set a username");
        setLoading(false);
        return;
      }
      if (password1 === "") {
        setError("Please set a password");
        setLoading(false);
        return;
      }
      if (password2 === "") {
        setError("Please re-enter the password");
        setLoading(false);
        return;
      }
      if (password1 !== password2) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      await signup(username, password1, password2, email);
      const data = await login(username, password1);
      if (!data) {
        setError("Invalid credentials");
        setLoading(false);
      } else {
        localStorage.setItem("token", data.token);
        window.location.reload();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-gray-200 font-Lato">
      <div className="hidden md:flex bg-[#141418] w-[35%] rounded-xl flex-col pt-8 py-4 px-4 m-3 justify-between">
        <div className="flex gap-2 items-center">
          <ProjectHiveLogo className="w-8 h-8 stroke-white" />
          <h2 className="font-semibold tracking-widest">HIVE</h2>
        </div>
        <div>
          <h4 className="font-bold text-4xl mb-2 font-Montserrat">
            All your work in one place.
          </h4>
          <p className="font-light text-xl">
            The next evolution of team productivity and collaboration is here.
          </p>
        </div>
        <div className="bg-[#212128] rounded-lg pt-4 px-3">
          <TeamIllustration className="" />
          <h4 className="font-semibold text-xl relative bottom-6 text-center">
            Simplify work and get more done.
          </h4>
        </div>
      </div>
      <div className="flex flex-col py-8 px-8 w-full justify-between">
        <div>
          <h4 className="font-bold text-4xl font-Montserrat">Sign up</h4>
          <div className="flex gap-1 text-lg items-center mt-2">
            <p className="font-light ">Already have an account?</p>
            <Link href={"/signin"} className="font-normal text-purple-700">
              Sign in
            </Link>
          </div>
        </div>
        {loading ? (
          <LoadingIndiacator />
        ) : (
          <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
            {error.length > 0 && (
              <div className="px-2 py-1 rounded-md border-red-600 bg-red-100 text-red-600">
                {error}
              </div>
            )}
            <div className="w-full">
              <label htmlFor="username-field" className="font-semibold text-lg">
                Username
              </label>
              <input
                type="text"
                value={username}
                id="username-field"
                onChange={(event) => setUsername(event.target.value)}
                className="bg-[#141418] border border-purple-900 hover:border-purple-700 text-white focus:border-purple-700 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-700 focus:ring-1 rounded-md"
              />
            </div>
            <div className="w-full">
              <label htmlFor="name-field" className="font-semibold text-lg">
                Email
              </label>
              <input
                type="email"
                value={email}
                id="name-field"
                onChange={(event) => setEmail(event.target.value)}
                className="bg-[#141418] border border-purple-900 hover:border-purple-700 text-white focus:border-purple-700 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-700 focus:ring-1 rounded-md"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="password-field"
                className=" font-semibold text-lg"
              >
                Password
              </label>
              <input
                type="password"
                value={password1}
                id="password-field"
                onChange={(event) => setPassword1(event.target.value)}
                className="bg-[#141418] border border-purple-900 hover:border-purple-700 text-white focus:border-purple-700 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-700 focus:ring-1 rounded-md"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="password-field"
                className=" font-semibold text-lg"
              >
                Re-enter password
              </label>
              <input
                type="password"
                value={password2}
                id="password-field"
                onChange={(event) => setPassword2(event.target.value)}
                className="bg-[#141418] border border-purple-900 hover:border-purple-700 text-white focus:border-purple-700 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-700 focus:ring-1 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-700 rounded-lg text-white font-normal px-8 py-2 mt-4 tracking-wider w-fit"
            >
              Sign up
            </button>
          </form>
        )}
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
