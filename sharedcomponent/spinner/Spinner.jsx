// import React from 'react'
// import './Spinner.css'
// const Spinner = ({ loader }) => {
//     // console.log(loader)
//     return (
//         <>
//             <div className="mainloader">
//             <div className="loader" style={{ display: loader ? "block" : "none" }}>
//                 <div className="dot-spinner">
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                     <div className="dot-spinner__dot"></div>
//                 </div>
//             </div>

//             </div>
           
//         </>
//     )
// }

// export default Spinner



import React from "react";
import "./Spinner.css";

const Spinner = ({ loader }) => {
  return (
    <>
      {/* <div className="main-loader-container" style={{ display: isLoading ? "block" : "none" }}> */}
        <div className="loader"style={{ display: loader ? "block" : "none" }}>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
      </div>
    </>
  );
};

export default Spinner;