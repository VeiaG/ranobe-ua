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
            <button onClick={toggleTheme}>ToggleTheme</button>
        </div>
    </div>
}
export default Header;