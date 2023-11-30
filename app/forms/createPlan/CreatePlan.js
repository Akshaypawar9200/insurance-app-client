import { useEffect, useState } from "react";
import Spinner from "../../../sharedcomponent/spinner/Spinner";
import { MessageError, MessageSuccess } from "../../../error/Error";
import { CreateNewEmployee as CreateNewEmployee } from "../../../lib/employee/CreateNewEmployee";
import { SnackbarProvider } from "notistack";
import { CreateNewInsurance } from "@/lib/employee/Insurance";
import { getAllInsuranceType } from "@/lib/employee/GetAllInsuranceType";
import { CreateNewPlan } from "@/lib/admin/plan/Plan";
const CreatePlan = ({ handleSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const namePattern = /^[A-Za-z ]+$/;
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

  
  const [insurancePhoto, setinsurancePhoto] = useState();
  const[allInsurance,setAllInsurance]=useState([])
  const handleGetAllInsurance=async()=>{
    const response=await getAllInsuranceType()
    console.log(response);
    setAllInsurance(response.data)
   }
   useEffect(() => {
    handleGetAllInsurance()
   }, [])
  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      setIsLoading((prev) => true);

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
      const formData = new FormData();

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
console.log(data)
      const newData = JSON.stringify(data);
      let formdata = new FormData();
      formdata.append("image", insurancePhoto);
      formdata.append("data", newData);
      const response = await CreateNewPlan(formdata,insuranceId);
      handleSubmit();

      MessageSuccess("Created Added");
      return;
    } catch (error) {
      MessageError(error.message);
    } finally {
      setIsLoading((prev) => false);
    }
  };
  const handleUpload = (e) => {
    setinsurancePhoto((prev) => e.target.files[0]);
  };

  return (
    <>
      <SnackbarProvider autoHideDuration={3000} />
      <Spinner isLoading={isLoading} />
      <div className="mx-auto w-[25%]">
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create Plan
              </h5>
              <div>
                <label className="required block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Insurance Type
                </label>
                <select
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
              </div><div>
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
              </div>
              <div>
                <label>Upload Photo</label>
                <input type="file" onChange={handleUpload} />
              </div>
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleCreatePlan}
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

export default CreatePlan;
