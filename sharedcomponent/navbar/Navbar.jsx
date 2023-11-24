import React, { useState } from 'react';
import { GetAllInsuranceType as GetAllInsuranceType } from "../../lib/GetAllInsuranceType";
const Navbar = () => {
  
  const [insuranceType, setInsuranceType] = useState([]);
  const[planId,setPlanId]=useState("")
 const handleInsuranceType=async(e)=>{
  e.preventDefault()

  const response = await GetAllInsuranceType()
  setInsuranceType(prev=>response.data)
 }
 const handleDropDown=(insuranceTypeId)=>{
  console.log("::::::::::::::::::::::::{{{{{{{{{{{{{{{{{{{{{{{{{{",insuranceTypeId);

 }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="https://png.pngtree.com/template/20190316/ourmid/pngtree-insurance-logo-vector-image_80257.jpg" alt="" height={'30px'} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  onClick={handleInsuranceType} 
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  INSURANCE TYPE
                </a>
                <ul className="dropdown-menu">
                  {insuranceType.map((item, index) => (
                    <li key={index}>
                      <a className="dropdown-item" href="#"onClick={() => handleDropDown(item.id)}>
                        {item.insuranceName}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                
                </a>
              </li>
            </ul>
         
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
