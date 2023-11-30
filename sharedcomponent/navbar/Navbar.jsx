"use client"
import './Navbar.css'; // Import your CSS file for Navbar styles
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import Modal from '@mui/material/Modal';
import {logout as logout } from '../../lib/logout/Logout'
import {resetPasswordDashboard as resetPasswordDashboard} from '../../lib/resetPassword/resetPassword'
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const Navbar = () => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false);
  const[oldpassword,setOldpassword]=React.useState("")
  const[newpassword,setNewpassword]=React.useState("")
  // const[username,setUserName]=React.useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // setUserName(localStorage.getItem('username'))

  const handleLogout=async()=>{
    const response=await logout()
    console.log("logout sucessfully");
    localStorage.clear()
    router.push("/")
  }
  const handleProfile=async()=>{
    router.push("/profile")
  }
 
  const getOldPassword=(e)=>{
    
    setOldpassword(e.target.value)
  }
  const getNewPassword=(e)=>{
    setNewpassword(e.target.value)
  }

  
  const resetPassword=async(e)=>{
    e.preventDefault()
      try {
       
        
        if(oldpassword==""){
    
          enqueueSnackbar("plz enter old password", { variant: "error" })
          return
        }
  
        if(newpassword==""){
          enqueueSnackbar("plz enter new password", { variant: "error" })
          return
        }
        let username=localStorage.getItem("username")
        const res=await resetPasswordDashboard(username,oldpassword,newpassword)
     
        enqueueSnackbar('password reset sucessfully', { variant: "success" })
        
      } catch (error) {
  
        enqueueSnackbar("invalid old password", { variant: "error" })
      }
    }
  return (
    <>
      <SnackbarProvider autoHideDuration={3000} />
      <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">Insurance</a>
        </div>
       
      </div>
      <div>
 
    <div className='buttons'>
    <button className='reset-button' onClick={handleOpen}>Reset Password</button>
          
          <button className='logout' onClick={handleLogout}>Logout</button>
          <button className='profile' onClick={handleProfile}>Profile</button>
      
    </div>
          
     

     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form action="#">
        <label htmlFor="old-Password">Old Password</label><br/>
        <input type="text" onChange={getOldPassword}/><br/>
        <label htmlFor="new-Password">New Password</label><br/>
        <input type="text" onChange={getNewPassword}/><br/>
        <Button variant="primary" onClick={resetPassword}>
          Reset Password
          </Button>
      </form>
        </Box>
      </Modal>
    </div>
    </nav>
    </>
    
    
  );
};

export default Navbar;
