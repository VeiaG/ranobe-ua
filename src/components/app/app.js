import React from "react";
import ReadPage from "../readPage/readPage";
import MainPage from "../mainPage/mainPage";
import BookPage from "../bookPage/bookPage";
import Header from "../header/header";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ScrollToTop from "../scrollToTop";
import SearchPage from "../searchPage/searchPage";
import ErrorPage from "../errorPage/errorPage";

const App =()=>{
    return <BrowserRouter>
        <ScrollToTop/>
        <div className="app">
            <Header></Header> 
            <Routes>
                
                <Route path="/" element={<MainPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route path="/:category/:author/:book/" element={<BookPage/>}/>
                <Route path="/:category/:author/:book/:page" element={<ReadPage/>}/>
                
            </Routes>
        </div>
    </BrowserRouter>
}
export default App;
