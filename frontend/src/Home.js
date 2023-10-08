import React,{Fragment} from "react";
import {Button,Table} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link,useNavigate} from 'react-router-dom';
function Home(){
    return(
        <Fragment>
            <div style={{margin:"10rem"}} >
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                            <th>
                               Loan No
                            </th>
                            <th>
                                Loan Amount
                            </th>
                            <th>
                                Customer
                            </th>
                            <th>
                            Mobile No
                            </th>
                            <th>
                               Action
                            </th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    "No Data Available"
                    </tbody>
                </Table>
            </div>
        </Fragment>
    )
}
export default Home;