import axios from "axios";
export const CreateNewAgent = async (agentName, username, password, email,agentAddress,qualification,id) => {

    const res = await axios.post(`http://127.0.0.1:20200/api/v1/agent`, { agentName, username, password, email,agentAddress,qualification,id }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}