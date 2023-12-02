import axios from "axios"

export const  createFeedback=async(body)=>{
const res=await axios.post(`http://127.0.0.1:20200/api/v1/feedback`,body,{headers: { auth: localStorage.getItem("auth") }})
console.log(res);
return res

}