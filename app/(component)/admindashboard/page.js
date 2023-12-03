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
  const handleEmployee=()=>{
    router.push('/employee')
  }
  const handleInsurance=()=>{
    router.push('/admininsuranceplandashboard')
  }
  const handleInsuranceType=()=>{
    router.push('/insurancetype')
  }
  const handleStateCity=()=>{
    router.push('/admindasboardcitystate')
  }
  const handleAllFeedback=()=>{
    router.push('/feedback')
  }
  const handleTax=()=>{
    router.push('/admindashboardfortax')
  }
  return (
    <>
      <Navbar/>
   
      <div className="main-container">
        <div className="box">
          <div   className="card1">
          <div onClick={handleEmployee} className={`card ${animationTriggered ? 'animated' : ''}`}>
              <div  className="info">
                <h5>Employee</h5>
            </div>
          
            </div>
            <div  onClick={handleInsurance} className={`card ${animationTriggered ? 'animated' : ''}`}><div className="info">
            <h5>Insurance</h5>
            <h5>Plan</h5>

            </div>
           
            </div>

          </div>
          <div className="card1">
            <div onClick={handleInsuranceType} className={`card ${animationTriggered ? 'animated' : ''}`}><div className="info">
            <h5>Insurance Type</h5>
            </div>
            
            </div>
            <div onClick={handleStateCity} className={`card ${animationTriggered ? 'animated' : ''}`}><div className="info">
            <h5>State</h5>
            <h5>City</h5>

            </div>
              
            </div>

          </div>
          <div className="card1">
            <div onClick={handleTax} className={`card ${animationTriggered ? 'animated' : ''}`}>
              <div className="info">
              <h5>Tax</h5>
              </div></div>
            <div className={`card ${animationTriggered ? 'animated' : ''}`}>
              <div className="info">
              <h5>Statistic</h5>
              </div></div>

          </div>
        </div>
      </div>

    </>
  )
}

export default page