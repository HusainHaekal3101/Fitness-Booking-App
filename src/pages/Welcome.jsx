import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white">
            <h1 className="mb-4">🏋️‍♂️ Welcome to Legends Fitness</h1>
            <div>
                <Link to="/login" className="btn btn-outline-light mx-2">Login</Link>
                <Link to="/signup" className="btn btn-outline-light mx-2">Sign Up</Link>
            </div>
        </div>
    );
};

export default Welcome;
