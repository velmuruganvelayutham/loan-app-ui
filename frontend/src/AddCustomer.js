import React, { useEffect, useState,useRef } from "react";
import {Button,Container,Form,Row,Col} from 'react-bootstrap';
import List from "./components/List"
import axios from "axios"
import {baseURL} from "./utils/constant";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function AddCustomer(){
  const[input,setInput]=useState("");
  const[inputmobileno,setInputMobileno]=useState("")
  const[customers,setCustomer]=useState([]);
  const[updateUI,setUpdateUI]=useState(false);
  const[updateId,setUpdateId]=useState(null);
  const [radioValue, setRadioValue] = useState("0");
  const [citynames,setCitynames]=useState([]);
  const [validated, setValidated] = useState(false);
  const [city,setCity]=useState("");
  const fathernameref=useRef(null);
  const addressRef=useRef(null);
  const workRef=useRef(null);
    useEffect(()=>{
    axios.get(`${baseURL}/citycreate/get`).then((res)=>{
      setCitynames(res.data)
    })
    
},[]);
  useEffect(()=>{
    axios.get(`${baseURL}/get/view`).then((res)=>{
      setCustomer(res.data)
    })
  },[updateUI]);
  /*useEffect(()=>{
    axios.get(`${baseURL}/get`).then((res)=>{
      setCustomer(res.data)
    })
  },[updateUI]);*/


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    }
    setValidated(true);

    if(input !=="" && inputmobileno!="" && city!=="" && fathernameref.current.value!==""
    && addressRef.current.value!=="" && workRef.current.value!=="")
    {
      addCustomer();
    }
    
  };


  const addCustomer=() =>{

    axios.post(`${baseURL}/save`,{customer:input,mobileno:inputmobileno,cityid:city,fathername:fathernameref.current.value,
                  address:addressRef.current.value,work:workRef.current.value,relationtype:Number(radioValue)}).then((res)=>{
      //console.log(res.data)
      setInput("")
      setInputMobileno("");
      setCity("");
      setRadioValue("0")
      fathernameref.current.value="";
      addressRef.current.value="";
      workRef.current.value="";
      setUpdateUI((prevState)=>!prevState)
    })
  }

  const updateMode=(id,text,mobilenum,cityid,father,addr,wrk,relation)=>{
    //console.log(mobilenum);
    setInput(text);
    setInputMobileno(mobilenum);
    setCity(cityid);
    setRadioValue(relation==1?"1":"0");
    fathernameref.current.value=father;
    addressRef.current.value=addr;
    workRef.current.value=wrk;
    setUpdateId(id);
    
  }

  const updateCustomer=()=>{
    axios.put(`${baseURL}/update/${updateId}`,{customer:input,mobileno:inputmobileno,cityid:city,fathername:fathernameref.current.value,
      address:addressRef.current.value,work:workRef.current.value,relationtype:Number(radioValue)}).then((res)=>{
      //console.log(res.data)
      setUpdateUI((prevState)=>!prevState)
      setInput("");
      setInputMobileno("");
      setCity("");
      setRadioValue("0")
      fathernameref.current.value="";
      addressRef.current.value="";
      workRef.current.value="";
      setUpdateId(null);
      
    })
  }
  const clearFields=()=>{
      setInput("");
      setInputMobileno("");
      setCity("");
      setRadioValue("0")
      fathernameref.current.value="";
      addressRef.current.value="";
      workRef.current.value="";
      setUpdateId(null);
  }
  const radios = [
    { name: 'F', value: '0' },
    { name: 'H', value: '1' }
  ];
  
    return(
      
      <Container >
        <h2 className="text-center">வாடிக்கையாளர் விபரம்</h2>
        <Row className="justify-content-md-center mt-5 ">
        <Form validated={validated}>
          <Row >
          <Col xs={12} md={4} className="rounded bg-white">
            <Form.Group className="mb-3" name="customername" border="primary" >
              <Form.Label>பெயர்</Form.Label>
              <Form.Control  type="text" placeholder="பெயர்" required value={input} onChange={(e)=>setInput(e.target.value)} />
            </Form.Group>
          </Col>
          <Col xs={12} md={4} className="rounded bg-white">
            <Form.Group className="mb-3" name="mobilenumber" border="primary" >
              <Form.Label>போன்</Form.Label>
              <Form.Control type="number" placeholder="போன்" required value={inputmobileno} 
              onChange={(e)=>setInputMobileno(e.target.value)} />
            </Form.Group>
          </Col>
          <Col xs={12} md={4} className="rounded bg-white">
            <Form.Group className="mb-3" name="cityname" border="primary" >
            <Form.Label>ஊர்</Form.Label>
            <Form.Select aria-label="Default select example"   value={city} onChange={(e)=>setCity(e.target.value)} required>
              <option  key={city} value={""} >மெனுவை தேர்ந்தெடுக்கவும்</option>

              {
              citynames.map((cityname) => (
              <option key={cityname._id} value={cityname._id}  
              selected={city===cityname._id} >{cityname.cityname}</option>
            ))}
              
              </Form.Select>
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col xs={12} md={4} className="rounded bg-white">
          <Form.Group className="mb-3" name="fathername" border="primary" >
          <ButtonGroup className="mb-2">
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant="outline-primary"
                      name="radio"
                      size="sm"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}>
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
                <Form.Control type="text" placeholder="தகப்பனார் பெயர்"  ref={fathernameref} required/>
                
              </Form.Group>
          </Col>
          <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="address1" border="primary" >
                <Form.Label>முகவரி</Form.Label>
                <Form.Control type="text" placeholder="முகவரி" ref={addressRef}  required/>
              </Form.Group>
            </Col>
            <Col xs={12} md={4} className="rounded bg-white">
              <Form.Group className="mb-3" name="work" border="primary" >
                <Form.Label>வேலை</Form.Label>
                <Form.Control type="text" placeholder="வேலை" ref={workRef}  required/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="rounded bg-white text-center">
              <div className="col-md-12 mb-4 " >
                <Button variant="primary" size="lg" type="button" className="text-center" onClick={updateId ? updateCustomer : handleSubmit}>
                சேமி
                </Button>{' '}
                <Button variant="primary" size="lg" type="button" className="text-center" onClick={clearFields}>
                  புதிய
                </Button>
              </div>
              
              <div className="col-md-12 text-center">
                <List customers={customers} setUpdateUI={setUpdateUI}
                updateMode={updateMode} />
              </div>
          </Row>
        </Form>
        </Row>
      </Container>
       
    )
}
export default AddCustomer;