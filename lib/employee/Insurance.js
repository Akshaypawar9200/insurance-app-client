import axios from "axios";
export const CreateNewInsurance = async (formData) => {
    console.log(":::::::::::::::::::::::::::::::::::::::::::",formData);
    const res = await axios.post(`http://127.0.0.1:20200/api/v1/insurancetype`, formData, { headers: { auth: localStorage.getItem("auth") } })
    return res
}
export const getAllInsurance = async (params) => {
    const res = await axios.get(`http://127.0.0.1:20200/api/v1/insurancetype`, {
      headers: { auth: localStorage.getItem("auth") },
      params: params,
    });
  
    return res;}
    export const deleteInsurance = async (id) => {
        const res = await axios.delete(`http://127.0.0.1:20200/api/v1/insurancetype/${id}`, {
          headers: { auth: localStorage.getItem("auth") },
          // params: params,
        });
      
        return res;
      };
      export const updateInsurance = async (body,id) => {

        const res = await axios.put(`http://127.0.0.1:20200/api/v1/insurancetype/${id}`, body,{
          headers: { auth: localStorage.getItem("auth") },
          
        });
      
        return res;
      };
              