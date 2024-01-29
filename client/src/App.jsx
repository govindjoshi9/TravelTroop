import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/Account.jsx";
import Places from "./pages/Places.jsx";
import PlacesForm from "./pages/PlacesForm.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import BookingsPage from "./BookingsPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";

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
          <Route path="/account" element={<Account />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/booking" element={<BookingsPage />} />
          <Route path="/account/booking/:id" element={<BookingPage />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<PlacePage/>}/>

        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
