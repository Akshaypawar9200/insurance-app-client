'use client'
import { getAllFeeedback } from '@/lib/feedback/GetAllFeedback'
import Table from '@/sharedcomponent/table/Table'
import React, { useEffect, useState } from 'react'
import './style.css'
const page = () => {
const[feedbackData,setFeedbackData]=useState([])
const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);
const allFeedback=async()=>{
    const response=await getAllFeeedback() 
    setFeedbackData(response.data.rows)
}

useEffect(() => {
  allFeedback()
}, [])

  return (
    <>
    <div className='feedback'>
      <div>

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