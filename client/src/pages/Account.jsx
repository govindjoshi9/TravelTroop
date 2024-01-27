import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./Places";
import AccountNav from "./AccountNav";

export default function Account() {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setuser } = useContext(UserContext);
  let { subPage } = useParams();
  if (subPage === undefined) {
    subPage = "profile";
  }

 async function logout() {
   await axios.post('/logout')
   setRedirect('/')
   setuser(null);
  }
  if (!ready) {
    return "Loading....";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }


  
  if (redirect) {
    return <Navigate to={redirect}/>
  }

  return (
    <div>
      <AccountNav/>
      {subPage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subPage === "places" && <Places />}
    </div>
  );
}
