'use client'
import React, { useState, useEffect } from 'react'
import './style.css'
import Navbar from '@/sharedcomponent/navbar/Navbar'
import { useRouter } from 'next/navigation'

const page = () => {
    const [animationTriggered, setAnimationTriggered] = useState(false);

    const router = useRouter()
    useEffect(() => {
        setAnimationTriggered(true);
    }, []);
    const handleCreatePolicy = () => {
        router.push('/policyforcustomer')
    }
    const handleAgent = () => {
        // router.push('/agent')
    }
    const handleInsuranceType = () => {
        // router.push('/insurancetype')
    }
    return (
        <>
        <Navbar />
  
        <div className="main-container">
          <div className="box">
            <div className="card1">
              <div onClick={handleInsuranceType} className={`card ${animationTriggered ? 'animated' : ''}`}>
                <div className="info">
                  <h5>Insurance Type</h5>
                </div>
              </div>
              <div className={`card ${animationTriggered ? 'animated' : ''}`}>
                <div className="info">
                  <h5>Plan Type</h5>
                </div>
              </div>
              <div  onClick={handleCreatePolicy}className={`card ${animationTriggered ? 'animated' : ''}`}>
                <div className="info">
                  <h5>Policies</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
            )
}

            export default page