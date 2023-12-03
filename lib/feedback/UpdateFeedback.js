import axios from "axios";

export const updateFeedback = async (body,id) => {

  const res = await axios.put(`http://127.0.0.1:20200/api/v1/feedback/${id}`, body,{
    headers: { auth: localStorage.getItem("auth") },
    
  });

  return res;
};
