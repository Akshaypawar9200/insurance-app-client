import axios from "axios";

export const deleteCustomer = async (id) => {
  const res = await axios.delete(`http://127.0.0.1:20200/api/v1/customer/${id}`, {
    headers: { auth: localStorage.getItem("auth") },
    // params: params,
  });

  return res;
};
