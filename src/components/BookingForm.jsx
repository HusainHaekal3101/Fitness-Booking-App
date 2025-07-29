import { useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const clubs = ["Legends KL", "Legends PJ", "Legends Melaka", "Legends Penang", "Legends Sabah", "Legends Johor"];
const classes = ["HIIT", "Zumba", "Boxing", "Yoga", "Pilates", "Strength"];
const trainers = ["Coach Lisa", "Coach Amir", "Coach Jenny", "Coach Daniel", "Coach Sarah", "Coach Raj"];
const times = ["07:00 AM", "09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "08:00 PM"];

const BookingForm = ({ onBookingSuccess }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        club: "",
        className: "",
        instructor: "",
        date: "",
        time: "",
        phone_number: "",
        email: "",
        user_id: ""
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setForm((prev) => ({
                    ...prev,
                    email: user.email,
                    user_id: user.uid
                }));
            }
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: form.className,
            description: `${form.className} at ${form.club} with ${form.instructor}`,
            date: form.date,
            time: form.time,
            phone_number: form.phone_number,
            email: form.email,
            instructor: form.instructor,
            user_id: form.user_id
        };

        try {
            await axios.post("https://1762d50c-449e-4843-b275-9dd754e42424-00-3vee5g0j07kp2.pike.replit.dev/bookings", payload);
            alert("Booking successful!");
            setForm({
                club: "", className: "", instructor: "", date: "", time: "",
                phone_number: "", email: "", user_id: ""
            });

            if (onBookingSuccess) {
                onBookingSuccess();
            }
        } catch (err) {
            console.error("Booking failed:", err);
            alert("Booking failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="row g-3">
                <div className="col-md-6">
                    <select name="club" className="form-select" value={form.club} onChange={handleChange} required>
                        <option value="">Select Club</option>
                        {clubs.map((club, idx) => (
                            <option key={idx} value={club}>{club}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <select name="className" className="form-select" value={form.className} onChange={handleChange} required>
                        <option value="">Select Class</option>
                        {classes.map((cls, idx) => (
                            <option key={idx} value={cls}>{cls}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <select name="instructor" className="form-select" value={form.instructor} onChange={handleChange} required>
                        <option value="">Select Trainer</option>
                        {trainers.map((trainer, idx) => (
                            <option key={idx} value={trainer}>{trainer}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <input type="date" name="date" className="form-control" value={form.date} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <select name="time" className="form-select" value={form.time} onChange={handleChange} required>
                        <option value="">Select Time</option>
                        {times.map((time, idx) => (
                            <option key={idx} value={time}>{time}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <input type="text" name="phone_number" className="form-control" placeholder="Phone Number" value={form.phone_number} onChange={handleChange} required />
                </div>

                <div className="col-12 text-center">
                    <button className="btn btn-success mt-2" type="submit">📅 Book Class</button>
                </div>
            </div>
        </form>
    );
};

export default BookingForm;
