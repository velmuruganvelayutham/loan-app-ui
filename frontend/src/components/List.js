import React, { Fragment,useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Pagination } from "react-bootstrap";
import {BiEditAlt} from "react-icons/bi"
import {BsTrash} from "react-icons/bs"
import axios from 'axios'
import {baseURL} from "../utils/constant";
import {Link,useNavigate} from 'react-router-dom';


const myStyle = {
  columncount :"2",
  columngap :"25px"
};
/*const List = ({id,customer,customermobile,setUpdateUI,updateMode}) => {*/
  
const List=({customers,setUpdateUI,updateMode})=>{

const[currentPage,setCurrentPage]=useState(1);
const recordsPerPage=5;
const lastIndex=currentPage*recordsPerPage;
const firstIndex=lastIndex-recordsPerPage;
const records=customers.slice(firstIndex,lastIndex);
const nPage=Math.ceil(Object.keys(customers).length/recordsPerPage);
const numbers=[...Array(nPage+1).keys()].slice(1);
var serialno=0;
serialno=(currentPage-1) * recordsPerPage;
  const removeCustomer=(id)=>{
    axios.delete(`${baseURL}/delete/${id}`).then((res)=>{
      setUpdateUI((preveState)=>!preveState)
    })
  }
  function prevPage(){
    if(currentPage!==firstIndex)
    {
      setCurrentPage(currentPage-1)
    }
    
  }
  function nextPage(){
    if(currentPage!==lastIndex){
      setCurrentPage(currentPage+1);
    }

  }
  function changeCPage(id){
    setCurrentPage(id)
  }
  return (
    <Fragment>
      <div style={{margin:"5rem"}}>
        <Table striped bordered hover   >
          <thead>
            <tr>
              <th>
                No
              </th>
              <th>
                Name
              </th>
              <th>
                Mobile No
              </th>
              <th>
                City
              </th>
              <th colSpan={2}>
                Father Name
              </th>
              <th>
                Address
              </th>
              <th>
                Work
              </th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              records && records.length>0
              ?
              (records.map((customer,i)=>{
                serialno=serialno+1;
                return(
                  <tr>
                    <td>{serialno}</td>
                    <td>{customer.customer}</td>
                    <td>{customer.mobileno}</td>
                    <td>{customer.cityname}</td>
                    <td>{customer.relationtype==0 ? "F" : "H"}</td>
                    <td >{customer.fathername}</td>
                    <td>{customer.address}</td>
                    <td>{customer.work}</td>
                    <td>
                    <BiEditAlt  className='icons' onClick={()=>updateMode(customer._id,customer.customer,customer.mobileno,customer.city_id,customer.fathername,customer.address,customer.work,customer.relationtype)} />
                    <BsTrash className='icons' onClick={()=>removeCustomer(customer._id)} />
                    </td>
                  </tr>
                  
                )
              })
              )
              :
              "No Data Available"
            }
          </tbody>
        </Table>
        <nav>
        
          <Pagination>
            <Pagination.Prev >
            <a href="#" className='page-link' onClick={prevPage}>Prev</a>
            </Pagination.Prev>
            {
            numbers.map((n,i)=>(
              <Pagination.Item>
                <a href="#" className='page-link'
            onClick={()=>changeCPage(n)}>{n}</a>
              </Pagination.Item>
            ))
          }
            <Pagination.Next>
            <a href="#" className='page-link' onClick={nextPage}>Next</a>
            </Pagination.Next>
          </Pagination>
        </nav>

      </div>
    </Fragment>
  )
}
export default List
