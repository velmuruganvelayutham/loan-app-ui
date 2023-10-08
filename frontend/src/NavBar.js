import React from "react";
import {Button,Navbar,Container ,Nav} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';
function NavBar(){
    return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container>
                <Navbar.Brand href="#home">Loan ManageMent</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto" >
                <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>

                <NavDropdown title="Master" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/create">Borrower</NavDropdown.Item>
                    <NavDropdown.Item href="/citycreate">City</NavDropdown.Item>
                    <NavDropdown.Item href="/linemancreate">LineMan</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Father/Husband</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Entry" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/loan">Loan</NavDropdown.Item>
                    <NavDropdown.Item href="/receipt">Receipt</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Report" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/ledger">Ledger</NavDropdown.Item>
                </NavDropdown>  
                </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>)
}

export default NavBar;