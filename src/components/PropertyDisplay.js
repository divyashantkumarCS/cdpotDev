import '../stylesheet/propertyDisplay.css';
import image from '../images/f1.jpg';
import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormData from 'form-data';

const porpCont = {
    width: "67%"
}

function PropertyDisplay() {
    const [property, setProperty] = useState();
    const [postedProperties, setPostedProperties] = useState([]);
    const [show, setShow] = useState(false);
    const form = new FormData();
    const imgform = new FormData();

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    function handleShow() {
        setShow(true);
    }

    function updateCheckboxPayload(e, key) {
        if (e.target.checked) {
            if (form.has(key)) {
                form.delete(key);
                form.append(key, e.target.value);
            } else {
                form.append(key, e.target.value);
            }
        } else {
            form.delete(key);
        }
        // if (e.target.checked) {
        //     const tempPayload = { ...payload };
        //     tempPayload[key] = e.target.value;
        //     setPayload(tempPayload);
        // } else {
        //     const tempPayload = { ...payload };
        //     delete (tempPayload[key]);
        //     setPayload(tempPayload);
        // }
    }

    function getFileData(key, arg) {
        imgform.append("image", arg);
        axios.post("https://api.imgbb.com/1/upload?key=6cdce9538ac788347e8765ff4ec3c4e7", imgform, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            console.log("RESPONSE DATA After uploaded to IMGBB cloud storage")
            console.log(res.data);
            form.append("imageData", res?.data?.data?.display_url);
        }).catch(e => {
            console.log(e.message);
        });
    }

    function updatePayload(e, key) {
        if (key === "file") {
            if (form.has(key)) {
                form.delete(key);
                for (let i = 0; i < e.target.files.length; i++) {
                    getFileData(i, e.target.files[i]);
                }
            } else {
                for (let i = 0; i < e.target.files.length; i++) {
                    getFileData(i, e.target.files[i]);
                }
            }
        } else {
            if (form.has(key)) {
                form.delete(key);
                form.append(key, e.target.value);
            } else {
                form.append(key, e.target.value);
            }
        }
    }

    function handleSubmit() {
        setShow(false);

        axios.post("http://localhost:9191/addProperty", form, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            console.log("RESPONSE DATA", res?.data?.data[0]);
            setProperty(res?.data?.data[0]);

            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of form) {
                form.delete(key);
            }
        }).catch(e => {
            console.log(e.message);
        });
    }

    function updateDisplay() {
        axios.get('http://localhost:9191/getAllProperties').then(res => {
            console.log("getAllProperties RESPONSE OBJECT", res);
            const data = res?.data?.data;
            setPostedProperties(data);
            console.log("PostedProperties", postedProperties);
        }).catch(e => {
            console.log(e.message);
        });
    }

    useEffect(() => {
        updateDisplay();
    }, [property]);


    return (
        <div style={porpCont}>
            <button className='postPropertyBtn' variant="primary" onClick={handleShow}>Post Property</button>
            
            <h2>Properties Posted</h2>
            {/* {JSON.stringify(property)} */}
            <div className="cardCont">
                {
                    postedProperties?.length > 0 ? postedProperties?.map((ele, i) => {
                        return (
                            <div className="displayCard" key={i}>
                                <div className='imgCont'>
                                    <Carousel slide={false}>
                                        {
                                            ele.imageData.length > 0 ? ele.imageData.map((element, idx) => {
                                                return (
                                                    <Carousel.Item key={idx}>
                                                        <img
                                                            className=""
                                                            src={element}
                                                            alt="First slide"
                                                        />
                                                        {/* <Carousel.Caption>
                                                                <h3>First slide label</h3>
                                                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                                            </Carousel.Caption>  */}
                                                    </Carousel.Item>
                                                )
                                            }) : (<img src={image} alt="Property" />)     
                                        }                                                
                                    </Carousel>
                                                
                                        
                                </div>
                                <div className='descCont'>
                                    <h3><u>porperty Details</u></h3>
                                    <div>
                                        <p>carpetArea : {ele.carpetArea}</p>
                                        <p>noOfBedrooms : {ele.noOfBedrooms}, &nbsp;&nbsp; noOfBathroom : {ele.noOfBathroom}</p>
                                        <p>noOfKithen : {ele.noOfKithen}</p>
                                        <p>lobby : {ele.lobby}, &nbsp;&nbsp; garden : {ele.garden}</p>
                                        <p>dinningArea : {ele.dinningArea}, &nbsp;&nbsp; parkingLot : {ele.parkingLot}</p>
                                        <p>alevator : {ele.alevator}</p>
                                        <p>furnishedStatus : {ele.furnishedStatus}</p>
                                        <p>otherAminities : {ele.otherAminities}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                        : (<div className="displayCard">
                            <div className='imgCont'>
                                <img src={image} alt="Property" />
                            </div>
                            <div className='descCont'>
                                <h5>porperty Details</h5>
                            </div>
                        </div>)
                }

                {/* <div className="displayCard">
                    <div className='imgCont'>
                        <img src={image} alt="Property" />
                    </div>
                    <div className='descCont'>
                        <h5>porperty Details</h5>
                    </div>
                </div> */}
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>POST PROPERTY</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className='ownership mb-3'>
                            <Form.Check type='radio' label='Owner' id="radio1" name="ownership" value='Owner' onChange={(e) => updatePayload(e, 'ownership')} />
                            <Form.Check type='radio' label='Agent' id="radio2" name="ownership" value='Agent' onChange={(e) => updatePayload(e, 'ownership')} />
                        </div>
                        <div>
                            <FloatingLabel controlId="floatingInput" label="Enter Full Name" className="mb-3">
                                <Form.Control type="text" placeholder="Enter Full Name" onChange={(e) => updatePayload(e, 'fullName')} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Enter Your Email" className="mb-3">
                                <Form.Control type="email" placeholder="Enter Your Email" onChange={(e) => updatePayload(e, 'email')} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Enter Your Moblie Number" className="mb-3">
                                <Form.Control type="text" placeholder="Enter Your Moblie Number" onChange={(e) => updatePayload(e, 'mobile')} />
                            </FloatingLabel>
                        </div>
                        <div>
                            <h4>Enter Property Details</h4>
                            <FloatingLabel controlId="floatingInput" label="Carpet Area(sq. feet)" className="mb-3">
                                <Form.Control type="number" placeholder="Carpet Area(sq. feet)" onChange={(e) => updatePayload(e, 'carpetArea')} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Number of Bedrooms" className="mb-3">
                                <Form.Control type="number" placeholder="Number of Bedrooms" onChange={(e) => updatePayload(e, 'noOfBedrooms')} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Number of Bathroom" className="mb-3">
                                <Form.Control type="number" placeholder="Number of Bathroom" onChange={(e) => updatePayload(e, 'noOfBathroom')} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Number of Kitchen" className="mb-3">
                                <Form.Control type="number" placeholder="Number of Kitchen" onChange={(e) => updatePayload(e, 'noOfKithen')} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Type Here Other Aminities(seperate with comma)" className="mb-3">
                                <Form.Control type="text" placeholder="Type Here Other Aminities(seperate with comma)" onChange={(e) => updatePayload(e, 'otherAminities')} />
                            </FloatingLabel>

                            <Form.Check inline label="Lobby" value="available" id="check1" name="group1" type='checkbox' className="mb-3" onChange={(e) => updateCheckboxPayload(e, 'lobby')} />
                            <Form.Check inline label="Dinning Area" value="available" id="check2" name="group1" type='checkbox' className="mb-3" onChange={(e) => updateCheckboxPayload(e, 'dinningArea')} />
                            <Form.Check inline label="Garden" value="available" id="check3" name="group1" type='checkbox' className="mb-3" onChange={(e) => updateCheckboxPayload(e, 'garden')} />
                            <Form.Check inline label="Parking lot" value="available" id="check4" name="group1" type='checkbox' onChange={(e) => updateCheckboxPayload(e, 'parkingLot')} />
                            <Form.Check inline label="Alevator" value="available" id="check5" name="group1" type='checkbox' className="mb-3" onChange={(e) => updateCheckboxPayload(e, 'alevator')} />
                            <br />
                            <Form.Check inline label="Full Furnished" value="Full Furnished" id="radio3" name="furnishedStatus" type='radio' className="mb-3" onChange={(e) => updatePayload(e, 'furnishedStatus')} />
                            <Form.Check inline label="Partial Furnished" value="Partial Furnished" id="radio4" name="furnishedStatus" type='radio' className="mb-3" onChange={(e) => updatePayload(e, 'furnishedStatus')} />
                            <Form.Check inline label="Unfurnished" value="Unfurnished" id="radio5" name="furnishedStatus" type='radio' className="mb-3" onChange={(e) => updatePayload(e, 'furnishedStatus')} />
                        </div>
                        <div>
                            <h4>Upload Property Images</h4>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Make sure you upload high quality images(1080*720px and up)</Form.Label>
                                <Form.Control type="file" name="file" accept=".png, .jpg, .jpeg" multiple onChange={(e) => updatePayload(e, "file")} />
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PropertyDisplay;