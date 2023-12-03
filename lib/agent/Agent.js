import axios from "axios";
export const CreateNewCity = async (data,id) => {
    
    const res = await axios.post(`http://127.0.0.1:20200/api/v1/city/${id}`,data, { headers: { auth: localStorage.getItem("auth") } })
    return res
}
export const getStateById = async (id) => {
    const res = await axios.get(`http://127.0.0.1:20200/api/v1/state/${id}`, {
      headers: { auth: localStorage.getItem("auth") },
   
    });
console.log(res,"??????????????????????????????????");
    return res;
  }
  export const getAllCustomerByAgentId= async (params,id) => {
    const res = await axios.get(`http://127.0.0.1:20200/api/v1/allCustomer/agentId/${id}`, {
      headers: { auth: localStorage.getItem("auth") },
      params:params
    });

    return res;
  }
  export const updateCity = async (body,id) => {
      const res = await axios.put(`http://127.0.0.1:20200/api/v1/city/${id}`, body,{
        headers: { auth: localStorage.getItem("auth") },
        
      });
    
      return res;
    };