import React,{useState,useEffect,useRef} from 'react'
import { Container,Row,Col,Form, FormGroup, FormControl ,Button, Alert} from 'react-bootstrap'
import axios from "axios";
import { baseURL } from './utils/constant';
import {startOfWeek} from './FunctionsGlobal/StartDateFn';
//import * as formik from 'formik';
//import * as yup from 'yup';
var maxLoanNo=0;
function LoanForm() {
    function getDateNew(){
       
        const dateString=new Date().toLocaleDateString('en-GB',{
            year:'numeric',
            month:'2-digit',
            day:'2-digit',
        }).split("/").reverse().join("-");
        return dateString;
    }
   function endingDate(){
    var datestarted=new Date(startDate);
    var enddatecal=new Date(datestarted.setDate(datestarted.getDate()+((weekscount-1)*7)))// weeks * 7days per week
    const dateendformat=new Date(enddatecal).toLocaleDateString('en-GB',{
        year:'numeric',
        month:'2-digit',
        day:'2-digit',
    }).split("/").reverse().join("-");
    
    return dateendformat;
       
   }
    
    const[customers,setCustomers]=useState([]);
    const[linemannames,setLinemanNames]=useState([]);
    const[inputmobileno,setInputMobileno]=useState();
    const[weekscount,setWeeksCount]=useState(25);
    const[givenAmt,setGivenAmt]=useState("");
    const[linenames,setLineNames]=useState([]);
    const documentAmt=useRef(null);
    const interestAmt=useRef(null);
    const totalAmt=useRef(null);
    const dueAmt=useRef(null);
    const paidAmt=useRef(null);
    const givenDate=useRef(null);
    const dueDate=useRef(null)
    const[startDate,setStartDate]=useState(startOfWeek());
    const endDateRef=useRef(null);
    const fathernameRef=useRef(null);
    const citynameRef=useRef(null);
    const addressRef=useRef(null);
    const workRef=useRef(null);
    const customeroptionRef=useRef(null);
    const linemanoptionRef=useRef(null);
    const weekRef=useRef(null);
    const lineRef=useRef(null);
    const bookRef=useRef(null);
    const documentRef=useRef(null);
    const chequeRef=useRef(null);
    const loannoRef=useRef(null);
    const oldLoanRef=useRef(null);
    const [validated, setValidated] = useState(false);
    const[maxValueShow,setMaxValueShow]=useState(false);
    
    useEffect(()=>{
        axios.get(`${baseURL}/get/view`).then((res)=>{
          setCustomers(res.data)
        })
    },[]);
    
    useEffect(()=>{
        axios.get(`${baseURL}/linemancreate/get`).then((res)=>{
            setLinemanNames(res.data)
        })
    },[]);

    useEffect(()=>{
        axios.get(`${baseURL}/loancreate/get/max`).then((res)=>{
            const checkstring=(res.data);
            if(checkstring.length>0){
                maxLoanNo=checkstring[0].maxCode+1;
            }
            else{
                maxLoanNo=1;
            }
            loannoRef.current.value=maxLoanNo;
        })
    },[maxValueShow]);

    useEffect(()=>{
        axios.get(`${baseURL}/linemancreate/get/lines`).then((res)=>{
            setLineNames(res.data);
        })
    },[]);


    function customerSelect(e){
        const filtered=customers.filter(customer=>{
            return customer._id===e.target.value
        })
        if(customeroptionRef.current.value==0){
            setInputMobileno("");
            fathernameRef.current.value="";
            citynameRef.current.value="";
            addressRef.current.value="";
            workRef.current.value="";
            lineRef.current.value=0;
        }
        else{
            setInputMobileno(filtered[0].mobileno);
            fathernameRef.current.value=filtered[0].fathername;
            citynameRef.current.value=filtered[0].cityname;
            addressRef.current.value=filtered[0].address;
            workRef.current.value=filtered[0].work;
            lineRef.current.value=filtered[0].lineno;
        }
        
    }
    {/*console.log("DATE", date);*/}
function calculateTotalAmt(){
    let given=Number(givenAmt);
    let document=((50*given)/1000);
    documentAmt.current.value=document.toFixed(2);
    let intrested=((given*20)/100);
    interestAmt.current.value=intrested.toFixed(2);
    let total=given+document+intrested;
    totalAmt.current.value=total.toFixed(2);
    let due=(total/25)
    dueAmt.current.value=due.toFixed(2);
    setGivenAmt(given.toFixed(2));
}
const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    if(customeroptionRef.current.value!==""&&linemanoptionRef.current.value!=="" &&weekRef.current.value!=="" && bookRef.current.value,lineRef.current.value!==""
    && lineRef.current.value!=="" & weekscount!=="" && givenAmt!=="" && givenAmt!==0 )
    {
        saveLoanDetails();
    }
    
    
  };
