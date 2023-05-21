import React, { useState } from "react";
import { ProjectHiveLogo } from "../AppIcons/appIcons";
import { Link, navigate } from "raviger";
import { login } from "../utils/APIutils";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-gray-200 font-Lato">
      <div className="bg-[#141418] w-[35%] rounded-xl flex flex-col py-8 px-4 m-3 justify-between">
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
        <div className="bg-[#212128] rounded-lg py-2 px-3">
          <h4 className="font-semibold text-lg">
            Simplify work and get more done.
          </h4>
          <p className="font-light text-md">
            Plan, track, and manage any type of work with project management
            that flexes to your team's needs.
          </p>
        </div>
      </div>
      <div className="flex flex-col py-8 px-8 w-full justify-between">
        <div>
          <h4 className="font-bold text-4xl font-Montserrat">Sign in</h4>
          <div className="flex gap-1 text-lg items-center mt-2">
            <p className="font-light ">Don't have an account?</p>
            <Link href={"/signup"} className="font-normal text-blue-700">
              Sign up
            </Link>
          </div>
        </div>
        <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
          <div className="w-full">
            <label htmlFor="username-field" className="font-semibold text-lg">
              Username
            </label>
            <input
              type="text"
              value={username}
              id="username-field"
              onChange={(event) => setUsername(event.target.value)}
              className="bg-gray-200 border border-blue-900 hover:border-blue-700 text-black focus:border-blue-700 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-blue-700 focus:ring-1 rounded-md"
            />
          </div>
          <div className="w-full">
            <label htmlFor="password-field" className=" font-semibold text-lg">
              Password
            </label>
            <input
              type="password"
              value={password}
              id="password-field"
              onChange={(event) => setPassword(event.target.value)}
              className="bg-gray-200 border border-blue-900 hover:border-blue-700 text-black focus:border-blue-700 w-full h-5 px-3 py-5 mb-2 hover:outline-none focus:outline-none focus:ring-blue-700 focus:ring-1 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-[#221ea8] rounded-lg text-white font-normal px-8 py-2 mt-4 tracking-wider w-fit"
          >
            Sign in
          </button>
        </form>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};