// src/components/Navbar.js
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="text-lg font-bold">Weather App</div>
      <div>
        <Link to="/" className="mr-4 hover:underline">Home</Link>
        <Link to="/weather" className="hover:underline">Weather</Link>
      </div>
    </nav>
  );
}

export default Navbar;