const saveLoanDetails =  () => {
    
        axios.post(`${baseURL}/loancreate/save`,{loanno:maxLoanNo,customer_id:customeroptionRef.current.value,lineman_id:linemanoptionRef.current.value,
        weekno:weekRef.current.value,bookno:bookRef.current.value,lineno:lineRef.current.value,document:documentRef.current.value,cheque:chequeRef.current.value,
        weekcount:weekscount,startdate:new Date(startDate),givendate:new Date(givenDate.current.value),duedate:new Date(dueDate.current.value),finisheddate:new Date(endDateRef.current.value),
        givenamount:Number(givenAmt),documentamount:Number(documentAmt.current.value),interestamount:Number(interestAmt.current.value),
        totalamount:Number(totalAmt.current.value),dueamount:Number(dueAmt.current.value),paidamount:Number(paidAmt.current.value)})
        .then((res)=>{
            clearFields();
        });
        alert("வெற்றிகரமாக சேமிக்கப்பட்டது");
  }

  const loadOldLoanRef=()=>{
    axios.get(`${baseURL}/loancreate/get/oldLoanRef`,
    { params:{loanno:Number(oldLoanRef.current.value)} }).then((res)=>{
       const oldReference= res.data;
       //alert(oldLoanRef);
       customeroptionRef.current.value=oldReference[0].customer_id;
       linemanoptionRef.current.value=oldReference[0].lineman_id;
       setInputMobileno(oldReference[0].mobileno);
       fathernameRef.current.value=oldReference[0].fathername;
       citynameRef.current.value=oldReference[0].cityname;
       addressRef.current.value=oldReference[0].address;
       workRef.current.value=oldReference[0].work;
       lineRef.current.value=oldReference[0].lineno;
       weekRef.current.value=oldReference[0].weekno;
       bookRef.current.value=oldReference[0].bookno;
        documentRef.current.value=oldReference[0].document;
        chequeRef.current.value=oldReference[0].cheque;
        setGivenAmt(oldReference[0].givenamount);
        documentAmt.current.value=oldReference[0].documentamount;
        interestAmt.current.value=oldReference[0].interestamount;
        totalAmt.current.value=oldReference[0].totalamount;
        dueAmt.current.value=oldReference[0].dueamount;
        
        paidAmt.current.value=oldReference[0].paidamount;

    })
}
function clearFields(){
            customeroptionRef.current.value="";
            linemanoptionRef.current.value="";
            setInputMobileno("");
            fathernameRef.current.value="";
            citynameRef.current.value="";
            addressRef.current.value="";
            workRef.current.value="";
            lineRef.current.value="";
            weekRef.current.value="";
            bookRef.current.value="";
            documentRef.current.value="";
            chequeRef.current.value="";
            setStartDate(startOfWeek());
            givenDate.current.value=startOfWeek();

            setGivenAmt("");
            documentAmt.current.value="";
            interestAmt.current.value="";
            totalAmt.current.value="";
            dueAmt.current.value="";
            paidAmt.current.value="";
            oldLoanRef.current.value="";
            setMaxValueShow((prevState)=>!prevState)
}   

  return (
    <Container className="rounded bg-white mt-5">
        <Row className="justify-content-md-center mt-5 ">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            
            <Row >
                <Col xs={12} md={4} className="rounded bg-white">
                    <Form.Group className="mb-3"  border="primary" >
                        <Form.Label>சீட்டு எண்</Form.Label> {/*loan no*/}
                        <Form.Control ref={loannoRef} type="number"  required  />
                    </Form.Group>
                </Col>
                <Col xs={12} md={2} className="rounded bg-white">
                    <Form.Group className="mb-3"  border="primary" >
                        <Form.Label>பழைய எண்</Form.Label>{/*old no*/}
                        <Form.Control ref={oldLoanRef} type="number" placeholder="பழைய எண்" onBlur={loadOldLoanRef}  />
                    </Form.Group>
                </Col>
                <Col xs={12} md={3} className="rounded bg-white">
                    <Form.Group className="mb-3" name="customername" border="primary" >
                    <Form.Label>பெயர்</Form.Label>{/*customer*/}
                        <Form.Select aria-label="Default select example" ref={customeroptionRef} onChange={(e)=>customerSelect(e)} required>
                        <option value="">பெயரை தேர்ந்தெடுக்கவும்</option>
                        {
                        customers.map((customer,i) => (
                        <option value={customer._id}>{customer.customer}</option>
                        ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3} className="rounded bg-white">
                    <Form.Group className="mb-3" name="linemanname" border="primary" >
                    <Form.Label>கொடுப்பவர்</Form.Label>{/*lineman name*/}
                        <Form.Select aria-label="Default select example" ref={linemanoptionRef} required>
                        <option value="">கொடுப்பவர்</option>
                        {
                        linemannames.map((linemanname) => (
                        <option value={linemanname._id}>{linemanname.linemanname}</option>
                        ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                
                <Col xs={12} md={4} className="rounded bg-white">
                    <Form.Group className="mb-3" name="mobilenumber" border="primary" >
                    <Form.Label>போன்</Form.Label> {/*mobile no*/}
                    <Form.Control type="number" disabled  
                    value={inputmobileno} onChange={(e)=>setInputMobileno(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4} className="rounded bg-white">
                    <Form.Group className="mb-3" name="fathername" border="primary" >
                    <Form.Label>தகப்பனார்</Form.Label>{/*father name*/}
                    <Form.Control ref={fathernameRef} type="text"  disabled   />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4} className="rounded bg-white">
                    <Form.Group className="mb-3" name="cityname" border="primary" >
                    <Form.Label>ஊர்</Form.Label> {/*city name*/}
                    <Form.Control ref={citynameRef} type="text"  required disabled />
                    </Form.Group>
                </Col>
                
            </Row>
            <Row>
                <Col xs={12} md={4} className="rounded bg-white">
                    <Form.Group className="mb-3" name="address1" border="primary" >
                    <Form.Label>முகவரி </Form.Label>{/*address*/}
                    <Form.Control ref={addressRef} type="text"  required disabled />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4} className="rounded bg-white">
                    <Form.Group className="mb-3" name="work" border="primary" >
                    <Form.Label>தொழில்</Form.Label>{/*work*/}
                    <Form.Control ref={workRef} type="text"  required disabled />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4} className="rounded bg-white">
                    <Form.Group className="mb-3" name="lineno" border="primary" >
                        <Form.Label>லைன்</Form.Label>{/*line no*/}
                        <Form.Select aria-label="Default select example" ref={lineRef} required>
                        <option value="">லைனை தேர்ந்தெடுக்கவும்</option>
                        {
                        linenames.map((linename) => (
                        <option value={linename.lineno}>{linename.linename}</option>
                        ))}  
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            
            
            <Row>
                <Col xs={12} md={3} className="rounded bg-white">
                    <Form.Group className="mb-3" name="weekno" border="primary" >
                        <Form.Label>வார எண்</Form.Label>{/*week No*/}
                        <Form.Control type="number" placeholder="வார எண் இடவும்" required ref={weekRef}  />
                    </Form.Group>
                </Col>
                <Col xs={12} md={3} className="rounded bg-white">
                    <Form.Group className="mb-3" name="bookno" border="primary" >
                        <Form.Label>புக் எண்</Form.Label>{/*book no*/}
                        <Form.Control type="number" placeholder="புக் எண் இடவும்" required ref={bookRef} />
                    </Form.Group>
                </Col>
                <Col xs={12} md={2} className="rounded bg-white">
                    <Form.Group className="mb-3" name="doument" border="primary" >
                        <Form.Label>டாகுமெண்ட்</Form.Label>{/*document*/}
                        <Form.Control type="text" placeholder="டாகுமெண்ட்"  ref={documentRef} />
                    </Form.Group>
                </Col>
                <Col xs={12} md={2} className="rounded bg-white">
                    <Form.Group className="mb-3" name="cheque" border="primary" >
                        <Form.Label>செக்</Form.Label>{/*cheque*/}
                        <Form.Control type="number" placeholder="செக்" ref={chequeRef}   />
                    </Form.Group>
                </Col>
                <Col xs={12} md={2} className="rounded bg-white">
                    <Form.Group className="mb-3" name="bookno" border="primary" >
                        <Form.Label>வாரம்</Form.Label>{/*week*/}
                        <Form.Control className='bg-info text-center' size="lg" type="number" placeholder="How Many Weeks" required value={weekscount} onChange={(e)=>setWeeksCount(e.target.value)}/>
                    </Form.Group>
                </Col>
            </Row>
            
            <Row>
                <Col xs={12} md={3} className="rounded bg-white">
                    <Form.Group className="mb-3" name="startdate" border="primary" >
                        <Form.Label>ஆரம்ப தேதி</Form.Label>{/*start Date*/}
                        <Form.Control type="date"  placeholder="loan start date" required  value={startDate} onChange={(e)=>setStartDate(e.target.value)}  onBlur={endingDate}/>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3} className="rounded bg-white">
                    <Form.Group className="mb-3" name="givendate" border="primary" >
                        <Form.Label>கொடுத்த தேதி</Form.Label>{/*given Date*/}
                        <Form.Control type="date" ref={givenDate} placeholder="loan given date" required  defaultValue={startOfWeek()}  />
                    </Form.Group>
                </Col>
                <Col xs={12} md={3} className="rounded bg-white">
                    <Form.Group className="mb-3" name="givendate" border="primary" >
                        <Form.Label>செலுத்தும் தேதி</Form.Label>{/*paid date*/}
                        <Form.Control type="date" ref={dueDate} placeholder="loan paid date" required  defaultValue={startOfWeek()}  />
                    </Form.Group>
                </Col>
                <Col xs={12} md={3} className="rounded bg-white">
                    <Form.Group className="mb-3"  border="primary" >
                        <Form.Label>முடிவு தேதி</Form.Label>{/*finished Date*/}
                        <Form.Control type="date" ref={endDateRef} placeholder="loan finished" required value={endingDate()}   />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={2} className="rounded bg-white">
                    <Form.Group className="mb-3" name="givenmoney" border="primary" >
                        <Form.Label>கொடுத்த பணம்</Form.Label>{/*given Money*/}
                        <Form.Control className='text-end' type="number"
                         value={givenAmt} required  
                        onChange={(e)=>setGivenAmt(Number(e.target.value))} 
                        onBlur={calculateTotalAmt} />
                    </Form.Group>
                </Col>
                <Col xs={12} md={2} className="rounded bg-white">
                    <Form.Group className="mb-3" name="documentcharge" border="primary" >
                        <Form.Label>டாகுமெண்ட் சார்ச்</Form.Label>{/*document Charge*/}
                        <Form.Control ref={documentAmt} className='text-end' type="text"   required  />
                    </Form.Group>
                </Col>
                <Col xs={12} md={2} className="rounded bg-white">
                    <Form.Group className="mb-3" name="interest" border="primary" >
                        <Form.Label>வட்டி</Form.Label>{/*interest*/}
                        <Form.Control className='text-end' type="text"  required ref={interestAmt}  />
                    </Form.Group>
                </Col>
                <Col xs={12} md={2} className="rounded bg-white">
                    <Form.Group className="mb-3" name="totalamount" border="primary" >
                        <Form.Label>மொத்தம்</Form.Label>{/*total*/}
                        <Form.Control  className='text-end' type="text"  required  ref={totalAmt}  />
                    </Form.Group>
                </Col>
                <Col xs={12} md={2} className="rounded bg-white">
                    <Form.Group className="mb-3" name="dueamount" border="primary" >
                        <Form.Label>தவணை</Form.Label>{/*Due Amount*/}
                        <Form.Control className='text-end' type="text"  required  ref={dueAmt}  />
                    </Form.Group>
                </Col>
                <Col xs={12} md={2} className="rounded bg-white">
                    <Form.Group className="mb-3" name="paidamount" border="primary" >
                        <Form.Label>கட்டிய பணம்</Form.Label>{/*paid Amount*/}
                        <Form.Control className='text-end' type="text"  required  ref={paidAmt}   />
                    </Form.Group>
                </Col>
            </Row>
            
            <Row>
                <div className="col-md-12 text-center mb-2 " >
                    <Button variant="primary" size="lg" type="button" className="text-center" onClick={handleSubmit} >
                    சேமி
                    </Button>{' '}
                    <Button variant="primary" size="lg" type="button" className="text-center" onClick={clearFields}>
                    புதிய
                    </Button>
                </div>
            </Row>
            </Form>
        </Row>
    </Container>
        
  )
}

export default LoanForm
