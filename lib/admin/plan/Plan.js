import axios from "axios";
export const CreateNewPlan = async (formData,id) => {
    
    const res = await axios.post(`http://127.0.0.1:20200/api/v1/plan/${id}`, formData, { headers: { auth: localStorage.getItem("auth") } })
    return res
}
export const getAllPlan = async (params) => {
    const res = await axios.get(`http://127.0.0.1:20200/api/v1/plan`, {
      headers: { auth: localStorage.getItem("auth") },
      params: params,
    });
console.log(res,"??????????????????????????????????");
    return res;
  }
    export const deletePlan = async (id) => {
        const res = await axios.delete(`http://127.0.0.1:20200/api/v1/plan/${id}`, {
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
              