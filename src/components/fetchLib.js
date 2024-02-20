function hyphenToSpace(str) {           
  return str.replace(/-/g, ' ');
}

const fetchJSON = (adress , callback, options={
    isText:false , 
  },errorCallback =(error)=>{
    console.error(error)
  })=>{
  fetch(hyphenToSpace(adress))
        .then(response => {
            if (!response.ok) {
              throw new Error(`Помилка при отриманні файлу. HTTP status code: ${response.status}`);
            }
            if(options.isText){
              return response.text();
            }
            return response.json();
          })
          .then(content => {
            callback(content);
          })
          .catch((error)=>{
            errorCallback(error);
          });
}
export default fetchJSON;