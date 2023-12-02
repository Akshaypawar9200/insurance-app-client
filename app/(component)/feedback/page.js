'use client'
import { getAllFeeedback } from '@/lib/feedback/GetAllFeedback'
import Table from '@/sharedcomponent/table/Table'
import React, { useEffect, useState } from 'react'
import './style.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {updateFeedback as updateFeedback} from '../../../lib/feedback/UpdateFeedback'
import { MessageError, MessageSuccess } from '@/error/Error'
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
  const [feedbackData, setFeedbackData] = useState([])
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);
  const [feedbackId, setFeedbackId] = useState()
  const[reply,setReply]=useState("")
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const allFeedback = async () => {
    const response = await getAllFeeedback()
    setFeedbackData(response.data.rows)
    handleClose();
  }

  useEffect(() => {
    allFeedback()
  }, [])


  const modelOpen=(e)=>{
    // e.preventDefault();
    handleOpen()
  }


  const replyFunction = (d) => {
    setFeedbackId(d.id)
    modelOpen()
  }

  const handleReply = async () => {
    try{
    const body={
    'reply':reply
    }
    const response=await updateFeedback(body,feedbackId)
    handleClose()
    allFeedback()
    MessageSuccess("reply successfully");
    return;
  } 
  catch (error) {
    console.log(error)
    MessageError(error.message);
  }
}
  
  

  return (
    <>
      <div className='feedback'>
        <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="space-y-6 bg-transparent" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Reply Feedback
            </h5>
            <div>
              <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Reply
              </label>
              <input
                value={reply}
                type="text"
                onChange={(e) => {
                  setReply(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></input>
            </div>
            

            <button
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleReply}
            >
              submit
            </button>
          </form>
        </Box>
      </Modal>
          <Table
            data={feedbackData}
            count={count}
            limit={limit}
            page={page}
            setPage={setNoOfPages}
            replyButton={true}
            replyFunction={replyFunction}

          />
        </div>
      </div>
    </>
  )
}

export default page