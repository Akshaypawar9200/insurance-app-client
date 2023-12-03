import axios from "axios";

export const updatePayments = async (id,body) => {

  const res = await axios.put(`http://127.0.0.1:20200/api/v1/paymentdetails/${id}`, body,{
    headers: { auth: localStorage.getItem("auth") },
    
  });

  return res;
};
