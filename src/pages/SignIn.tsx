import React, { useState } from "react";
import { ProjectHiveLogo } from "../AppIcons/appIcons";
import { Link, navigate } from "raviger";
import { login } from "../utils/APIutils";
import { LoadingIndiacator } from "../components/common/LoadingIndicator";
import { TeamIllustration } from "../AppIcons/illustrations";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = await login(username, password);
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
          <h4 className="font-bold text-4xl font-Montserrat">Sign in</h4>
          <div className="flex gap-1 text-lg items-center mt-2">
            <p className="font-light ">Don't have an account?</p>
            <Link href={"/signup"} className="font-normal text-purple-700">
              Sign up
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
              <label
                htmlFor="password-field"
                className=" font-semibold text-lg"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                id="password-field"
                onChange={(event) => setPassword(event.target.value)}
                className="bg-[#141418] border border-purple-900 hover:border-purple-700 text-white focus:border-purple-700 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-purple-700 focus:ring-1 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-700 rounded-lg text-white font-normal px-8 py-2 mt-4 tracking-wider w-fit"
            >
              Sign in
            </button>
          </form>
        )}
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
