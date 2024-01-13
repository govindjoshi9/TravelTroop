import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/Account.jsx";

function App() {
  axios.defaults.baseURL = "http://127.0.0.1:8080";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<Account />} />
          <Route path="/account/:subPage" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
