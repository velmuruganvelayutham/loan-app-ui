import React,{Fragment,useState,useRef, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Pagination, Row } from "react-bootstrap";
import axios from 'axios'
import {baseURL} from "../utils/constant";
//import { type } from "os";

const ListReceipt=({pending,setpendingLoanFun})=>{
const[currentPage,setCurrentPage]=useState(1);
const[checked,setChecked]=useState(false);
const [receiptref,setReceiptRef]=useState([]);

useEffect(()=>{
  setReceiptRef(pending);
},[pending])

const handleChange=(e)=>{
  setReceiptRef({...receiptref,[e.target.name]:e.target.value})
}
//receiptref={loannumber,weekno,customerid,dueamount}
const recordsPerPage=10;
const lastIndex=currentPage*recordsPerPage;
const firstIndex=lastIndex-recordsPerPage;
const records=pending.slice(firstIndex,lastIndex);
const nPage=Math.ceil(Object.keys(pending).length/recordsPerPage);
const numbers=[...Array(nPage+1).keys()].slice(1);
var serialno=0;
serialno=(currentPage-1) * recordsPerPage;

const checkedAll=(e)=>{
    if(e.target.checked)
    {
      const ids=pending.map((item)=>{
        return item.loannumber
      })
      setSelectedItems(ids);
    }
    else
    {
      setSelectedItems([]);
    }

    const EditcheckAll=receiptref.map((item)=>
    {
      return {...item,["check"]:e.target.checked};
        
    });
    setReceiptRef(EditcheckAll);
    setpendingLoanFun(receiptref);

}
const[selectedItems,setSelectedItems]=useState([]);



const checkedSingle=(e,loanno)=>{
  let isSelect=e.target.checked;
  let value=parseInt(e.target.value)
    
    if(isSelect){
      setSelectedItems([...selectedItems,value])
    }
    else{

      setReceiptRef({...receiptref,[e.target.name]:false})

      setSelectedItems((prevData)=>{
        return prevData.filter((loannumber)=>{
          return loannumber!==value
      })
    })
    }
    
    const Editcheck=receiptref.map((item)=>
    {
      if(item.loannumber==loanno)
        return {...item,[e.target.name]:e.target.checked};
      return item
        
    });
    setReceiptRef(Editcheck)
    setpendingLoanFun(receiptref)
}

 const initialvalue={weak:"",amount:0}
 const[values,setValues]=useState(initialvalue);

  const onChangeInput=(e,loannumber)=>{
    const {name,value}=e.target
    const editData=pending.map((loan)=>
      loan.loannumber===loannumber && name ?{...loan,[name]:value}:loan
    )
    setValues(editData);

    const Editval=receiptref.map((item)=>
    {
      if(item.loannumber==loannumber)
        return {...item,[name]:value};
      return item
        
    });


    setReceiptRef(Editval);
    setpendingLoanFun(Editval);
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
  console.log(receiptref);
  return(
    <Fragment>
      <div  className="container-fluid ">
      <Table    className="table table-striped table-primary table-hover text-center fs-6 table-bordered border-dark  " size="sm">
          <thead>
            <tr >
            <th scope="col" lg={1} className="col-sm-12 col-md-1">
              <input type="checkbox" onClick={checkedAll} />
              </th>
              <th className="col-sm-12 col-md-1">
                Loan
              </th>
              <th className="col-sm-12 col-md-2">
                Week No
              </th>
              <th className="col-sm-12 col-md-4">
                Customer
              </th>
              <th className="col-sm-12 col-md-2 text-end">Due</th>
              <th className="col-sm-12 col-md-2 text-end">Amount</th>
              
            </tr>
          </thead>
          <tbody>
            {
              records && records.length>0
              ?
              (records.map((receiptlist,i)=>{
                serialno=serialno+1;
                return(
                  <tr key={receiptlist.loannumber}  >
                    <td className="checkbox" key={selectedItems.includes(receiptlist.loannumber)}>
                      <input name="check" type="checkbox" checked={selectedItems.includes(receiptlist.loannumber)} 
                      value={receiptlist.loannumber} onChange={(e)=>checkedSingle(e,receiptlist.loannumber)}  /></td>
                    <td >{receiptlist.loannumber}</td>
                    <td >
                    <input  className="form-control" name='weak' value={values.weak}  type="number"
                     onChange={(e)=>onChangeInput(e,receiptlist.loannumber)} disabled={!selectedItems.includes(receiptlist.loannumber)} />
                    </td>
                    <td >{receiptlist["_id"].customer}</td>
                    <td className="text-end">{receiptlist["_id"].dueamount}</td>
                    <td >
                    <input className="form-control text-end" name="amount" value={values.amount} 
                     type="number" onChange={(e)=>onChangeInput(e,receiptlist.loannumber)} disabled={!selectedItems.includes(receiptlist.loannumber)} />
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
export default ListReceipt;
