import axios from "axios";

export const deleteAgent = async (id) => {
  const res = await axios.delete(`http://127.0.0.1:20200/api/v1/agent/${id}`, {
    headers: { auth: localStorage.getItem("auth") },
    // params: params,
  });

  return res;
};
