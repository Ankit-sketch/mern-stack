import {  Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
                <Link to = "/signup">Signup</Link>
                <Link to = "/login">Login</Link>              
        </div>
    )
}

export default Navbar;
