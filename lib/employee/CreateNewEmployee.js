import axios from "axios";
export const CreateNewEmployee = async (formData) => {
    console.log(":::::::::::::::::::::::::::::::::::::::::::",formData);
    const res = await axios.post(`http://127.0.0.1:20200/api/v1/employee`, formData, { headers: { auth: localStorage.getItem("auth") } })
    return res
}
export const getAllEployee = async (params) => {
    const res = await axios.get(`http://127.0.0.1:20200/api/v1/employee`, {
      headers: { auth: localStorage.getItem("auth") },
      params: params,
    });
  
    return res;}
    export const deleteEmployee = async (id) => {
        const res = await axios.delete(`http://127.0.0.1:20200/api/v1/employee/${id}`, {
          headers: { auth: localStorage.getItem("auth") },
          // params: params,
        });
      
        return res;
      };
      export const updateEmployee = async (body,id) => {

        const res = await axios.put(`http://127.0.0.1:20200/api/v1/employee/${id}`, body,{
          headers: { auth: localStorage.getItem("auth") },
          
        });
      
        return res;
      };
           
      