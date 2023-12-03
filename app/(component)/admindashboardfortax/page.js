'use client'
import React, { useState } from 'react'
import ValidationError from '../../../sharedcomponent/error/validationError'
import { CreateNewTax } from '../../../lib/tax/createTax'
import './style.css'
import { MessageError, MessageSuccess } from '@/error/Error'

const CreateTax = () => {
    const [taxPercentage, setTaxPercentage] = useState('')

    const handleCreateTax = async (d) => {
        try {
            if (taxPercentage == "") {
                throw new Error("Plz Enter Tax Percentage");
            }

            const res = await CreateNewTax(taxPercentage)
            MessageSuccess("tax created");
           return;
   

        }
        catch (error) {
            MessageError(error.message);
        }

    }

    const getTaxPercentage = (e) => {
        setTaxPercentage(e.target.value)
    }


    return (
        <>
            <div className="tax-form" >
                <div className="card-bodys">
                    <form>
                        <div className="row mb-3">
                            <label>Enter Tax Percentage </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" id="insuranceType" placeholder='' onChange={getTaxPercentage} />
                            </div>
                        </div>
                        <button type="button" className="btn" onClick={() => {
                            handleCreateTax()

                        }} >CreateTax</button>
                    </form>
                </div>
            </div></>
    )
}

export default CreateTax