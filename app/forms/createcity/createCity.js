import { useEffect, useState } from "react";
import Spinner from "../../../sharedcomponent/spinner/Spinner";
import { MessageError, MessageSuccess } from "../../../error/Error";
import { CreateNewEmployee as CreateNewEmployee } from "../../../lib/employee/CreateNewEmployee";
import { SnackbarProvider } from "notistack";
import { CreateNewInsurance } from "@/lib/employee/Insurance";
import { CreateNewState } from "@/lib/state/CreateState";
const CreateCity = ({handleSubmit}) => {
  const [isLoading, setIsLoading] = useState(false);
  const namePattern = /^[A-Za-z ]+$/;
  const [role, setRole] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setcityName] = useState("");
 
 const indianStates = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Jammu and Kashmir", "Ladakh"]


  const handleCreateCity = async (e) => {
   e.preventDefault()
    try {
      setIsLoading((prev) => true);
    
      if (stateName.length==0||!namePattern.test(stateName)) {
       
        throw new Error('Please enter a stateName (only letters and spaces allowed).');
    
      }
      if (cityName.length==0||!namePattern.test(cityName)) {
       
        throw new Error('Please enter a stateName (only letters and spaces allowed).');
    
      }
     
     
    
    
      const response = await CreateNewState(stateName)
      handleSubmit()

      MessageSuccess("Created Added");
      return;
    } catch (error) {
      MessageError(error.message);
    } finally {
      setIsLoading((prev) => false);
    }
  };

 
  return (
    <>
        <SnackbarProvider autoHideDuration={3000}/>
      <Spinner isLoading={isLoading} />
      <div className="mx-auto w-[25%]">
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create City
              </h5>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select State
                </label>
               
              </div>
              <select
          onChange={(e) => {
         
            setStateName(prev=>e.target.value)
          }
        }
          
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Select State</option>
          {indianStates.map((state, index) => (
            <option key={index} value={state} >
              {state}
            </option>
          ))}
        </select>
        <div>
               
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                city Name
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setAgentName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleCreateState}
              >
                Create City
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCity;
