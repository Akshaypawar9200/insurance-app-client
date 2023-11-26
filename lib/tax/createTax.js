import axios from "axios";
export const CreateNewTax = async (taxPercentage) => {

    const res = await axios.post(`http://127.0.0.1:20200/api/v1/tax`, { taxPercentage }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}