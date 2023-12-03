'use client'
import React, { useEffect, useState } from 'react'
import {getAllPolicy as getAllPolicy}from '../../../lib/customer/policy/getAllPolicy'
import Table from '@/sharedcomponent/table/Table'
const page = () => {
    const [policyData,setPolicyData]=useState([])
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);
    const allPolicy=async()=>{
 const response=await getAllPolicy()
  setPolicyData(response.data)
    }

    useEffect   (() => {
        allPolicy()
    }, [])
    
  return (
   <>
   <Table
   data={policyData}
   count={count}
   limit={limit}
   page={page}
   setPage={setNoOfPages}
   />
   </>
  )
}

export default page