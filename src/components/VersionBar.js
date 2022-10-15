const VersionBar = ({Versions}) => {
    const style = {
        "background-color": "blue", /* Green */
        border: "none",
        color: "white",
        margin: "5px",
        padding: "3px",
        "text-align": "center",
        "text-decoration": "none",
        display: "inline-block",
        "font-size": "12px",
    }
    return (
        Versions.map((Version) => { 
            return (<button style={style}>{Version}</button>)}
        )
    );
  };
  
  export default VersionBar;