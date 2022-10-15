const Reference = ({Author, Name, URL}) => {
    let AuthorString = ""
    let LinkElement = ""
    let URLString = ""
    if (Name !== undefined && URL !== undefined){
        LinkElement = <span><a href={URL}>{Name}</a></span>
    }else if (Name === undefined && URL !== undefined){
        LinkElement = <span><a href={URL}>{URL}</a></span>
    }else if (Name !== undefined && URL === undefined){
        LinkElement = <span>{Name}</span>
    }
    if (Author !== undefined){
        if (LinkElement !== ""){
            AuthorString = <span className="Author">{Author} at </span>
        }else{
            AuthorString = <span className="Author">{Author}</span>
        }
    }
    return (
        <p className="Reference">From {AuthorString}{LinkElement}</p>
    );
  };
  
  export default Reference;