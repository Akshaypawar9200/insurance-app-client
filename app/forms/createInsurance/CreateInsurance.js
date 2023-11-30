import { useEffect, useState } from "react";
import Spinner from "../../../sharedcomponent/spinner/Spinner";
import { MessageError, MessageSuccess } from "../../../error/Error";
import { CreateNewEmployee as CreateNewEmployee } from "../../../lib/employee/CreateNewEmployee";
import { SnackbarProvider } from "notistack";
import { CreateNewInsurance } from "@/lib/employee/Insurance";
const CreateInsurance = ({handleSubmit}) => {
  const [isLoading, setIsLoading] = useState(false);
  const namePattern = /^[A-Za-z ]+$/;
  const [role, setRole] = useState("");
  const [insuranceName, setInsuranceType] = useState("");
 
  const [insurancePhoto, setinsurancePhoto] = useState()


  const handleCreateEmployee = async (e) => {
   e.preventDefault()
    try {
      setIsLoading((prev) => true);
    
      if (insuranceName.length==0||!namePattern.test(insuranceName)) {
       
        throw new Error('Please enter a insuranceName (only letters and spaces allowed).');
    
      }
      const formData=new FormData()
      let data={
        "insuranceName":insuranceName,
      
        
      }
    
      const newData=JSON.stringify(data)
      let formdata = new FormData();
      formdata.append("image", insurancePhoto);
      formdata.append("data",newData );
      const response = await CreateNewInsurance(formdata)
      handleSubmit()

      MessageSuccess("Created Added");
      return;
    } catch (error) {
      MessageError(error.message);
    } finally {
      setIsLoading((prev) => false);
    }
  };
  const handleUpload=(e)=>{
    setinsurancePhoto(prev=>e.target.files[0])
    
  }
 
  return (
    <>
        <SnackbarProvider autoHideDuration={3000}/>
      <Spinner isLoading={isLoading} />
      <div className="mx-auto w-[25%]">
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create Insurance Type
              </h5>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Insurance Type
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setInsuranceType(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
             
              <div>
                <label>
                    Upload Photo
                  </label>
                  <input type="file"  onChange={handleUpload}/>
              </div>
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleCreateEmployee}
              >
                Create Insurance
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInsurance;
