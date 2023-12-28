import React from "react";
import "./errorPage.scss";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({error})=>{
    const navigate = useNavigate();
    return <div className="errorPage">
        <div className="errorPage__wrapper">
            <h1>error PAGE</h1>
            <button onClick={()=>{
                navigate(-2);
            }}>back</button>
        </div>
    </div>
}
export default ErrorPage;