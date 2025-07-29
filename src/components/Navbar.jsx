import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Logo from "../logo/logo.png";

const Navbar = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    if (!user) return null;

    return (
        <nav className="navbar navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/booking">
                <img
                    src={Logo}
                    alt="Legends Fitness"
                    style={{ height: "70px", width: "60px", objectFit: "contain" }}
                />
            </Link>
            <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
