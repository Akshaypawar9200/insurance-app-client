'use client'
import CreateAgent from '@/app/forms/createagent/CreateAgent'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Table from '@/sharedcomponent/table/Table'
import React, { useEffect, useState } from 'react'
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { getAllAgent } from '@/lib/employee/getAllAgent';
import { deleteAgent } from '@/lib/employee/DeleteAgent';
import { updateAgent } from '@/lib/employee/UpdateAgent';
import { MessageError, MessageSuccess } from '@/error/Error';


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
  const namePattern = /^[A-Za-z ]+$/;
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(5);
  const [noOfPages, setNoOfPages] = useState(1);
  const [updateTable, setUpdateTable] = useState()
  const [agentId, setAgentId] = useState()
  const [agentData, setAgentData] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [agentName, setAgentName] = useState("");

  const [email, setEmail] = useState("");
  const [agentAddress, setAgentAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const qualifications = [
    'BE Computer',
    'ME Computer',
    'MBA',
    'SSC',
    'HSC'

  ];
  const handleSubmit = async () => {
    const params = {
      limit: limit,
      page: noOfPages
    }
    const response = await getAllAgent(params)
    setAgentData(prev => response.data)
    setCount(prev => response?.headers["x-total-count"])
  }
  useEffect(() => {
    handleSubmit()
  }, [])

  useEffect(() => {
    handleSubmit()
  }, [updateTable])

  const updateFunction = async (d) => {
    setAgentId(d.id)
    setAgentName(d.agentName)
    setEmail(d.email)
    setAgentAddress(d.agentAddress)
    setQualification(d.qualification)



  };
  const deleteFunction = async (d) => {
    try {

      const res = await deleteAgent(d.id);
      handleSubmit();
      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        MessageSuccess("delete sucessfully")
      }
    } catch (error) {
     MessageError(error.message)
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (agentName.length == 0 || !namePattern.test(agentName)) {

        throw new Error('Please enter a agentName (only letters and spaces allowed).');
      }
      if (agentAddress.length == 0 || !namePattern.test(agentAddress)) {

        throw new Error('Please enter a agentAddress (only letters and spaces allowed).');
      }

      if (email.length == 0) {
        throw new Error("invalid email");
      }
      if (qualification.length == 0) {
        throw new Error("invalid qualification");
      }
      const body = {


        "agentName": agentName,
        "email": email,
        "agentAddress": agentAddress,
        "qualification": qualification
      }


      const res = await updateAgent(body, agentId);
      setOpen(prev=>false)
      handleSubmit();
      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        MessageSuccess("update sucessfully")
      }
    
    } catch (error) {
      MessageError(error.message)
    }
  };
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
              Update
            </h5>
            <div>
              <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Agent Name
              </label>
              <input
                value={agentName}
                type="text"
                onChange={(e) => {
                  setAgentName(e.target.value);
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
                Address
              </label>
              <textarea
                value={agentAddress}
                onChange={(e) => {
                  setAgentAddress(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                id="w3review" name="w3review" rows="4" cols="50"></textarea>

            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Qualification
              </label>
              <select
                value={qualification}
                onChange={(e) => {
                  setQualification(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="">Select Qualification</option>
                {qualifications.map((qualification, index) => (
                  <option key={index} value={qualification}>
                    {qualification}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleUpdate}
            >
              Update Agent
            </button>
          </form>
        </Box>


      </Modal>
      <CreateAgent handleSubmit={handleSubmit}/>
      <Table
        data={agentData}
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