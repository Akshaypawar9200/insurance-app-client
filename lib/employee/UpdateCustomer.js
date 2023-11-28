import axios from "axios";

export const updateCustomer = async (body,id) => {

  const res = await axios.put(`http://127.0.0.1:20200/api/v1/customer/${id}`, body,{
    headers: { auth: localStorage.getItem("auth") },
    
  });

  return res;
};
