'use client'

import React, { useState } from 'react'
import ValidationError from '../../sharedcomponent/error/validationError'
import { CreateNewTax } from '../../lib/tax/createTax'

const CreateTax = () => {
    const [taxPercentage, setTaxPercentage] = useState('')

    const handleCreateTax = async (d) => {
        try {
            if (taxPercentage == "") {
                throw new ValidationError('please enter tax percentage')
                return
            }

            const res = await CreateNewTax(taxPercentage)
            // enqueueSnackbar('Contact created successfully', { variant: "success" })

        }
        catch (error) {

        }

    }

    const getTaxPercentage = (e) => {
        setTaxPercentage(e.target.value)
    }


    return (
        <>
            <div className="card mx-auto mt-1" style={{ width: "20rem" }}>
                <div className="card-body">
                    <form>
                        <div className="row mb-3">
                            <label>Enter Tax Percentage </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" id="insuranceType" placeholder='' onChange={getTaxPercentage} />
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            handleCreateTax()

                        }} >CreateTax</button>
                    </form>
                </div>
            </div></>
    )
}

export default CreateTax