import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./CreateOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const steps = ['Add Address', 'Order Details', 'CheckOut'];

export default function CreateOrder() {
  const cart = useSelector((state) => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    city: "",
    landmark: "",
    street: "",
    state: "",
    zipCode: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, such as sending data to a backend server
    console.log(formData);
    // Reset the form after submission
    setFormData({
      name: "",
      contactNumber: "",
      city: "",
      landmark: "",
      street: "",
      state: "",
      zipCode: ""
    });
  };

  const isStepOptional = (step) => {

  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0 && Object.values(formData).some(value => value === "")) {
      // Alert the user to fill in the address details
      alert("Please fill in all address fields before proceeding.");
      return;
    } else {
      //handle adding address 
    }
    if (activeStep === steps.length - 1) {
      handlePlaceOrder(); // Update 'path-to-your-page' with the actual path
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const renderOrderDetails = () => {
    return (
      <div className='o-order-details-contailer'>

        {cart.map((item) => (
          <div key={item.id} className="o-cart-details">
            <div className="end">
              <div className="flex">
                <div>
                  <img src={item.imageURL} alt="" className="image" />
                </div>
                <div className="description">
                  <h3>{item.name}</h3>
                  <p>${item.price} x {item.count}</p>
                </div>
              </div>
              <div >
                <p  >
                  ${item.price * item.count}
                </p>

              </div>
            </div>
            <hr style={{ width: "95%", border: "1px solid #e3e3e3" }} />
          </div>


        ))}
      </div>
    )
  }
  const renderAddAddress = () => {
    return (
      <div className='addAddress-container'>
        <p>Add Address:</p>
        <form className="address-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              className='address-input' placeholder='Full Name'
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <input
              className='address-input' placeholder='Contact Number'
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <input
              className='address-input' placeholder='City'
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">
            <input
              className='address-input' placeholder='Landmark'
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
            />
          </div>

          <div className="input-container">
            <input
              className='address-input' placeholder='Street'
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-container">
            <input
              className='address-input' placeholder='State'
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-container">

            <input
              className='address-input' placeholder='Zip Code'
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>

        </form>
      </div>
    )
  }

  const renderPayment = () => {
    return (
      <div className='summary-container-parent'>
        <h2 className='color'>CheckOut</h2>

        <div className='summary-container-child'>

          <div className='s-background'>
            <h3 className='color'>Address</h3> <p> {formData.name} <br/> {formData.street}, {formData.city}, <br/> {formData.state}, {formData.zipCode}. </p>
          </div>

          <div className='s-background'>
            <h3 className='color'>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="s-cart-details">
                <div className="end s-order-details">
                  <div className="flex">

                    <div className="s-order-name" style={{margin: '0px'}} >
                      <p style={{margin: '0px'}}>{item.name} x {item.count}</p>
                    </div>
                  </div>
                  <div >
                    <p style={{margin: '10px'}} >
                      ${item.price * item.count}
                    </p>

                  </div>
                </div>

              </div>


            ))}
            <hr style={{ width: "95%", border: "1px solid #e3e3e3" }} />
            <div className="s-total">

              <div className="end">
                <div className="flex">
                    <p className='color'>Total</p>
                </div>
                <div >
                  <p className='color'>
                    ${totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }


  const renderStepContent = () => {

    // STEP-1 showing details of product selected by user 
    if (activeStep === 0) {
      return renderAddAddress();

    }

    // STEP-2 ADDRESS
    if (activeStep === 1) {
      return renderOrderDetails();
    }


    // STEP-3 conform order 
    if (activeStep === 2) {
      return renderPayment();
    }
  };

  async function handlePlaceOrder() {
    for (const item of cart) {
      await removeItem(item.id);
    }
    await navigate("/products");
    await alert('Your order is confirmed.');
  }

  function removeItem(productId) {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        id: productId
      }
    });
  }

  async function OrderHandler(event) {
    const { name, contactNumber, city, landmark, street, state, zipCode } = formData;
    const accessToken = localStorage.getItem('accessToken');


    console.log("address completed, ordercalling")

    const id = cart.cart._id.toString();
    const quantity = cart.cart.purchaseCount;
    const selectedAddress = {
      name,
      contactNumber,
      city,
      landmark,
      street,
      state,
      zipCode
    };

    try {
      const rawResponse = await fetch('http://localhost:3001/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': accessToken
        },
        body: JSON.stringify({
          product: id,
          quantity: quantity,
          address: selectedAddress
        }),
      });

      // Handle the response from the server
      if (rawResponse.ok) {
        // Successful order place
        alert("Order Confirmed");
        navigate("/Products");
      } else {
        const response = await rawResponse.text();
        // Handle errors from the server
        alert(response);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error adding order:', error);
    }

  }


  return (
    <div className='stepper'>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label} </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>

      <div className='centre'>
        {renderStepContent()}
      </div>
    </div>
  );
}