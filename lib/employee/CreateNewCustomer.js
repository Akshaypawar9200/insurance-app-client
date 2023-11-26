import axios from "axios";
export const CreateNewCustomer = async (customerName,state,city,pincode,mobileno,nominee,nomineeRelation,username, password, email,customerAddress,qualification) => {

    const res = await axios.post(`http://127.0.0.1:20200/api/v1/customer`, { customerName,state,city,pincode,mobileno,nominee,nomineeRelation,username, password, email,customerAddress,qualification}, { headers: { auth: localStorage.getItem("auth") } })
    return res
}

