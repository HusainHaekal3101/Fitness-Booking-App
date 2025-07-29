import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("https://1762d50c-449e-4843-b275-9dd754e42424-00-3vee5g0j07kp2.pike.replit.dev/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/booking"
          element={
            user ? (
              <div className="container mt-4">
                <BookingForm
                  user={user}
                  onBookingSuccess={fetchBookings}
                />
                <BookingList bookings={bookings} onBookingSuccess={fetchBookings} />
              </div>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
