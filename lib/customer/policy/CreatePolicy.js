import axios from "axios";
export const CreatePolicyes = async (id,amount,years,typeofpremimum,paymentMethod) => {
   
    const res = await axios.post(`http://127.0.0.1:20200/api/v1/policy/${id}`,{amount,years,typeofpremimum,paymentMethod}, { headers: { auth: localStorage.getItem("auth") } })
    console.log(res,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    return res
}