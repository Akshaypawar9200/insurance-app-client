'use client'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CreateCustomer from '@/app/forms/createcustomer/CreateCustomer'
import CreateEmployee from '@/app/forms/createemployee/CreateEmployeee'
import { getAllCustomer } from '@/lib/employee/getAllCustomer'
import Table from '@/sharedcomponent/table/Table'
import './style.css'
import React, { useEffect, useState } from 'react'
import {deleteCustomer as deleteCustomer}from '../../../lib/employee/DeleteCustomer'
import {updateCustomer as updateCustomer} from '../../../lib/employee/UpdateCustomer'
import ReactDatePicker from "react-datepicker";
import {getAllState as getAllState} from '../../../lib/state/GetAllState'
import {getAllCityByStateId as getAllCityByStateId} from '../../../lib/state/GetStateIdByCity'
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { getAllCustomerByAgentId } from '@/lib/agent/Agent';
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
  const namePattern = /^[A-Za-z ]+$/;
  const [open, setOpen] = React.useState(false);
  const relation=["son","father","mother","wife","daughter"]
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("")
  const [state, setState] = useState([])
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")
  const [mobileno, setMobileno] = useState("")
  const [nominee, setNominee] = useState("")
  const [nomineeRelation, setNomineeRelation] = useState("")
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerData,setCustomerData]=useState([])
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);

  const [updateTable,setUpdateTable]=useState()
  const[customerId,setCustomerId]=useState()
  const[cityData,setCityData]=useState([])
  const[allState,setAllState]=useState([])
  const[stateId,setStateId]=useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const  handleCityById=async()=>{
    const response=await getAllCityByStateId()
    setCityData(prev=>response.data)
   }
   const handleGetAllState=async()=>{
    const response=await getAllState()
    console.log(response);
    setAllState(response.data)
   }
   
   useEffect(() => {
    handleGetAllState()
    handleCityById()
   }, [])

  useEffect(() => {
    handleSubmit()
    }, [limit,noOfPages])

    useEffect(() => {
      handleSubmit()
      }, [updateTable])
  const handleSubmit=async()=>{
    const params={
      limit:limit,
      page:noOfPages
    }
    const agentId=localStorage.getItem('id')
    const response=await getAllCustomerByAgentId(params,agentId)
    console.log("mnjnkmkll,ml,l",response.data)
    setCustomerData(prev=>response.data)
    setCount(prev=>response?.headers["x-total-count"])
  }
  const updateFunction = async (d) => {
  
    setOpen((prev) => true);
    setCustomerName(d.customerName);
    setEmail(d.email);
    setDob(d.dob)
    setState(d.state)
    setCity(d.city)
    setCustomerAddress(d.address)
    setPincode(d.pincode)
    setCustomerId(d.id);
    setMobileno(d.mobileno)
    setNominee(d.nominee)
    setNomineeRelation(d.nomineeRelation)
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // if (customerName.length==0||!namePattern.test(customerName)) {
       
      //   throw new Error('Please enter a customerName (only letters and spaces allowed).');
      // }
      // if (state.length==0||!namePattern.test(state)) {
       
      //   throw new Error('Please enter a stateName (only letters and spaces allowed).');
      // }
      // if (city.length==0||!namePattern.test(city)) {
       
      //   throw new Error('Please enter a cityName (only letters and spaces allowed).');
      // }
      // if (pincode.length==0) {
       
      //   throw new Error('plz enter pincode');
      // }
      // if (mobileno.length==0) {
       
      //   throw new Error('Please enter a mobileNo');
      // }
      // if (nominee.length==0||!namePattern.test(nominee)) {
       
      //   throw new Error('Please enter a nominee (only letters and spaces allowed).');
      // }
      // if (nomineeRelation.length==0||!namePattern.test(nomineeRelation)) {
       
      //   throw new Error('Please enter a nomineeRelation (only letters and spaces allowed).');
      // }
      // if (customerAddress.length==0||!namePattern.test(customerAddress)) {
       
      //   throw new Error('Please enter a customerAddress (only letters and spaces allowed).');
      // }

      // if (email.length==0) {
      //   throw new Error("invalid email");
      // }
    const body={


        "customerName":customerName,
        "email":email,
        "dob":dob,
        "address":customerAddress,
        "state":state,
        "city":city,
        "pincode":pincode,
        "mobileno":mobileno,
        "nominee":nominee,
        "nomineeRelation":nomineeRelation
    }

      
      const res = await updateCustomer(body,customerId);
      handleSubmit();
      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar('Customer updated', { variant: 'success' });
      }
      handleClose();
    } catch (error) {
    console.log(error);
    }
  };
  const deleteFunction = async (d) => {
    try {

      const res = await deleteCustomer(d.id);

      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar('Delete successful', { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SnackbarProvider autoHideDuration={3000} />
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form className="space-y-6 bg-transparent" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Update Customer
              </h5>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                value={customerName}
                  type="text"
                  onChange={(e) => {
                    setCustomerName(e.target.value);
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
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date Of Birth
                </label>
                <ReactDatePicker format="y-MM-dd"/>
                <input
                  value={dob}
                  type="date"
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </label>
                <textarea
                  value={customerAddress}
                  onChange={(e) => {
                    setCustomerAddress(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  id="w3review" name="w3review" rows="4" cols="50"></textarea>

              </div>
              <div>
        <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          State
        </label>
        <select
          
          onChange={(e) => {
            setState((prev)=>e.target.value)
           setStateId(prev=>e.target.value)
           handleCityById
          }
        }
          value={state} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Select State</option>
          {allState.map((stateOption, index) => (
            <option key={stateOption.stateName} value={stateOption.stateName} >
              {stateOption.stateName}
            </option>
          ))}
        </select>
      </div>
            
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  city
                </label>
                <select
          onChange={(e) => {
         
           setCity(prev=>e.target.value)
          }
        }
          value={city} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Select City</option>
          {cityData.map((cityOption, index) => (
            <option key={cityOption.stateName} value={cityOption.cityName} >
              {cityOption.cityName}
            </option>
          ))}
        </select>
              </div>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  pincode
                </label>
                <input
                value={pincode}
                  type="text"
                  onChange={(e) => {
                    setPincode(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mobileno
                </label>
                <input
                value={mobileno}
                  type="text"
                  onChange={(e) => {
                    setMobileno(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  nominee
                </label>
                <input
                  value={nominee}
                  type="text"
                  onChange={(e) => {
                    setNominee(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
        <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          nomineeRelation
        </label>
        <select
          onChange={(e) => {
            setNomineeRelation(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Select Nominee Relation</option>
          {relation.map((rel, index) => (
            <option key={index} value={rel}>
              {rel.charAt(0).toUpperCase() + rel.slice(1)}
            </option>
          ))}
        </select>
      </div>
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleUpdate}
              >
                Update Customer
              </button>
            </form>
        </Box>


      </Modal>
   <div className='customer-part'>
   <CreateCustomer handleSubmit={handleSubmit}/>

   </div>
 
    <Table
     data={customerData}
    count={count}
    limit={limit}
    page={page}
    setPage={setNoOfPages}
    updateButton={true}
    deleteButton={true}
    updateFunction={updateFunction}
    deleteFunction={deleteFunction}
    setShow={setOpen}
     />
 
    </>
  )
}

export default page