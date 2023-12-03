'use client'
import React, { useEffect, useState } from 'react'
import { getAllFeeedbackByPolicyId } from '@/lib/feedback/GetFeedbackByPolicyId';
import Table from '@/sharedcomponent/table/Table';

const page = ({ params }) => {
  const policyId = params.policyId
  const [feedbackData, setFeedbackData] = useState([])
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);
  const handleFeedbackByPolicyId = async () => {
    const response = await getAllFeeedbackByPolicyId(policyId)
    setFeedbackData(response.data)
    console.log(response);
  }
  useEffect(() => {
    handleFeedbackByPolicyId()
  }, [])


  return (
    <>
      <Table
        data={feedbackData}
        count={count}
        limit={limit}
        page={page}
        setPage={setNoOfPages}


      />
    </>
  )
}

export default page