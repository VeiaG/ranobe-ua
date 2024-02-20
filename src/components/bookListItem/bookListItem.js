import React from "react";
import {useNavigate} from "react-router-dom";
import "./bookListItem.scss";
function spacesToHyphen(str) {
    return str.replace(/\s/g, '-');
}



const BookListItem = ({info})=>{
    const navigate = useNavigate();
    return <div className="book" onClick={()=>{
        navigate(spacesToHyphen(`/${info?.category}/${info?.author}/${info?.secondName}`));
    }}>
        <div className="book__imageContainer">
            <img src={`./books/${info?.category}/${info?.author}/${info?.secondName}/cover.jpg`} 
                alt="cover" />
        </div>
        <div className="book__text">
            <h2>{info?.name}</h2>
            <h3>{info?.secondName}</h3>
        </div>
    </div>
}
export default BookListItem;