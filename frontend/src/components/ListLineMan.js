import React,{Fragment,useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Pagination } from "react-bootstrap";
import {BiEditAlt} from "react-icons/bi"
import {BsTrash} from "react-icons/bs"
import axios from 'axios'
import {baseURL} from "../utils/constant";

const ListLineMan=({linemannames,setUpdateUI})=>{
const[currentPage,setCurrentPage]=useState(1);
const recordsPerPage=5;
const lastIndex=currentPage*recordsPerPage;
const firstIndex=lastIndex-recordsPerPage;
const records=linemannames.slice(firstIndex,lastIndex);
const nPage=Math.ceil(Object.keys(linemannames).length/recordsPerPage);
const numbers=[...Array(nPage+1).keys()].slice(1);
var serialno=0;

serialno=(currentPage-1) * recordsPerPage;
const removeLineMan=(id)=>{
    axios.delete(`${baseURL}/linemancreate/delete/${id}`).then((res)=>{
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
        serialno=lastIndex;
      setCurrentPage(currentPage+1);
    }

  }
  function changeCPage(id){
    setCurrentPage(id)
  }
  return(
    <Fragment>
      <div style={{margin:"5rem"}}>
        <Table striped bordered hover size="sm"  >
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              records && records.length>0
              ?
              (records.map((linemanname)=>{
                serialno=serialno+1;
                return(
                  <tr>
                    <td>{serialno}</td>
                    <td>{linemanname.linemanname}</td>
                    <td>{linemanname.mobileno}</td>
                    <td>
                    {/*<BiEditAlt  className='icons' onClick={()=>updateMode(cityname._id,cityname.cityname,cityname.citylineno)} />*/}
                    <BsTrash className='icons' onClick={()=>removeLineMan(linemanname._id)} />
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
export default ListLineMan;
