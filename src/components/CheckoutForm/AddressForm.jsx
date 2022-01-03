import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import CustomTextField from './CustomTextField';

const AddressForm = ({checkoutToken,next}) => {
  
  const methods = useForm()
  return (
    <div>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={next}>
          <Grid container spacing={3}>
          <CustomTextField required name="firstName" label="First Name"/>
          <CustomTextField required name="lastName" label="Last Name"/>
          <CustomTextField required name="address1" label="Address"/>
          <CustomTextField required name="email" label="Email"/>
          <CustomTextField required name="City" label="City"/>
          <CustomTextField required name="Zip" label="ZIP Code"/>
          
          </Grid>
            <br/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
            <Button type="submit" color="primary" variant="contained">Next</Button>
            </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddressForm;
