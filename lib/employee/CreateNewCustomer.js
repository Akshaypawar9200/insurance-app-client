import axios from "axios";
export const CreateNewCustomer = async (formData) => {
  console.log(formData,"#############")
    const res = await axios.post(`http://127.0.0.1:20200/api/v1/customer`, formData, { headers: { auth: localStorage.getItem("auth") } })
    return res
    // return {data:"yash"}
}

