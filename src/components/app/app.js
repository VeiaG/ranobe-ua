import React from "react";
import ReadPage from "../readPage/readPage";
import MainPage from "../mainPage/mainPage";
import BookPage from "../bookPage/bookPage";
import Header from "../header/header";
import {BrowserRouter,Routes,Route, HashRouter} from "react-router-dom";
import ScrollToTop from "../scrollToTop";
import SearchPage from "../searchPage/searchPage";

const App =()=>{
    return <HashRouter>
        <ScrollToTop/>
        <div className="app">
            <Header></Header> 
            <Routes>
                
                <Route path="/" element={<MainPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/:category/:author/:book/" element={<BookPage/>}/>
                <Route path="/:category/:author/:book/:page" element={<ReadPage/>}/>
                
            </Routes>
        </div>
    </HashRouter>
}
export default App;
