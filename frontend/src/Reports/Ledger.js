import React,{useState,Fragment, useRef,useEffect} from 'react'
import { Container,Row,Col,Form, FormGroup, FormControl ,Button, Alert,Table} from 'react-bootstrap'
import axios from "axios";
import {baseURL} from '../utils/constant';
import ReactToPrint from 'react-to-print';
function Ledger() {
    useEffect(()=>{
        axios.get(`${baseURL}/ledger/get`).then((res)=>{
            console.log(res.data)
        })
    },[])
    const componentRef=useRef()
    const handlePrint=()=>{
        window.print()
    }
    return (
        <div >
            <ReactToPrint trigger={()=>(
                <Button className='btn btn-primary'>Print</Button>
            )}
            content={()=>componentRef.current}
            />
            <Container ref={componentRef} className="rounded bg-white ">
            
            <Row className="justify-content-md-center  ">
            <Form>
                <Row>
                    <Col xs={12} md={4} className="rounded bg-white">
                    <h4 >Ledger</h4>
                    </Col>
                    <Col xs={12} md={4} className="rounded bg-white">
                    <h2 >Comapany Name</h2>
                    </Col>
                    <Col xs={12} md={4} className="rounded bg-white">
                    <h4 >Date</h4>
                    </Col>
                </Row>
                <Row>
                <hr  style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .5,
                    borderColor : '#000000'
                }}/>
                </Row>
                <Row>
                    <Col  md={3} style={{outline:'1px solid orange',borderRadius:' 30px 30px 30px 30px'}}>
                    <Form.Group   border="primary" >
                            <Form.Label>பெயர்&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Murugeswari</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Father&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Vellilingam</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Street&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;6th stret</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>City&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Ventrilingapuram</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Work&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Ventrilingapuram</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Phone&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Ventrilingapuram</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={3} style={{outline:'1px solid orange',borderRadius:' 30px 30px 30px 30px'}}>
                    <Form.Group   border="primary" >
                            <Form.Label>Week&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Murugeswari</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Line&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Vellilingam</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Week&nbsp;No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;6th stret</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Book&nbsp;No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Ventrilingapuram</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Document&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Ventrilingapuram</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Cheque&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Ventrilingapuram</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={3} style={{outline:'1px solid orange',borderRadius:' 30px 30px 30px 30px'}}>
                    <Form.Group   border="primary" >
                            <Form.Label>Loan No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;<h5>1232323</h5></Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Start Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Vellilingam</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Given Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;6th stret</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Finished Date&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;19/12/2012</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>LineMan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Ventrilingapuram</Form.Label>
                        </Form.Group>
                        
                    </Col>
                    <Col md={3} style={{outline:'1px solid orange',borderRadius:' 30px 30px 30px 30px'}}>
                        <Form.Group   border="primary" >
                            <Form.Label>Given&nbsp;Amount&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Murugeswari</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Doc&nbsp;Amount&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Vellilingam</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Interest&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;6th stret</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;Ventrilingapuram</Form.Label>
                        </Form.Group>
                        <Form.Group   border="primary" >
                            <Form.Label>Due&nbsp;Amount&nbsp;&nbsp;&nbsp;&nbsp;:</Form.Label>
                            <Form.Label>&nbsp;0</Form.Label>
                        </Form.Group>
                        
                    </Col>
                </Row>
            </Form>
            </Row>
            <Row>
                <hr className='m-3' style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .5,
                    borderColor : '#000000'
                }}/>
                </Row>

                <Row>
            <div class="col-xs-6 col-md-6">
            <Fragment>
            <div  className="container-fluid ">
            <Table    className="table table-striped table-primary table-hover text-center fs-6 table-bordered border-dark  " size="sm">
                <thead>
                    <tr >
                    <th scope="col" lg={1} className="col-sm-12 col-md-1">
                        Date
                   </th>
                    <th className="col-sm-12 col-md-1">
                        No
                    </th>
                    <th className="col-sm-12 col-md-2">
                        Week No
                    </th>
                    <th className="col-sm-12 col-md-4">
                        Debit
                    </th>
                    <th className="col-sm-12 col-md-2 text-end">Credit</th>
                    <th className="col-sm-12 col-md-2 text-end">Balance</th>
                    
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>mmmm</td>
                        <td>sdsds</td>
                        <td>mmmm</td>
                        <td>sdsds</td>
                        <td>mmmm</td>
                        <td>sdsds</td>
                    </tr>
                    <tr>
                        <td>mmmm</td>
                        <td>sdsds</td>
                        <td>mmmm</td>
                        <td>sdsds</td>
                        <td>mmmm</td>
                        <td>sdsds</td>
                    </tr>
                    <tr>
                    <td>mmmm</td>
                        <td>sdsds</td>
                        <td>mmmm</td>
                        <td>sdsds</td>
                        <td>mmmm</td>
                        <td>sdsds</td>
                    </tr>
                    <tr>
                    <td>mmmm</td>
                        <td>sdsds</td>
                        <td>mmmm</td>
                        <td>sdsds</td>
                        <td>mmmm</td>
                        <td>sdsds</td>
                    </tr>
                    <tr>
                    <td>mmmm</td>
                        <td>sdsds</td>
                        <td>mmmm</td>
                        <td>sdsds</td>
                        <td>mmmm</td>
                        <td>sdsds</td>
                    </tr>
                </tbody>
                </Table>
                
                
                

            </div>
            </Fragment>
            </div>
            </Row>
            </Container>
        </div>

      )
    
}
export default Ledger