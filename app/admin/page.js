"use client";
import React, { useEffect, useState } from "react";
// import NavbarShared from "../../sharedcomponent/Navbar";
import Table from "../../sharedcomponent/table/Table";
// import { verify } from "../../services/user/authorization";
import Spinner from "../../sharedcomponent/spinner/Spinner";
import { MessageError, MessageSuccess } from "../../error/Error";
import { useRouter } from "next/navigation";
import { getAllEmployee } from "../../lib/employee/getAllCustomer";
import CreateEmployee from "../forms/createemployee/CreateEmployeee";

const page = () => {  
  const router = useRouter();
 
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [noOfPages, setNoOfPages] = useState(1);
  const [offset, setOffset] = useState(1);
  const [isVerifiedUser, setIsVerifiedUser] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // modals
  const [show, setShow] = useState(false);


  // modal states
  const [id, setId] = useState("");
  const [book, setBook] = useState({});

  // userId set
  const [userId, setUserId] = useState("") 

  // search filters
  const [searchBankName, setSearchBankName] = useState("");

  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };


  const handelAllEmployees = async (e) => {
    try {
      setIsLoading((prev) => true);
      let filters = {
        limit: limit,
        page: offset,
      };
      // let response = await getAccounts(userId, filters);
      let response = await getAllEmployee(filters)
      console.log(response)
      setCount((prev) => response?.headers["x-total-count"]);
      let noOfPages = Math.ceil(response?.headers["x-total-count"] / limit);
      setNoOfPages(noOfPages);
      setData((prev) => response.data);
      return;
    } catch (error) {
      console.log(error)
      MessageError(error.response.data.message);
    } finally {
      setIsLoading((prev) => false);
    }
  };

  const verifyUser = async () => {
    try {
      let response = await verify();
      setIsVerifiedUser((prev) => response.data.result);
      return;
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  // useEffect(() => {
  //   verifyUser();
  // }, []);

  useEffect(() => {
    if (isVerifiedUser) {
      handelAllEmployees();
    }
  }, [limit, offset, isVerifiedUser]);

  if (!isVerifiedUser) {
    return (
      <h1>
        <a href="/">please login</a>
      </h1>
    );
  }

  return (
    <>
      <Spinner isLoading={isLoading} />
      {/* <NavbarShared /> */}
      <CreateEmployee handelAllEmployees={handelAllEmployees}/>
      <Table
        rows={data}
        setOffset={setOffset}
        setLimit={setLimit}
        limit={limit}
        offset={offset}
        count={count}
      />

    </>
  );
};

export default page;
