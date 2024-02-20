import React, { useState ,useEffect} from "react";
import "./readPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchJSON from "../fetchLib";
import Select from 'react-select'
const PageArrows =({page, aboutBook})=>{
    return <>
      {parseInt(page) !== 1  ?
        <Link to={`../${parseInt(page)-1}`} relative="path" >
          <i className="bi bi-arrow-left"></i>
        </Link> : 
        <i className="bi bi-arrow-left inactive" ></i> }
      {parseInt(aboutBook?.pages?.length) !== parseInt(page) ? 
        <Link to={`../${1+parseInt(page)}`} relative="path"> 
          <i className="bi bi-arrow-right"></i>
        </Link> : 
        <i className="bi bi-arrow-right inactive"></i> }
    </>
}

const ReadHeader = ({page, aboutBook})=>{
    const navigate =useNavigate();

    const [selectedPage,setSelectedPage] = useState({
      value : parseInt(page),
      label : `Глава ${page} : ${aboutBook?.pages?.[parseInt(page)-1]}`
    });
    const options = aboutBook?.pages?.map((val,i)=>{
      return {
        value: i+1,
        label: `Глава ${i+1} : ${val}`
      }
    })
    
    const onChangeSelect = (newVal) =>{
      navigate(`../${parseInt(newVal.value)}`,{relative:"path" });
      setSelectedPage(newVal);
    }

    useEffect(()=>{
      setSelectedPage({
        value : parseInt(page),
        label : `Глава ${page} : ${aboutBook?.pages?.[parseInt(page)-1]}`
      });
    },[page,aboutBook])

    const colors = {
      /*
       * multiValue(remove)/color:hover
       */
       danger: 'var(--primary-500)',
     
      /*
       * multiValue(remove)/backgroundColor(focused)
       * multiValue(remove)/backgroundColor:hover
       */
       dangerLight: 'var(--accent-700)',
     
      /*
       * control/backgroundColor
       * menu/backgroundColor
       * option/color(selected)
       */
       neutral0: 'var(--background-50)',
     
      /*
        * control/backgroundColor(disabled)
       */
       neutral5: 'var(--text-950)',
     
      /*
       * control/borderColor(disabled)
       * multiValue/backgroundColor
       * indicators(separator)/backgroundColor(disabled)
       */
       neutral10: 'var(--text-950)',
     
      /*
       * control/borderColor
       * option/color(disabled)
       * indicators/color
       * indicators(separator)/backgroundColor
       * indicators(loading)/color
       */
       neutral20: 'var(--background-300)',
     
      /*
       * control/borderColor(focused)
       * control/borderColor:hover
       */
       neutral30: 'var(--background-400)',
     
      /*
       * menu(notice)/color
       * singleValue/color(disabled)
       * indicators/color:hover
       */
       neutral40: 'var(--text-950)',
     
      /*
       * placeholder/color
       */
       neutral50: 'var(--text-500)',
     
      /*
       * indicators/color(focused)
       * indicators(loading)/color(focused)
       */
       neutral60: 'var(--primary-500)',
     
       neutral70: 'var(--primary-600)',
     
      /*
       * input/color
       * multiValue(label)/color
        * singleValue/color
       * indicators/color(focused)
       * indicators/color:hover(focused)
       */
       neutral80: 'var(--text-900)',
     
       neutral90: 'var(--text-500)',
     
      /*
       * control/boxShadow(focused)
       * control/borderColor(focused)
       * control/borderColor:hover(focused)
       * option/backgroundColor(selected)
       * option/backgroundColor:active(selected)
       */
       primary: 'var(--primary-600)',
     
      /*
       * option/backgroundColor(focused)
       */
       primary25: 'var(--background-300)',
     
      /*
       * option/backgroundColor:active
       */
       primary50: 'var(--background-400)',
     
       primary75: 'var(--background-400)',
     };
    return <div className="readHeader">
      <div className="readHeader__wrapper">
        <PageArrows page={page} aboutBook={aboutBook}/>
        <Select options={options} isSearchable={true} 
          value={selectedPage} 
          onChange={onChangeSelect} 
          className="react-select-container"
          classNamePrefix="react-select"  theme={theme => ({
            ...theme,
            borderRadius: 0,
            colors
          })} />
      </div>
    </div>
}

const ReadPage =()=>{
    const [text,setText] = useState(`<div className="loaderWrapper"><span class="loader"></span></div>`);
    const [aboutBook,setAboutBook] = useState({});
    const {page,author,book,category} = useParams();
    console.log(aboutBook);
    //pageTextLoad
    useEffect(()=>{
        setText(`<div class="loaderWrapper"><span class="loader"></span></div>`);
        const errorCallBack = error => {
          setText(`<p>Помилка при завантажені сторінки , будь-ласка спробуйте знову.</p>`);
          
          console.error(error);
        }
        
        fetchJSON(`./books/${category}/${author}/${book}/pages/page${page}.page`,setText,{
          isText:true,
        },errorCallBack)
       
    },[page]);
    //aboutBookLoad
    useEffect(()=>{
      fetchJSON(`./books/${category}/${author}/${book}/about.json`,setAboutBook);
    },[book]);
    return <div className="read">
        <ReadHeader page={page} aboutBook={aboutBook}/>
        <div className="read__wrapper">
            <h1>{aboutBook?.pages?.[parseInt(page)-1]}</h1>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
            <div className="read__links">
              <PageArrows page={page} aboutBook={aboutBook}/>
            </div>

        </div>
        
    </div>
}
export default ReadPage;