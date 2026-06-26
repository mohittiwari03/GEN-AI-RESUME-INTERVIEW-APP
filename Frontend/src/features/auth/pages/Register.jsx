import React, {useState} from "react";
import {useNavigate, Link} from 'react-router'
import { useAuth } from "../hooks/useAuth";


function Register() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const {loading, handleRegister} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleRegister({ username, email, password})
    if (success) {
      navigate("/")
    }
  }

  if(loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    )
  }

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center pb-10">
      <div className=" max-w-sm flex flex-col gap-4">
        <h1 className="h-full text-center text-4xl font-bold" >Register</h1>

        <form className="flex flex-col gap-4 max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input className="border rounded-lg py-2 px-2
            " onChange={(e) => {
              setUsername(e.target.value)
            }} type="username" placeholder="Enter username" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input className="border rounded-lg py-2 px-2 " onChange={(e) =>{
              setEmail(e.target.value)
            }} type="email" placeholder="Enter Email address" />
          </div>

          <div className=" flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input className="border rounded-lg py-2 px-2" onChange={(e) => {
              setPassword(e.target.value)
            }} type="password" placeholder="Enter your password" />
          </div>

          <button className=" duration-200 active:scale-95  bg-rose-600 rounded-lg hover:rounded-2xl outline-none border-none py-1">Register</button>
        </form>

        <p>Already hane an account? <Link className="text-rose-600 no-underline " to={"/login"}>Login</Link></p>
      </div>
    </main>
  );
}

export default Register;
