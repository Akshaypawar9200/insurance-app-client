'use client'

import CreatePolicy from '@/app/forms/createpolicy/CreatePolicy'
import React, { useEffect, useState } from 'react'
import Table from '@/sharedcomponent/table/Table';
import {getAllPolicy as getAllPolicy}from '../../../lib/customer/policy/getAllPolicy'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { emphasize } from '@mui/material';
import{createFeedback as createFeedback}from '../../../lib/feedback/CreateFeedback'
import CreatePolicyAgent from '@/app/forms/createpolicyAgent/CreatePolicyAgent';

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const[policyData,setPolicyData]=useState([])
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);
  const[policyId,setPoliyId]=useState()
  const[customerId]=useState(localStorage.getItem("id") || "")

  const[title,setTitle]=useState("")
  const[message,setMessage]=useState("")

  const handleAllPolicy=async()=>{

    const response=await getAllPolicy()
    setPolicyData(response.data)
  }
  useEffect(() => {
    handleAllPolicy()
}, [])
 
const feedbackFunction=(d)=>{
setPoliyId(d.id)
modelOpen()
}
const modelOpen=(e)=>{
  // e.preventDefault();
  handleOpen()
}

const handleFeedback=async(e)=>{
  e.preventDefault();
  try {
    if (title.length == 0 || !namePattern.test(title)) {

      throw new Error('Please enter a title (only letters and spaces allowed).');
    }
    if (message.length == 0 || !namePattern.test(message)) {

      throw new Error('Please enter a message (only letters and spaces allowed).');
    }
    const body={
      "message":message,
      "title":title,
      "policyId":policyId

    }
    const response=await createFeedback(body)
  handleClose()
  MessageSuccess("Employee Created");
  } catch (error) {
    MessageError(error.message);

  }
}
  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="space-y-6 bg-transparent" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Create Feedback
            </h5>
            <div>
              <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
               title
              </label>
              <input
                value={title}
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div>
            <div>
              <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Message
              </label>
              <input
                value={message}
                type="text"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div>
            <button
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleFeedback}
            >
              submit
            </button>
          </form>
        </Box>


      </Modal>
    <CreatePolicyAgent handleSubmit={handleAllPolicy}/>
    <Table
    data={policyData}
    count={count}
    limit={limit}
    page={page}
    setPage={setNoOfPages}
    feedbackButton={true}
    feedbackFunction={feedbackFunction}
    />
    </>
  )
}

export default page