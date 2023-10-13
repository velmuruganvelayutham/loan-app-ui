import React,{Fragment,useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Pagination } from "react-bootstrap";
import {BiEditAlt} from "react-icons/bi"
import {BsTrash} from "react-icons/bs"
import axios from 'axios'
import {baseURL} from "../utils/constant";

const ListCity=({citynames,setUpdateUI,updateMode})=>{
const[currentPage,setCurrentPage]=useState(1);
const recordsPerPage=5;
const lastIndex=currentPage*recordsPerPage;
const firstIndex=lastIndex-recordsPerPage;
const records=citynames.slice(firstIndex,lastIndex);
const nPage=Math.ceil(Object.keys(citynames).length/recordsPerPage);
const numbers=[...Array(nPage+1).keys()].slice(1);
var serialno=0;

serialno=(currentPage-1) * recordsPerPage;
const removeCity=(id)=>{
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
              எண்
              </th>
              <th>
              பெயர்
              </th>
              <th>
                லைன்
              </th>
              <th>
                செயல்
              </th>
            </tr>
          </thead>
          <tbody>
            {
              records && records.length>0
              ?
              (records.map((cityname,i)=>{
                serialno=serialno+1;
                return(
                  <tr>
                    <td>{serialno}</td>
                    <td>{cityname.cityname}</td>
                    <td>Line{cityname.citylineno}</td>
                    <td>
                    <BiEditAlt  className='icons' onClick={()=>updateMode(cityname._id,cityname.cityname,cityname.citylineno)} />
                    <BsTrash className='icons' onClick={()=>removeCity(cityname._id)} />
                    </td>
                  </tr>
                  
                )
              })
              )
              :
              "தரவு இல்லை"
            }
          </tbody>
        </Table>
        <nav>
        
          <Pagination>
            <Pagination.Prev >
            <a href="#" className='page-link' onClick={prevPage}>முன்</a>
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
            <a href="#" className='page-link' onClick={nextPage}>பின்</a>
            </Pagination.Next>
          </Pagination>
        </nav>

      </div>
    </Fragment>
  )

}
export default ListCity;
