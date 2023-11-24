import React, { useEffect } from 'react'
import {GetAllPlan as GetAllPlan} from '../../../lib/GetAllPlan'
const page = () => {
    const [planId,setPlanId]=useState()
    const handlePlan=async(e)=>{
        e.preventDefault()
        const response=await GetAllPlan(planId)
        console.log(response);
    }
    useEffect(() => {
        handlePlan();
    }, [planId]);

  return (
  <>
  <h1>Plans</h1>
  </>
  )
}

export default page