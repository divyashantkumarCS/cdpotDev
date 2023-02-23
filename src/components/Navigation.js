import "../stylesheet/navigation.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import GoogleLoginLogics from "./GoogleLoginLogics";
import FacebookOauth from "./FacebookOauth";

function Navigation() {
    const [show, setShow] = useState(false);
    const [authBtn, setAuthBtn] = useState("");
    const [modalTitle, setModelTitle] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSignUp() {
        setShow(true);
        setAuthBtn("Sign Up");        
        handleModalTitle("Sign Up")
    }

    function handleLogin() {
        setShow(true);
        setAuthBtn("Login");        
        handleModalTitle("Login");
    }

    function handleModalTitle(parameter) {
        if(parameter === "Login") {
            setModelTitle("Please Login through your Credentials")
        }else {
            setModelTitle("Please Sign Up with your email or try Social Media Login");
        }
    }

    return (
        <>
            {/* {JSON.stringify(form)} */}
            <div className="navContainer">
                <div className="navLeftBlock">
                    <ul className="leftList">
                        <li><button>Home</button></li>
                    </ul>
                </div>
                <div className="navRightBlock">
                    <ul className="rightList">
                        <li><Button onClick={handleSignUp}>Sign Up</Button></li>
                        <li><Button onClick={handleLogin}>Login</Button></li>
                    </ul>
                </div>

                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <GoogleLoginLogics /> 
                        <FacebookOauth/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        {
                            authBtn === "Login" ? 
                            <Button variant="primary" onClick={handleClose}>Login</Button> :
                            <Button variant="primary" onClick={handleClose}>Sign Up</Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Navigation