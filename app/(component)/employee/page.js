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
import { deleteEmployee, getAllEployee, updateEmployee } from '@/lib/employee/CreateNewEmployee';
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
  const [employeeName, setemployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("")
  const [state, setState] = useState([])
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")
  const [mobileno, setMobileno] = useState("")
  const [nominee, setNominee] = useState("")
  const [nomineeRelation, setNomineeRelation] = useState("")
  const [customerAddress, setCustomerAddress] = useState("");
  const [employeeData,setemployeeData]=useState([])
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);

  const [updateTable,setUpdateTable]=useState()
  const[empId,setEmpId]=useState()
  const[cityData,setCityData]=useState([])
  const[allState,setAllState]=useState([])
  const[stateId,setStateId]=useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


 
   
   useEffect(() => {
 
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
    const response=await getAllEployee(params)
    setemployeeData(prev=>response.data)
    setCount(prev=>response?.headers["x-total-count"])
  }
  const updateFunction = async (d) => {
  
    setOpen((prev) => true);
    setemployeeName(d.employeeName);
    setEmail(d.email);
    setDob(d.dob)
    setState(d.state)
    setCity(d.city)
    setCustomerAddress(d.address)
    setPincode(d.pincode)
    setEmpId(d.id);
    setMobileno(d.mobileno)
    setNominee(d.nominee)
    setNomineeRelation(d.nomineeRelation)
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (employeeName.length==0||!namePattern.test(employeeName)) {
       
        throw new Error('Please enter a employeeName (only letters and spaces allowed).');
      }
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

      if (email.length==0) {
        throw new Error("invalid email");
      }
    const body={


        "employeeName":employeeName,
        "email":email,
    

    }

      
      const res = await updateEmployee(body,empId);
      handleSubmit();
      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar('Employee updated', { variant: 'success' });
      }
      handleClose();
    } catch (error) {
    console.log(error);
    }
  };
  const deleteFunction = async (d) => {
    try {

      const res = await deleteEmployee(d.id);

      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar('Delete successful', { variant: 'success' });
        handleSubmit()
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
                Update Employee
              </h5>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                value={employeeName}
                  type="text"
                  onChange={(e) => {
                    setemployeeName(e.target.value);
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
                onClick={handleUpdate}
              >
                Update Employee
              </button>
            </form>
        </Box>


      </Modal>
   <div className='customer-part'>
  <CreateEmployee handleSubmit={handleSubmit}/>

   </div>
 
    <Table
     data={employeeData}
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