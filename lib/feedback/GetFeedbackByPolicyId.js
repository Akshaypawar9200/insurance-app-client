import axios from "axios";

export const getAllFeeedbackByPolicyId = async (id) => {
   
  const res = await axios.get(`http://127.0.0.1:20200/api/v1/feedback/${id}`, {
    headers: { auth: localStorage.getItem("auth") },
    // params: params,
  });
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44",res);
  return res;
};
