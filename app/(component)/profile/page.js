'use client'
import { getEmployeeById } from '@/lib/profile/getEmpById'
import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './style.css'
import { updateEmployee } from '@/lib/employee/UpdateEmployee'
import { getCustomerById } from '@/lib/profile/getCustomerById'
import { MessageSuccess } from '@/error/Error';
import yash from 'public/assets/admin.png'
import Image from 'next/image'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};
const page = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const[name,setName]=useState("")
const[email,setEmail]=useState("")
const[image,SetImage]=useState("")
const[address,setAddress]=useState("")
const[mobileNo,setMobileNo]=useState()
const[pincode,setPincode]=useState()
const[nominee,setNominee]=useState("")
const[nomineeRelation,setNomineeRelation]=useState("")
const[role]=useState(localStorage.getItem("role") || "")


const handleMOdelButton=(e)=>{
e.preventDefault()
handleOpen()
}

if(role=="Employee"){
    const handleUserById=async()=>{
        const userId=localStorage.getItem("id")
        const response=await getEmployeeById(userId)
        setName(response.data.employeeName)
        setEmail(response.data.email)
        SetImage(response.data.employeeImgUrl)
        console.log(response,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      
    }
    useEffect(() => {
      handleUserById()
    }, [])

}
if(role=="Customer"){

    const handleUserById=async()=>{
        const userId=localStorage.getItem("id")
        const response=await getCustomerById(userId)
        setName(response.data.customerName)
        setEmail(response.data.email)
        SetImage(response.data.employeeImgUrl)
        setAddress(response.data.address)
        setMobileNo(response.data.mobileno)
        setNominee(response.data.nominee)
        setNomineeRelation(response.data.nomineeRelation)
        setPincode(response.data.pincode)
        console.log(response,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        
    }
    useEffect(() => {
      handleUserById()
    }, [image])

}



if(role=="Agent"){

    const handleUserById=async()=>{
        const userId=localStorage.getItem("id")
        // const response=await getEmployeeById(userId)
        // console.log(response,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        
    }
    useEffect(() => {
      handleUserById()
    }, [])

}
if(role=="Customer"){
    const handleUserById=async()=>{
        const userId=localStorage.getItem("id")
     
        
    }
    useEffect(() => {
      handleUserById()
    }, [])
}

 
    const handleUpdateProfileforCustomer=async(e)=>{
      
     

    }

    const handleUpdateProfileforEmployee=async(e)=>{
      try {
        e.preventDefault()
      handleOpen()
      const userId=localStorage.getItem("id")
      let body={
        "employeeName":name,
        "email":email
      }
      const response=await updateEmployee(body,userId) 
      if(response.status==200){
        MessageSuccess("profile update sucessfully")
        handleClose()
      }
      } catch (error) {
        
      }
   
      
    }
   









    const renderEmployeeForm = () => {
      return (
        <>
          <form className='profile-form'>
            <div className=''>
            <Image src="/assets/admin.png" alt="me" width="64" height="64" />
              {/* <img src={yash} height={'200px'} width={'200px'} alt='yashshah' /> */}
              {console.log(image)}
            </div>
            <div className='profile-details'>
              <div className='profile-field'>
                <label>Name</label>
                <p>{name}</p>
              </div>
              <div className='profile-field'>
                <label>Email</label>
                <p>{email}</p>
              </div>

            </div>
            {role === 'Employee' && <button onClick={handleMOdelButton}>Update Profile</button>}
          </form>
           <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="space-y-6 bg-transparent" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Update profile
            </h5>
            <div>
              <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                value={name}
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div>
            <div>
              <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div>
            <button
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleUpdateProfileforEmployee}
            >
              Update Employee
            </button>
            
          </form>
        </Box>


      </Modal>
        </>
      );
    };
    const renderCustomerForm = () => {
      return (
        <>
          <form className='profile-form'>
            <div className='profile-image'>
              <img src={image}/>
            </div>
            <div className='profile-details'>
              <div className='profile-field'>
                <label>Name</label>
                <p>{name}</p>
              </div>
              <div className='profile-field'>
                <label>Email</label>
                <p>{email}</p>
              </div>
              
              <div className='profile-field'>
                <label>MobileNo</label>
                <p>{mobileNo}</p>
              </div>
              <div className='profile-field'>
                <label>Address</label>
                <p>{address}</p>
              </div>
              <div className='profile-field'>
                <label>PinCode</label>
                <p>{pincode}</p>
              </div>
              <div className='profile-field'>
                <label>Nominee</label>
                <p>{nominee}</p>
              </div>
              <div className='profile-field'>
                <label>Nominee Relation</label>
                <p>{nomineeRelation}</p>
              </div>
            </div>
            {role === 'Customer' && <button onClick={handleUpdateProfileforCustomer}>Update Profile</button>}
          </form>
        </>
      );
    };
    
  return (
    <>
    <div className='profile-main'>
      <div className='profiles'>
        {role === 'Employee' && renderEmployeeForm()}
        {role === 'Customer' && renderCustomerForm()}
      </div>
    </div>
  
    
    </>
  )
}

export default page