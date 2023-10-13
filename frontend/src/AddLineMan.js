import React, { useEffect, useState } from "react";
import {Button,Container,Form,Row,Col} from 'react-bootstrap';
import ListLineMan from "./components/ListLineMan"
import axios from "axios"
import {baseURL} from "./utils/constant";
var maxCitycode=0;
function AddLineMan(){
  const[input,setInput]=useState("");
  const[inputmobileno,setInputMobileno]=useState("")
  const[lineMans,setLineMans]=useState([]);
  const[updateUI,setUpdateUI]=useState(false);
  const[updateId,setUpdateId]=useState(null);

 
  useEffect(()=>{
    axios.get(`${baseURL}/linemancreate/get`).then((res)=>{
      setLineMans(res.data)
    })
  },[updateUI]);

  useEffect(()=>{
    axios.get(`${baseURL}/linemancreate/get/max`).then((res)=>{
        const checkstring=(res.data);
       
        if(((res.data).length)>0){
          maxCitycode=checkstring[0].maxCode+1;
        }
        else{
          maxCitycode=1;
        }
    })
},[]);

  const addLineMan=() =>{
    axios.post(`${baseURL}/linemancreate/save`,{linemancode:maxCitycode,linemanname:input,mobileno:inputmobileno}).then((res)=>{
      //console.log(res.data)
      setInput("")
      setInputMobileno("");
      setUpdateUI((prevState)=>!prevState)
    })
  }

  const updateMode=(id,text,mobilenum)=>{
    setInput(text);
    setInputMobileno(mobilenum);
    setUpdateId(id);
  }

  const updateLineMan=()=>{
    axios.put(`${baseURL}/linemancreate/update/${updateId}`,{linemanname:input,mobileno:inputmobileno}).then((res)=>{
      setUpdateUI((prevState)=>!prevState)
      setInput("");
      setInputMobileno("");
      setUpdateId(null);
      
    })
  }
  
    return(
      
      <Container style={{display:'flex'}}>
        <h2 className="text-center">LINEMAN MASTER</h2>
        <Row className="justify-content-md-center mt-5 ">
        <Form >
          <Row className="rounded bg-white">
          <Col xs={12} md={12} >
            <Form.Group className="mb-3" name="linemanname" border="primary" >
              <Form.Label>LineMan Name</Form.Label>
              <Form.Control type="text" placeholder="Enter LineMan Name" required value={input} onChange={(e)=>setInput(e.target.value)} />
            </Form.Group>
          </Col>
          
          </Row>
          <Row className="rounded bg-white">
          <Col xs={12} md={12} >
            <Form.Group className="mb-3" name="mobilenumber" border="primary" >
              <Form.Label>Mobile No</Form.Label>
              <Form.Control type="number" placeholder="Enter Mobile No" required value={inputmobileno} onChange={(e)=>setInputMobileno(e.target.value)} />
            </Form.Group>
          </Col>
          </Row>
          <Row className="rounded bg-white">
              <div className="text-center mb-2 " >
                <Button variant="primary" size="lg" type="submit" className="text-center" onClick={updateId ? updateLineMan : addLineMan}>
                Submit
                </Button>
              </div>
              <div className="text-center">
                <ListLineMan linemannames={lineMans} setUpdateUI={setUpdateUI} />
              </div>
          </Row>
        </Form>
        </Row>
      </Container>
       
    )
}
export default AddLineMan;