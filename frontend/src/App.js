import logo from './logo.svg';
import React from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import AddCustomer from './AddCustomer';
import NavBar from './NavBar';
import Footer from './Footer';
import LoanForm from './LoanForm';
import AddCityName from './AddCityName';
import AddLineMan from './AddLineMan';
import AddReceipt from './Receipt';
import Ledger from './Reports/Ledger';
function App() {
  return (
    <div className="app">
      <React.Fragment >
        <NavBar />
          <Router  >
            <Routes >
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<AddCustomer />} />
                <Route path='/citycreate' element={<AddCityName/>}/>
                <Route path='/linemancreate' element={<AddLineMan/>}/>
                <Route path='/loan' element={<LoanForm />} />
                <Route path='/receipt' element={< AddReceipt/>} />
                <Route path='/ledgercreate' element={< Ledger/>} />
            </Routes>
        </Router>
        <Footer />
      </React.Fragment>
    </div>
  );
}

export default App;
