import React ,{useEffect, useState,useRef} from "react";
import {Button,Container,Form,Row,Col} from 'react-bootstrap';
import axios from "axios";
import {baseURL} from "./utils/constant";
import ListReceipt from "./components/ListReceipt";
import {startOfWeek,dateFormat} from './FunctionsGlobal/StartDateFn';

function AddReceipt(){
  const[linenames,setLineNames]=useState([]);
  const[pendingLoan,setPendingLoan]=useState([]);
  const[childLoan,setChildLoan]=useState([]);
  const[startdateRef,setStartDateRef]=useState(startOfWeek());
  const [line,setLine]=useState(0);
  const receipt=useRef(null)
  
  
  useEffect(()=>{
    axios.get(`${baseURL}/citycreate/get`).then((res)=>{
        setLineNames(res.data);
        //console.log(res.data);
    })
    },[]);
   
    useEffect(()=>{
     // {new Date(dateobject ).toLocaleDateString()}
      axios.get(`${baseURL}/receipt/get/loanpending`,{params:{cityid:line.toString(),receiptdate:dateFormat(startdateRef).toString()}}).then((res)=>{
        setPendingLoan(res.data);
        //console.log(res.data);
      })
      },[line]);



    const saveReceipt=()=>{
      //console.log(childLoan);
        axios.post(`${baseURL}/receipt/save/details`,{receiptdata:childLoan,receiptdate:new Date(startdateRef)}).then((res)=>{
          console.log(res.data);
        })
    }
    
    return(
        <Container>
            <Row className="justify-content-md-center mt-5 ">
            <Form>
              <Row>
                <Col xs={6} md={4} className="rounded bg-white">
                    
                      <Form.Group className="mb-3" name="lineno" border="primary" >
                      <Form.Label>Line No</Form.Label>
                      <Form.Select aria-label="Default select example" 
                      onChange={(e)=>setLine(e.target.value)} value={line} >
                      <option value={0}> select Line</option>
                      {
                      linenames.map((linename) => (
                      <option value={linename._id}>{linename.cityname}</option>
                      ))}  
                      </Form.Select>
                      </Form.Group>
                        
                    
                </Col>
                <Col xs={12} md={1}></Col>
                <Col xs={12} md={4} className="rounded bg-white">
                    <Form.Group className="mb-3" name="startdate" border="primary" >
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date"  placeholder="loan start date" value={startdateRef} onChange={(e)=>setStartDateRef(e.target.value)}/>
                    </Form.Group>
                </Col>
                </Row>
                <Row>
                    <div className="col-md-12 text-center " >
                    
                    <Button variant="primary" type="submit" className="text-center" onClick={saveReceipt}>
                    Save
                    </Button>
                    </div> 
                    <ul>
                    <ListReceipt   pending={pendingLoan} setpendingLoanFun={setChildLoan} />
                    </ul>
                </Row>
                </Form>
            </Row>
        </Container>
    ) 
}
export default AddReceipt;