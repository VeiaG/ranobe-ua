import React, {  useEffect, useState } from "react";
import { useParams, Link, } from "react-router-dom";
import fetchJSON from "../fetchLib";
import "./bookPage.scss";

const BookPage =()=>{
    const [info,setInfo] = useState({});
    const {author,book,category} = useParams();
    useEffect(()=>{ 
        fetchJSON(`./books/${category}/${author}/${book}/about.json`,setInfo)
    },[setInfo]);
    return <div className="bookPage">
            <div className="bookPage__wrapper">
                <div className="bookPage__info">
                        <img src={`./books/${info?.category}/${info?.author}/${info?.secondName}/cover.jpg`} 
                                alt="cover" />
                        <h1>{info?.name}</h1>
                        <h2>{info?.secondName}</h2>
                        <p>Автор: <Link>{info?.author}</Link></p>
                        <p>Кількість глав: {info?.pageCount}</p>
                        <p>Перекладено: {info?.pages?.length}</p>
                        <div className="bookPage__tags">
                        {info?.tags?.map((name,i)=>{
                                return <Link 
                                        key={i}
                                        to={`${i+1}`} 
                                        relative="path">{name}</Link>
                        })}
                        </div>
                </div>
                <div className="bookPage__description">
                        <p>{info?.about}</p>
                        <div className="bookPage__pagesList">
                                {info?.pages?.map((name,i)=>{
                                        return <Link 
                                                key={i}
                                                to={`${i+1}`} 
                                                relative="path">Глава {i+1} : {name}</Link>
                                })}
                        </div>
                </div>
        </div></div>
}
export default BookPage;