"use client";
import React, { useEffect, useState } from "react";
// import NavbarShared from "../../sharedcomponent/Navbar";
import Table from "../../sharedcomponent/table/Table";
// import { verify } from "../../services/user/authorization";
import Spinner from "../../sharedcomponent/spinner/Spinner";
import { MessageError, MessageSuccess } from "../../error/Error";
import { useRouter } from "next/navigation";
import { getAllState } from "../../lib/state/GetAllState";

import CreateState from "../createstate/createState";

const GetAllState = () => {  
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


  const handelAllState = async (e) => {
    try {
      setIsLoading((prev) => true);
      let filters = {
        limit: limit,
        page: offset,
      };
    
      let response = await getAllState(filters)
    
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
  useEffect(() => {
    handelAllState();
  }, [limit,offset]);
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
        handelAllState();
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
   
      <CreateState/>
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

export default GetAllState;
