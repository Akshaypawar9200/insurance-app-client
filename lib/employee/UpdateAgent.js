import axios from "axios";

export const updateAgent = async (body,id) => {

  const res = await axios.put(`http://127.0.0.1:20200/api/v1/agent/${id}`, body,{
    headers: { auth: localStorage.getItem("auth") },
    
  });

  return res;
};
