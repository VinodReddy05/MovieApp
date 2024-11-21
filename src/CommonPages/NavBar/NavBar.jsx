import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaTimes, FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [click, setClick] = useState(false); 
  const handleclick = () => {
    setClick(!click);
  };

  const [color, setColor] = useState(false);
  const handleColor = () => {
    if (window.scrollY >= 200) {  
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", handleColor); 


  return (
    <nav className=  {color ? "color" : ""} > 

      <div className="logo">
        <h1>Movie App</h1>
      </div>
      <div className= {click ? "menu active" : "menu"}>
        <Link to='/'>Home</Link>
        <Link to='/tvshows'>Tv Shows</Link>
        <Link to='/liveshows'>Live Shows</Link>
      </div>
      <div className="hamburger" onClick={handleclick}>
        {
          click ? <FaTimes style={{ color: "white" }} size={25} /> 
          : <FaBars style={{ color: "white" }} size={25} />
        }
      </div>
    </nav>
  );
};

export default Navbar;
