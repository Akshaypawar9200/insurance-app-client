import React from 'react';
import PaginationShared from '../pagination/PaginationShared';
import { colors } from '@mui/material';

const Table = ({ data, count, limit, setPage, page,makePaymentButton,makePaymentFunction, setLimit,paymentButton,paymentFunction, updateButton, deleteButton,viewFeedbackButton,viewFeedbackFunction,feedbackButton,replyFunction,viewButton,replyButton,feedbackFunction,updateFunction, setShow, deleteFunction, infoFunction }) => {
  let headerOfUserTable, rowsOfUserTable;
  
  if (data.length > 0) {
    let key = Object.keys(data[0]);

    headerOfUserTable = Object.keys(data[0]).map((k, index) => (
      <th key={index} className="px-4 py-2">{k}</th>
    ));

    rowsOfUserTable = data.map((d, rowIndex) => {
      let singleRow = [];
      

      for (let i = 0; i < key.length; i++) {
       if(key[i]=="paymentStatus"){
        singleRow.push(
          <td key={i} className="px-4 py-2">
            {d[key[i]] ? 'Done' : 'Pending...'}
          </td>
        );
       }
        else if (typeof d[key[i]] === 'boolean') {
          singleRow.push(
            <td key={i} className="px-4 py-2">
              {d[key[i]] ? 'Active' : 'Inactive'}
            </td>
          );
        } else {
         
          if(key[i]=="paymentDate" && d['paymentDate']==null){
            singleRow.push(
              <td key={i} className="px-4 py-2" >
                <button className="btn-primary3"style={{backgroundColor:'green'}} onClick={() => { makePaymentFunction(d) }}>Pay Now</button>
              </td>
            );
          }
         else{
          singleRow.push(
            <td key={i} className="px-4 py-2" >
              {d[key[i]]}
            </td>
          );
         }
        }
      }

      if (updateButton === true) {
        singleRow.push(
          <td key={key.length} className="px-4 py-2">
            <button className="btn-primary1" onClick={() => {
              updateFunction(d);
              setShow(true);
            }}>Update</button>
          </td>
        );
      }
      if (deleteButton === true) {
        singleRow.push(
          <td key={key.length + 1} className="px-4 py-2">
            <button className="btn-primary2" onClick={() => { deleteFunction(d) }}>Delete</button>
          </td>
        );
      }
      if (viewButton === true) {
        singleRow.push(
          <td key={key.length + 2} className="px-4 py-2">
            <button className="btn-primary3" onClick={() => { infoFunction(d) }}>View</button>
          </td>
        );
      }
      if (feedbackButton === true) {
        singleRow.push(
          <td key={key.length + 2} className="px-4 py-2">
            <button className="btn-primary3" onClick={() => { feedbackFunction(d) }}>Feedback</button>
          </td>
        );
      }
      if (replyButton === true) {
        singleRow.push(
          <td key={key.length + 2} className="px-4 py-2">
            <button className="btn-primary3" onClick={() => { replyFunction(d) }}>Reply</button>
          </td>
        );
      }
      if (viewFeedbackButton === true) {
        singleRow.push(
          <td key={key.length + 2} className="px-4 py-2" >
            <button className="btn-primary3"style={{backgroundColor:'green'}} onClick={() => { viewFeedbackFunction(d) }}>Feedback Status</button>
          </td>
        );
      }
      if (paymentButton === true) {
        singleRow.push(
          <td key={key.length + 2} className="px-4 py-2" >
            <button className="btn-primary3"style={{backgroundColor:'red'}} onClick={() => { paymentFunction(d) }}>payment</button>
          </td>
        );
      }
    

      return <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>{singleRow}</tr>;
    });
  }

  const TableOfUsers = () => {
    return (
      <table className="min-w-full divide-y divide-gray-200 shadow-md bg-white rounded-lg">
        <thead>
          <tr>{headerOfUserTable}</tr>
        </thead>
        <tbody>{rowsOfUserTable}</tbody>
      </table>
    );
  };

  return (
   <>
      <PaginationShared limit={limit}  offset={page}  count={count} setOffset={setPage}/>
      {/* <div className="flex">
     
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={limit}
            onChange={(e) => {
              setLimit((prev) => e.target.value);
              let noOfPages = Math.ceil(count / e.target.value);
              setOffset(1);
            }}
          >
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option value="5">
              5
            </option>
            <option value="10">
              10
            </option>
          </select>
        </div> */}
     
      <TableOfUsers />
   </>
 
      
    

  );
};

export default Table;
