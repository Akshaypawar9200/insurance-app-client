"use client";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CreateCustomer from "@/app/forms/createcustomer/CreateCustomer";
import CreateEmployee from "@/app/forms/createemployee/CreateEmployeee";
import { getAllCustomer } from "@/lib/employee/getAllCustomer";
import Table from "@/sharedcomponent/table/Table";
import "./style.css";
import React, { useEffect, useState } from "react";
import { deleteCustomer as deleteCustomer } from "../../../lib/employee/DeleteCustomer";
import { updateCustomer as updateCustomer } from "../../../lib/employee/UpdateCustomer";
import ReactDatePicker from "react-datepicker";
import { getAllState as getAllState } from "../../../lib/state/GetAllState";
import { getAllCityByStateId as getAllCityByStateId } from "../../../lib/state/GetStateIdByCity";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import {
  deleteEmployee,
  getAllEployee,
  updateEmployee,
} from "@/lib/employee/CreateNewEmployee";
import CreateInsurance from "@/app/forms/createInsurance/CreateInsurance";
import { getAllInsuranceType } from "@/lib/employee/GetAllInsuranceType";
import { deleteInsurance, updateInsurance } from "@/lib/employee/Insurance";
import CreateState from "@/app/forms/createstate/createState";
import { updateState } from "@/lib/state/CreateState";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const page = () => {
  const namePattern = /^[A-Za-z ]+$/;
  const [open, setOpen] = React.useState(false);

  const [insuranceName, setStateName] = useState("");
  const [status, setStatus] = useState();

  const [insuranceType, setinsuranceType] = useState([]);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);

  const [updateTable, setUpdateTable] = useState();
  const [empId, setEmpId] = useState();
  const [id, setId] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {}, []);

  useEffect(() => {
    handleSubmit();
  }, [limit, noOfPages]);

  useEffect(() => {
    handleSubmit();
  }, [updateTable]);
  const handleSubmit = async () => {
    const params = {
      limit: limit,
      page: noOfPages,
    };
    const response = await getAllState(params);
    setinsuranceType((prev) => response.data);
    setCount((prev) => response?.headers["x-total-count"]);
  };
  const updateFunction = async (d) => {
    setOpen((prev) => true);
    // setStateName(d.stateName);
    setStatus(d.status);
    setId(d.id)
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
     
      
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

      if (status.length == 0) {
        throw new Error("invalid status");
      }
      const body = {
        // insuranceName: insuranceName,
        status: status,
      };

      const res = await updateState(body, id);
      handleSubmit();
      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar("State's Status updated", { variant: "success" });
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFunction = async (d) => {
    try {
      const res = await del(d.id);

      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar("Delete successful", { variant: "success" });
        handleSubmit();
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
              Update Insurance Type
            </h5>
            <div>
              <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                status
              </label>
              <select
              value={status}
                class="form-select"
                aria-label="Default select example"
                onChange={(e)=>setStatus((prev) => e.target.value)}
              >
                <option selected>Open this select menu</option>
                <option value={true}>Active</option>
                <option value={false}>InActive</option>
              </select>
            </div>

            <button
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleUpdate}
            >
              Update Status
            </button>
          </form>
        </Box>
      </Modal>
      <div className="customer-part">
        {/* <CreateEmployee handleSubmit={handleSubmit}/> */}
        {/* <CreateInsurance handleSubmit={handleSubmit} /> */}
        <CreateState handleSubmit={handleSubmit}/>
      </div>

      <Table
        data={insuranceType}
        count={count}
        limit={limit}
        page={page}
        setPage={setNoOfPages}
        updateButton={true}
        // deleteButton={true}
        updateFunction={updateFunction}
        // deleteFunction={deleteFunction}
        setShow={setOpen}
      />
    </>
  );
};

export default page;
