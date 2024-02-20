import React, { useEffect, useState } from "react";
import BookListItem from "../bookListItem/bookListItem";
import fetchJSON from "../fetchLib";
import "./mainPage.scss";
const MainPage =()=>{
    const [settings,setSettings] = useState({});
    useEffect(()=>{ 
        fetchJSON(`./books/settings.json`,setSettings);
    },[setSettings])
    return <div className="mainPage">
        <div className="mainPage__wrapper">
            <div className="mainPage__bookList">
                {settings?.books?.map((book,i)=>{
                    return <BookListItem key={i} info={book}/>
                })}
            </div>
        </div>
    </div>
}
export default MainPage;