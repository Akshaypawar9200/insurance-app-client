import axios from "axios";
export const CreateNewAgent = async (formdata,id) => {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",formdata,id);
    const res = await axios.post(`http://127.0.0.1:20200/api/v1/agent/${id}`, formdata, { headers: { auth: localStorage.getItem("auth") } })
    return res
}