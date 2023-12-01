
import { useEffect, useState } from "react";
import Spinner from "../../../sharedcomponent/spinner/Spinner";
import { MessageError, MessageSuccess } from "../../../error/Error";
import { getAllAgent } from "@/lib/employee/getAllAgent";
import {getAllPlan as getAllPlan}from '../../../lib/admin/plan/Plan'
import{CreatePolicyes as CreatePolicyes}from '../../../lib/customer/policy/CreatePolicy'

const CreatePolicy = () => {
  const paymentMode=['Credit card/Debit card','UPI','Cash']
  const [isLoading, setIsLoading] = useState(false);
  const namePattern = /^[A-Za-z ]+$/;
  const[amount,setAmount]=useState()
  const[years,setYears]=useState()
  const[typeOfPremium,setTypeOfPremium]=useState()
  const[paymentMethods,setPaymentMethods]=useState()
  const[planId,setPlanId]=useState()
  const[planData,setPlanData]=useState([])
 

const handlePlan=async()=>{
const response=await getAllPlan()
setPlanData(response.data)
}
useEffect(() => {
    handlePlan()

}, [])


  const handleCreatePolicy = async (e) => {
   
    try {
      setIsLoading((prev) => true);
     
        
      // if (amount.length==0) {
       
      //   throw new Error('Please enter a amount');
      // }

      // if (years.length==0) {
       
      //   throw new Error('Please enter years');
      // }
      
      
      // if (typeOfPremium.length==0||!namePattern.test(typeOfPremium)) {
       
      //   throw new Error('Please enter a typeOfPremium (only letters and spaces allowed).');
      // }
      // if (paymentMethods.length==0) {
       
      //   throw new Error('Please select paymentMethods');
      // }

      const response = await CreatePolicyes(planId,amount,years,typeOfPremium,paymentMethods)
      console.log(response.data);

      MessageSuccess("Policy Created");
      return;
    } catch (error) {
      MessageError(error.message);
    } finally {
      setIsLoading((prev) => false);
    }
  };
 
 
  return (
    <>
      <Spinner isLoading={isLoading} />
      <div className="mx-auto w-[25%]">
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create Policy
              </h5>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Plan Name
                </label>
                <select
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Select Plan</option>
                  {planData.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.planName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Years
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Type of Premium
                </label>
                <input
                  type="text"
                  value={typeOfPremium}
                  onChange={(e) => setTypeOfPremium(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Payment Method
                </label>
                <select
                  value={paymentMethods}
                  onChange={(e) => setPaymentMethods(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Select Payment Method</option>
                  {paymentMode.map((method, index) => (
                    <option key={index} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleCreatePolicy}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Policy
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePolicy;
