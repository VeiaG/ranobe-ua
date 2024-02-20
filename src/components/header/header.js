import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import useTheme from "../../hooks/useTheme";
const Header =()=>{
    const [theme,toggleTheme] = useTheme();
    return <div className="header">
        <div className="header__wrapper">
            <Link to="/">RanobeUA</Link>
            <Link to="search">Пошук</Link>
            <i onClick={toggleTheme} className={`bi bi-lightbulb${ theme === "light" ? '-fill' : ''}`}></i>
        </div>
    </div>
}
export default Header;