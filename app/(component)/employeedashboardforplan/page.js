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
import CreatePlan from "@/app/forms/createPlan/CreatePlan";
import { deletePlan, getAllPlan } from "@/lib/admin/plan/Plan";
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

  const [insuranceName, setinsuranceName] = useState("");
  const [status, setStatus] = useState();

  const [insuranceType, setinsuranceType] = useState([]);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(2);
  const [noOfPages, setNoOfPages] = useState(1);

  const [updateTable, setUpdateTable] = useState();
  const [empId, setEmpId] = useState();
  const [id, setId] = useState();
  const numberPattern = /^[0-9]+$/;
  const [planName, setPlanName] = useState("");
  const [policyTermMin, setPolicyTermMin] = useState(0);
  const [policyTermMax, setPolicyTermMax] = useState(0);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [minInvestmentAmount, setMinInvestmentAmount] = useState(0);
  const [maxInvestmentAmount, setMaxInvestmentAmount] = useState(0);
  const [profitRatio, setProfitRatio] = useState(0);
  const [commissionAmount, setCommissionAmount] = useState(0);
  const [insuranceId, setInsuranceId] = useState("");
  const[allInsurance,setAllInsurance]=useState([])
  const handleGetAllInsurance=async()=>{
    const response=await getAllInsuranceType()
    console.log(response);
    setAllInsurance(response.data)
   }
   useEffect(() => {
    handleGetAllInsurance()
   }, [])
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
    const response = await getAllPlan(params);
    setinsuranceType((prev) => response.data);
    setCount((prev) => response?.headers["x-total-count"]);
  };
  const updateFunction = async (d) => {
    setOpen((prev) => true);
   
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (planName.length == 0 || !namePattern.test(planName)) {
        throw new Error(
          "Please enter a planName (only letters and spaces allowed)."
        );
      }
      if (policyTermMin == 0 || !numberPattern.test(policyTermMin)) {
        throw new Error(
          "Please enter a policyTermMin (only letters and spaces allowed)."
        );
      }    if (policyTermMax == 0 || !numberPattern.test(policyTermMax)) {
        throw new Error(
          "Please enter a policyTermMax (only letters and spaces allowed)."
        );
      }    if (minAge == 0 || !numberPattern.test(minAge)) {
        throw new Error(
          "Please enter a minAge (only letters and spaces allowed)."
        );
      }    if (maxAge == 0 || !numberPattern.test(maxAge)) {
        throw new Error(
          "Please enter a maxAge (only letters and spaces allowed)."
        );
      }    if (minInvestmentAmount == 0 || !numberPattern.test(minInvestmentAmount)) {
        throw new Error(
          "Please enter a minInvestmentAmount (only letters and spaces allowed)."
        );
      }
      if (maxInvestmentAmount == 0 || !numberPattern.test(maxInvestmentAmount)) {
        throw new Error(
          "Please enter a maxInvestmentAmount (only letters and spaces allowed)."
        );
      }if (profitRatio == 0 || !numberPattern.test(profitRatio)) {
        throw new Error(
          "Please enter a profitRatio (only letters and spaces allowed)."
        );
      }if (commissionAmount == 0 || !numberPattern.test(commissionAmount)) {
        throw new Error(
          "Please enter a commissionAmount (only letters and spaces allowed)."
        );
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

      
      let data = {
        planName: planName,
        policyTermMin:Number(policyTermMin),
        policyTermMax:Number(policyTermMax),
        minAge:Number(minAge),
        maxAge: Number(maxAge),
        minInvestmentAmount: Number(minInvestmentAmount),
        maxInvestmentAmount:Number(maxInvestmentAmount),
        profitRatio: Number(profitRatio),
        commissionAmount:Number(commissionAmount),
      };

      const res = await updateInsurance(body, id);
      handleSubmit();
      if (res.status === 200) {
        setUpdateTable((prev) => !prev);
        enqueueSnackbar("Employee updated", { variant: "success" });
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFunction = async (d) => {
    try {
      const res = await deletePlan(d.id);

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
                  Insurance Type
                </label>
                <select
                value={insuranceName}
          onChange={(e) => {
         
           setInsuranceId(prev=>e.target.value)
          }
        }
          
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Select City</option>
          {allInsurance.map((insuranceOption, index) => (
            <option key={insuranceOption.id} value={insuranceOption.id} >
              {insuranceOption.insuranceName}
            </option>
          ))}
        </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Plan Name
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPlanName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                PolicyTermMin
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPolicyTermMin(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div><div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                PolicyTermMax
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPolicyTermMax(e.target.value);

                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div><div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                MinAge
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setMinAge(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div><div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                MaxAge
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setMaxAge(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              {/* <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                MinInvestmentAmount
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setMinInvestmentAmount(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div><div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                MaxInvestmentAmount
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setMaxInvestmentAmount(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div><div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ProfitRatio
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setProfitRatio(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div><div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                CommissionAmount
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setCommissionAmount(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div> */}

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
      {/* <div className="customer-part"> */}
        {/* <CreateEmployee handleSubmit={handleSubmit}/> */}
        {/* <CreatePlan handleSubmit={handleSubmit}/> */}
      {/* </div> */}
      <div className="plans">
<div>
<Table
        data={insuranceType}
        count={count}
        limit={limit}
        page={page}
        setPage={setNoOfPages}
        updateButton={false}
        deleteButton={false}
        updateFunction={updateFunction}
        deleteFunction={deleteFunction}
        setShow={setOpen}
      />

</div>
      

      </div>
     
    </>
  );
};

export default page;
