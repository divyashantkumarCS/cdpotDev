import AdsDisplay from "./AdsDisplay";
import PropertyDisplay from "./PropertyDisplay";

const containerStyle = {
    width:"100%",
    padding:"50px 50px",
    display:"flex",
    justifyContent:"space-between"
}

function BodyContainer(props) {
    
    return (
        <div style={containerStyle}>
            <PropertyDisplay/>
            <AdsDisplay/>
        </div>
    )
}

export default BodyContainer;