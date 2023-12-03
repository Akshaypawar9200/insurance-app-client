import axios from "axios";
export const CreateNewTax = async (taxPercentage) => {
    const id="a43c636f-e6ea-4c06-8026-486a5b4bbc13"
    const res = await axios.put(`http://127.0.0.1:20200/api/v1/tax/${id}`, { taxPercentage }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}