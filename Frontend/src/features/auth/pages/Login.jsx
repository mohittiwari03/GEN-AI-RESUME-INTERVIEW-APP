import react, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Login() {

  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate()

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ email, password });
    if (success) {
      navigate("/")
    }
  };

  if(loading) {
    return(
      <main className="h-screen flex justify-center items-center">
        <h1>Loading....</h1>
      </main>
    )
  }

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center pb-10">
      <div className=" max-w-sm flex flex-col gap-4 ">
        <h1 className="h-full text-center text-4xl font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input className="border rounded-lg py-2 px-2"
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="email"
              placeholder="Enter Email address"
            />
          </div>

          <div className=" flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input className="border rounded-lg py-2 px-2  "
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button className=" duration-200 active:scale-95  bg-rose-600 rounded-lg hover:rounded-2xl outline-none border-none py-1">Login</button>
        </form>

        <p>
          Dont't have an account? <Link className="text-rose-600 no-underline " to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
