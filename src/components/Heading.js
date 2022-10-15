import VersionBar from "./VersionBar"
const Heading = ({H1, H2, H3, H4, Versions, Background}) => {
    let HElement = "";
    if (H1 !== undefined){
        HElement = <h1>{H1}</h1>
    }else if (H2 !== undefined){
        HElement = <h2>{H2}</h2>
    }else if (H3 !== undefined){
        HElement = <h3>{H3}</h3>
    }else if (H4 !== undefined){
        HElement = <h4>{H4}</h4>
    }
    return (
        <div className="Heading">
            {HElement}
            <VersionBar Versions={Versions} />
            <p>{Background}</p>
        </div>
    );
  };
  
  export default Heading;