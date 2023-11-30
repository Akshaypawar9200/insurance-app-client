import axios from "axios";

export const updateEmployee = async (body,id) => {
console.log("::::::::::::::::::::::::::::::::::",body);
  const res = await axios.put(`http://127.0.0.1:20200/api/v1/employee/${id}`, body,{
    headers: { auth: localStorage.getItem("auth") },
    
  });

  return res;
};
