import React from 'react';
import PaginationShared from '../pagination/PaginationShared';

const Table = ({ data, count, limit, setPage, page, setLimit, updateButton, deleteButton, viewButton, updateFunction, setShow, deleteFunction, infoFunction }) => {
  let headerOfUserTable, rowsOfUserTable;
  if (data.length > 0) {
    let key = Object.keys(data[0]);

    headerOfUserTable = Object.keys(data[0]).map((k, index) => (
      <th key={index} className="px-4 py-2">{k}</th>
    ));

    rowsOfUserTable = data.map((d, rowIndex) => {
      let singleRow = [];

      for (let i = 0; i < key.length; i++) {
        if (typeof d[key[i]] === 'boolean') {
          singleRow.push(
            <td key={i} className="px-4 py-2">
              {d[key[i]] ? 'Active' : 'Inactive'}
            </td>
          );
        } else {
          singleRow.push(
            <td key={i} className="px-4 py-2">
              {d[key[i]]}
            </td>
          );
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
      <TableOfUsers />
   </>
 
      
    

  );
};

export default Table;
