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
    const[updateUI,setUpdateUI]=useState(false);
    useEffect(()=>{
        axios.get(`${baseURL}/citycreate/get`).then((res)=>{
            //console.log(res.data)
            setCityNames(res.data)
        })
    },[[updateUI]]);

    /*useEffect(()=>{
        axios.get(`${baseURL}/citycreate/get/max`).then((res)=>{
            const checkstring=(res.data);
            maxCitycode=checkstring[0].maxCode+1;
        })
    },[]);*/

    const addCityName=()=>{
        axios.post(`${baseURL}/citycreate/save`,{cityname:inputCity,citylineno:lineNo})
        .then((res)=>{
            setInputCity("");
            setLineNo("");
            setUpdateUI((prevState)=>!prevState);
        })
        alert("City Saved Successfully");
    }

    const linearr=[1,2,3,4,5,6,7,8,9,10];

    return(
        <Container>
            <Row className="justify-content-md-center mt-5 ">
                <Col xs={6} lg={6} className="rounded bg-white">
                    <Form>
                        <Form.Group className="mb-3" name="cityname" border="primary" >
                            <Form.Label>City Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter City Name" required value={inputCity} onChange={(e)=>setInputCity(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" name="linenumber" border="primary" >
                            <Form.Label>Line No</Form.Label>
                            <Form.Control as="select"   value={lineNo} onChange={(e)=>setLineNo(e.target.value)} >
                            <option  key={lineNo} >Open this select menu</option>

                            {
                            linearr.map((linename,i) => (
                            <option key={i+1} value={i+1}  
                            selected={lineNo===i+1} >{"Line"+(i+1)}</option>
                            ))}

                            </Form.Control>
                        </Form.Group>
                        <div className="col-md-12 text-center " >
                        <Button variant="primary" type="submit" className="text-center" onClick={addCityName}>
                        Submit
                        </Button>
                        </div> 
                        <ul>
                            <ListCity citynames={cityNames} setUpdateUI={setUpdateUI} />
                        </ul>
                    </Form>
                </Col>
            </Row>
        </Container>
    ) 
}
export default AddCityName;