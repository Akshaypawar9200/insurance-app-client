import axios from "axios";

export const getAllPaymentsByPolicyId = async (id) => {
  const res = await axios.get(`http://127.0.0.1:20200/api/v1/paymentdetails/payments/${id}`, {
    headers: { auth: localStorage.getItem("auth") },
    // params: params,
  });

  return res;
};
