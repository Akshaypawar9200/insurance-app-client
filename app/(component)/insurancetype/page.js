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

useEffect(() => {
    handleSubmit()
}, [])

  const handleSubmit=async()=>{
    const params={
      limit:limit,
      page:noOfPages
    }
    const response=await getAllInsuranceType(params)
    setInsuranceTypeData(prev=>response.data)
    setCount(prev=>response?.headers["x-total-count"])
  }
  return (
    <>


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