import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from "../PaymentForm";
import useStyles from './styles';
import { Add } from '@material-ui/icons';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({cart,order,onCaptureCheckout,error,refreshCart}) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const history = useHistory();
  useEffect(()=>{
        const generateToken=async()=>{
            try{
            const token=await commerce.checkout.generateToken(cart.id,{type:"cart"})
            console.log(token)
            setCheckoutToken(token)
            }catch(error){

            }
        }
        generateToken()
  },[cart])
  const nextStep=()=>setActiveStep((prevActiveStep)=>prevActiveStep+1)
  const backStep=()=>setActiveStep((prevActiveStep)=>prevActiveStep-1)

  const next=(data)=>{
      nextStep()
  }
 

 


const Confirmation=()=>(
    <div> 
    <h1>Your order has been Successful!</h1>
    <br />
    <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button></div>
)
  const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep}  onCaptureCheckout={onCaptureCheckout} refreshCart={refreshCart} />)

  return (
    <div>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
        </Paper>
      </main>
    </div>
  );
};

export default Checkout;
