import { useEffect, useState } from "react";
import Spinner from "../../../sharedcomponent/spinner/Spinner";
import { MessageError, MessageSuccess } from "../../../error/Error";
import { CreateNewCustomer } from "../../../lib/employee/CreateNewCustomer";
import ReactDatePicker from "react-datepicker";
import { SnackbarProvider } from "notistack";
import {getAllState as getAllState} from '../../../lib/state/GetAllState'
import {getAllCityByStateId as getAllCityByStateId} from '../../../lib/state/GetStateIdByCity'

import { Prev } from "react-bootstrap/esm/PageItem";
import './style.css'
const CreateCustomer = ({ }) => {
  const relation=["son","father","mother","wife","daughter"]
  const namePattern = /^[A-Za-z ]+$/;
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("")
  const [state, setState] = useState([])
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")
  const [mobileno, setMobileno] = useState("")
  const [nominee, setNominee] = useState("")
  const [nomineeRelation, setNomineeRelation] = useState("")
  const [customerAddress, setCustomerAddress] = useState("");

  const [photo,setPhoto]=useState()
  const[adhar,setAdhar]=useState()
  const[pancard,setPanCard]=useState()
  const[allState,setAllState]=useState([])
  const[stateId,setStateId]=useState("")
  const[cityData,setCityData]=useState([])
 const  handleCityById=async()=>{
  const response=await getAllCityByStateId()
  setCityData(prev=>response.data)
 }
 const  handleChangePhoto=(e)=>{
  setPhoto((prev) => e.target.files[0]);
 }
 const  handleChangeAdhar=(e)=>{
  setAdhar((prev) => e.target.files[0]);
 }
 const  handleChangePanCard=(e)=>{
  setPanCard((prev) => e.target.files[0]);
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

  const handleCreateCustomer = async (e) => {

 e.preventDefault()


    try {
      setIsLoading((prev) => true);
      if (customerName.length==0||!namePattern.test(customerName)) {
       
        throw new Error('Please enter a customerName (only letters and spaces allowed).');
      }
      // if (state.length==0||!namePattern.test(state)) {
       
      //   throw new Error('Please enter a stateName (only letters and spaces allowed).');
      // }
      if (city.length==0||!namePattern.test(city)) {
       
        throw new Error('Please enter a cityName (only letters and spaces allowed).');
      }
      if (pincode.length==0) {
       
        throw new Error('plz enter pincode');
      }
      if (mobileno.length==0) {
       
        throw new Error('Please enter a mobileNo');
      }
      if (nominee.length==0||!namePattern.test(nominee)) {
       
        throw new Error('Please enter a nominee (only letters and spaces allowed).');
      }
      if (nomineeRelation.length==0||!namePattern.test(nomineeRelation)) {
       
        throw new Error('Please enter a nomineeRelation (only letters and spaces allowed).');
      }
      if (customerAddress.length==0||!namePattern.test(customerAddress)) {
       
        throw new Error('Please enter a customerAddress (only letters and spaces allowed).');
      }
      if (username.length==0||!namePattern.test(username)) {
       
        throw new Error('Please enter a username (only letters and spaces allowed).');
      }
  
      if (password.length==0) {
        throw new Error("invalid password");
      }
      if (email.length==0) {
        throw new Error("invalid email");
      }
      let data
    if(localStorage.getItem('role')=="Agent"){
      data={
        "customerName":customerName,
        "username":username,
        "password":password,
        "email":email,
        "dob":dob,
        "address":customerAddress,
        "state":state,
        "city":city,
        "pincode":pincode,
        "mobileno":mobileno,
        "nominee":nominee,
        "nomineeRelation":nomineeRelation,
        "agentId":localStorage.getItem('id')
      }
    }else{
      data={
        "customerName":customerName,
        "username":username,
        "password":password,
        "email":email,
        "dob":dob,
        "address":customerAddress,
        "state":state,
        "city":city,
        "pincode":pincode,
        "mobileno":mobileno,
        "nominee":nominee,
        "nomineeRelation":nomineeRelation,
      }
    }
      
        

      
      const newData=JSON.stringify(data)
      let formdata = new FormData();
      formdata.append("image", photo);
      formdata.append("addharcard",adhar)
      formdata.append("pancard",pancard)
      formdata.append("data",newData );
      console.log(":::::::::::::::::::::::::::::::::",formdata);
      const response = await CreateNewCustomer(formdata)
      console.log(response.data);
   
      MessageSuccess("Created Added");
      return;
    } catch (error) {
      console.log(error)
      MessageError(error.message);
    } finally {
      setIsLoading((prev) => false);
    }
  };
  return (
    <>
    <SnackbarProvider autoHideDuration={3000}/>
      <Spinner isLoading={isLoading} />
      <div className=" mx-auto w-[25%]">
        <div className="formcsss flex justify-center mt-10">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6 bg-transparent" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create Customer
              </h5>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
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
           
                <input
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
          //  setStateId(prev=>e.target.value)
          //  handleCityById
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
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Photo
                </label>
                <input
                  type="file"
                  onChange={handleChangePhoto}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>

              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Adhar card
                </label>
                <input
                  type="file"
                  onChange={handleChangeAdhar}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>

              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Pan Card
                </label>
                <input
                  type="file"
                  onChange={handleChangePanCard}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>

              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleCreateCustomer}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCustomer;
