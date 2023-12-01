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
  const handleState=()=>{
    router.push('/adminstatedashboard')
  }
  const handleCity=()=>{
    router.push('/admincitydashboard')
  }

  return (
    <>
      <Navbar/>
   
      <div className="main-container">
        <div className="box">
          <div   className="card1">
          <div onClick={handleState} className={`card ${animationTriggered ? 'animated' : ''}`}>
              <div  className="info">
                <h5>State</h5>
            </div>
          
            </div>
            <div  onClick={handleCity} className={`card ${animationTriggered ? 'animated' : ''}`}><div className="info">
            <h5>City</h5>
            </div>
           
            </div>

          </div>
      
     
        </div>
      </div>

    </>
  )
}

export default page