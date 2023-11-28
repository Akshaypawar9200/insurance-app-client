import axios from "axios";

export const getAllCityByStateId = async () => {

  const res = await axios.get(`http://127.0.0.1:20200/api/v1/city`, {
    headers: { auth: localStorage.getItem("auth") },
  
  });

  return res;
};
