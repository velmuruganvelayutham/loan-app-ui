import React ,{useEffect, useState} from "react";
import {Button,Container,Form,Row,Col} from 'react-bootstrap';
import axios from "axios";
import {baseURL} from "./utils/constant";
import ListCity from "./components/ListCity"
//var maxCitycode=0;
function AddCityName(){

    const[inputCity,setInputCity]=useState("");
    const[lineNo,setLineNo]=useState("");
    const[cityNames,setCityNames]=useState([]);
    const[lineNames,setLineNames]=useState([]);
    const[updateUI,setUpdateUI]=useState(false);
    const[updateId,setUpdateId]=useState(null);
    const [validated, setValidated] = useState(false);
    useEffect(()=>{
        axios.get(`${baseURL}/citycreate/get`).then((res)=>{
            //console.log(res.data)
            setCityNames(res.data)
        })
    },[[updateUI]]);
    useEffect(()=>{
        axios.get(`${baseURL}/linemancreate/get/lines`).then((res)=>{
            setLineNames(res.data);
        }) 
    },[])
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
        }
        setValidated(true);
    
        if(inputCity !=="" && lineNo!=="")
        {
          addCityName();
        }
        
      };
    const addCityName=()=>{
        axios.post(`${baseURL}/citycreate/save`,{cityname:inputCity,citylineno:lineNo})
        .then((res)=>{
            setInputCity("");
            setLineNo("");
            setUpdateUI((prevState)=>!prevState);
        })
        alert("City Saved Successfully");
    }
    const clearFields=()=>{
        setInputCity("");
        setLineNo(""); 
        setUpdateId(null);  
    }
    
    const updateMode=(id,text,lineno)=>{
        //console.log(mobilenum);
        setInputCity(text);
        setLineNo(lineno)
        setUpdateId(id);
        
      }
    
      const updateCity=()=>{
        axios.put(`${baseURL}/citycreate/update/${updateId}`,{cityname:inputCity,citylineno:lineNo}).then((res)=>{
        setUpdateUI((prevState)=>!prevState)
        setInputCity("");
        setLineNo("");
        setUpdateId(null);
        })
      }
    return(
        <Container>
            <h2 className="text-center">ஊர் விபரம்</h2>
            <Row className="justify-content-md-center mt-5 ">
                <Col xs={6} lg={6} className="rounded bg-white">
                    <Form validated={validated}>
                        <Form.Group className="mb-3" name="cityname" border="primary" >
                            <Form.Label>ஊர்</Form.Label>
                            <Form.Control type="text" placeholder="ஊர்" required value={inputCity} onChange={(e)=>setInputCity(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" name="linenumber" border="primary" >
                            <Form.Label>லைன்</Form.Label>
                            <Form.Select  aria-label="Default select example"  value={lineNo} onChange={(e)=>setLineNo(e.target.value)} required>
                            <option  key={lineNo} value={""} >மெனுவை தேர்ந்தெடுக்கவும்</option>

                            {
                            lineNames.map((lines) => (
                            <option key={lines.lineno} value={lines.lineno}  
                            selected={lines.lineno} >{lines.linename}</option>
                            ))}

                            </Form.Select>
                        </Form.Group>
                        <div className="col-md-12 text-center " >
                        <Button variant="primary" type="button" className="text-center" onClick={updateId ? updateCity : handleSubmit}>
                        சேமி
                        </Button>{' '}
                        <Button variant="primary"  
                        type="button" className="text-center" onClick={clearFields}>புதிய</Button>
                        </div> 
                        <ul>
                            <ListCity citynames={cityNames} setUpdateUI={setUpdateUI} updateMode={updateMode}/>
                        </ul>
                    </Form>
                </Col>
            </Row>
        </Container>
    ) 
}
export default AddCityName;