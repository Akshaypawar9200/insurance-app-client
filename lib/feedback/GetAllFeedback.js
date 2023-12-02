import axios from "axios";

export const getAllFeeedback = async (id) => {
  const res = await axios.get(`http://127.0.0.1:20200/api/v1/feedback`, {
    headers: { auth: localStorage.getItem("auth") },
    // params: params,
  });

  return res;
};
