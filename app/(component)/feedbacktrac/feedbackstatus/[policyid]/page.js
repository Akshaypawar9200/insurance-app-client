'use client'
import React, { useEffect, useState } from 'react'
import { getAllFeeedbackByPolicyId as getAllFeeedbackByPolicyId  } from '@/lib/feedback/GetFeedbackByPolicyId';

import { useParams } from 'next/navigation';
import Table from '@/sharedcomponent/table/Table';
import './style.css'

const page = () => {
  const policyId=useParams()
 
  const [feedbackData, setFeedbackData] = useState([])
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);
  const handleFeedbackByPolicyId = async () => {
    
    const response = await getAllFeeedbackByPolicyId(policyId.policyid)
   
    setFeedbackData(response.data)
  
  }
 
  useEffect(() => {
    handleFeedbackByPolicyId()
  }, [])

  const makePaymentFunction=(d)=>{

  }

  return (
    <>
    <div className='statuses'>

    <div className='reply'>
    <Table
        data={feedbackData}
        count={count}
        limit={limit}
        page={page}
        setPage={setNoOfPages}
        

      />

    </div>
    </div>
    
      
    </>
  )
}

export default page