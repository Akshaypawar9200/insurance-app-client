import axios from "axios";

export const getEmployeeById = async (id) => {
  const res = await axios.get(` http://127.0.0.1:20200/api/v1/employee/${id}`, {
    headers: { auth: localStorage.getItem("auth") },
    // params: params,
  });

  return res;
};
