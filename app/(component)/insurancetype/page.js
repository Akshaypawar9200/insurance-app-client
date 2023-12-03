'use client'
import { getAllInsuranceType } from '@/lib/employee/GetAllInsuranceType';
import Table from '@/sharedcomponent/table/Table';
import React, { useEffect, useState } from 'react'
import './style.css'
const page = () => {
    const [insuranceTypeData,setInsuranceTypeData]=useState([])
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);


  const [reset, setReset] = useState(false)
  const[verify,setVerify]=useState(false)
  const[filterInsuranceName,setFilterInsuranceName]=useState("")

 
  const handleInsuranceName=(e)=>{
    setFilterInsuranceName(e.target.value)
  }


    // handle filter button
    const handleFilterButton = (e) => {
      try {
        if (!filterInsuranceName) {
  
          throw new Error("Please enter at least one filter field");
          
        }
        setNoOfPages(prev => 1) 
        handleSubmit(e)
      } catch (error) {
        MessageError(error.message) 
      }
    };

        // Function to reset filter inputs and trigger a reset
        const resetButton = () => {
          try {
            setFilterInsuranceName(prev => "")
           
          
            setNoOfPages(1); 
            setLimit(1); 
            setReset((prev) => !prev);
            handleSubmit(); 
          } catch (error) {
           console.log(error);
          }
        }

  const [reset, setReset] = useState(false)
  const[verify,setVerify]=useState(false)
  const[filterInsuranceName,setFilterInsuranceName]=useState("")

 
  const handleInsuranceName=(e)=>{
    setFilterInsuranceName(e.target.value)
  }


    // handle filter button
    const handleFilterButton = (e) => {
      try {
        if (!filterInsuranceName) {
  
          throw new Error("Please enter at least one filter field");
          
        }
        setNoOfPages(prev => 1) 
        handleSubmit(e)
      } catch (error) {
        MessageError(error.message) 
      }
    };

        // Function to reset filter inputs and trigger a reset
        const resetButton = () => {
          try {
            setFilterInsuranceName(prev => "")
           
          
            setNoOfPages(1); 
            setLimit(1); 
            setReset((prev) => !prev);
            handleSubmit(); 
          } catch (error) {
           console.log(error);
          }
        }
useEffect(() => {
    handleSubmit()
}, [])

  const handleSubmit=async()=>{
    const params={
      limit:limit,
      page:noOfPages,
      insuranceName:filterInsuranceName
    }
    const response=await getAllInsuranceType(params)
    
    setInsuranceTypeData(prev=>response.data)
    setCount(prev=>response?.headers["x-total-count"])
  }
  return (
    <>
<div className="parent-filter">
      <div className="form-cont">
        <div>
          <input type="text" placeholder="Name" onChange={handleInsuranceName} value={filterInsuranceName} />
        </div>
        
         
     
        <div>
          <button className="btn btn-success" onClick={handleFilterButton}>Submit</button>
        </div>
        <div>
          <button type="button" className="btn btn-danger" onClick={resetButton}>Reset</button>
        </div>
      </div>
    </div>

    <div className='insuranceType-main-Part'>
        <div className='insuranceType-Container'>

        <Table
     data={insuranceTypeData}
    count={count}
    limit={limit}
    page={page}
    setPage={setNoOfPages}
    updateButton={false}
    deleteButton={false}
    
     />
        </div>
    

    </div>

    
     
    </>
  )
}

export default page