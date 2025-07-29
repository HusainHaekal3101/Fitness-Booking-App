import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created!");
            navigate("/booking");
        } catch (err) {
            alert(err.message);
        }
    };

    const navigate = useNavigate();

    return (
        <form onSubmit={signup} className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3>Sign Up</h3>
            <input type="email" placeholder="Email" className="form-control my-2" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="form-control my-2" onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary w-100" type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
