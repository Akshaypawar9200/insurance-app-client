import axios from "axios"

export const  GetAllInsuranceType=async(username,password,role)=>{

const res=await axios.get(`http://127.0.0.1:20200/api/v1/insurancetype`)
return res

}