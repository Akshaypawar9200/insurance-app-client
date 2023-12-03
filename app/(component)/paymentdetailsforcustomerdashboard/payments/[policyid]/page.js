'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { getAllPaymentsByPolicyId as getAllPaymentsByPolicyId } from '../../../../../lib/payments/GetAllPayment'
import Table from '@/sharedcomponent/table/Table';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import{updatePayments as updatePayments}from "../../../../../lib/payments/UpdatePayment"
import { MessageError, MessageSuccess } from '@/error/Error';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};
const page = () => {
    const paymentMode = ['Credit card/Debit card', 'UPI', 'Cash']
    const [open, setOpen] = React.useState(false);
    const policyId = useParams()
    const [paymentData, setPaymentData] = useState([])
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(2);
    const [noOfPages, setNoOfPages] = useState(1);
    const [paymentMethod, setPaymentMethods] = useState("")
    const[paymentId,setPaymentId]=useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const makePaymentFunction = (d) => {
        setPaymentId(d.id)
        setOpen(true)
    }
    const handleAllPayments = async () => {

        const response = await getAllPaymentsByPolicyId(policyId.policyid)
        setPaymentData(response.data)
    }
    useEffect(() => {
        handleAllPayments()
    }, [])

    const updatePayment=async()=>{
      try {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>",paymentMethod);
        const res=await updatePayments(paymentId,paymentMethod)
        handleAllPayments()
        setOpen(false)
        MessageSuccess("Payment Done")
      } catch (error) {
        MessageError(error.Message)
      }
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form className="space-y-6 bg-transparent" action="#">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                            Pay Now
                        </h5>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Payment Method
                            </label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethods(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            >
                                <option value="">Select Payment Method</option>
                                {paymentMode.map((method, index) => (
                                    <option key={index} value={method}>
                                        {method}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <button
                            type="button"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={updatePayment}
                        >
                            Pay Now
                        </button>
                    </form>
                </Box>


            </Modal>
            <Table
                data={paymentData}
                count={count}
                limit={limit}
                page={page}
                setPage={setNoOfPages}

                makePaymentFunction={makePaymentFunction}

            />
        </>
    )
}

export default page