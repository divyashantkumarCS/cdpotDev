
import axios from "axios";

const adsCont = {
    width:"27%",
    border:"solid 1px black"    
}

function AdsDisplay() {

    const payload = {
        params : {
            client_id : '19327883413-h3c4402pt1g3can56igtoeivlj3422kn.apps.googleusercontent.com',
            response_type : "code",
            state : 'foobar',
            scope : 'https://www.googleapis.com/auth/userinfo.email',
            redirect_uri : 'http://localhost:3000/',
            prompt : "consent"
            // include_granted_scopes=true
        }
    }

    function callGoogleAuthorizationFunctionTogetAuthorizationCode() {
        axios.get(`https://accounts.google.com/o/oauth2/v2/auth?client_id=19327883413-h3c4402pt1g3can56igtoeivlj3422kn.apps.googleusercontent.com
                    &response_type=access_token
                    &state=foobar
                    &scope=https://www.googleapis.com/auth/userinfo.email
                    &redirect_uri=http://localhost:3000/
                    &prompt=consent
                    &include_granted_scopes=true`).then(res => {
            console.log(res);
        })
    }

    return (
        <div style={adsCont}>
            <h2 >Advertisment Posted</h2>
            <div>THIS IS ADVERTISMENT SECTION</div>
            <button onClick={callGoogleAuthorizationFunctionTogetAuthorizationCode}>Google login</button>
        </div>
    )
}

export default AdsDisplay;