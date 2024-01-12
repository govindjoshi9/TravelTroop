import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
export default function loginPage() {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [redirect, setRedirect] = useState(false);
 const {setuser} = useContext(UserContext );
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} =await axios.post("/login", {
        email,
        password,
      });
      setuser(data)
      alert('login done')
      setRedirect(true);
    } catch (e) {
      alert("login faild");
    }
  }

  if (redirect) {
    return <Navigate to={'/'}/>
  }


  return (
    <div className="mt-4 grow flex item-center justify-around">
      <div className="mb-64">
        <h1 className="text-3xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Your@email.com"
            value={email}
            onChange={ev => setemail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={ev => setpassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
