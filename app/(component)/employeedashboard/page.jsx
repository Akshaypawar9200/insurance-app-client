'use client'
import React, { useState,useEffect} from 'react'
import './sample.css'
import Navbar from '@/sharedcomponent/navbar/Navbar'
import { useRouter } from 'next/navigation'

const page = () => {
const [animationTriggered, setAnimationTriggered] = useState(false);

  const router=useRouter()
  useEffect(() => {
    setAnimationTriggered(true);
  }, []);
  const handleCustomer=()=>{
    router.push('/customer')
  }
  const handleAgent=()=>{
    router.push('/agent')
  }
  const handleInsuranceType=()=>{
    router.push('/insurancetype')
  }
  const handleAllPolicy=()=>{
    router.push('/employeepolicydashboard')
  }
  const handleAllFeedback=()=>{
    router.push('/employeefeedbackdashboard')
  }
  const handleAllPlan=()=>{
    router.push('/employeedashboardforplan')
  }
  return (
    <>
      <Navbar/>
   
      <div className="main-container">
        <div className="box">
          <div   className="card1">
          <div onClick={handleCustomer} className={`card ${animationTriggered ? 'animated' : ''}`}>
              <div  className="info">
                <h5>Customer</h5>
            </div>
          
            </div>
            <div  onClick={handleAgent} className={`card ${animationTriggered ? 'animated' : ''}`}><div className="info">
            <h5>Agent</h5>
            </div>
           
            </div>

          </div>
          <div className="card1">
            <div onClick={handleInsuranceType} className={`card ${animationTriggered ? 'animated' : ''}`}><div className="info">
            <h5>Insurance Type</h5>
            </div>
            
            </div>
            <div onClick={handleAllPlan}className={`card ${animationTriggered ? 'animated' : ''}`}><div className="info">
            <h5>Plan Type</h5>
            </div>
              
            </div>

          </div>
          <div className="card1">
            <div onClick={handleAllPolicy}  className={`card ${animationTriggered ? 'animated' : ''}`}>
              <div className="info">
              <h5>Policies</h5>
              </div></div>
            <div onClick={handleAllFeedback} className={`card ${animationTriggered ? 'animated' : ''}`}>
              <div className="info">
              <h5>Feedback</h5>
              </div></div>

          </div>
        </div>
      </div>

    </>
  )
}

export default page