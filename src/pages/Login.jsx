import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            navigate("/booking");
        } catch (err) {
            alert(err.message);
        }
    };

    const navigate = useNavigate();

    return (
        <form onSubmit={login} className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3>Login</h3>
            <input type="email" placeholder="Email" className="form-control my-2" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="form-control my-2" onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-success w-100" type="submit">Login</button>
        </form>
    );
};

export default Login;
