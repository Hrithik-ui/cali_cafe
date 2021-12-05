import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import CustomTextField from './CustomTextField';

const AddressForm = ({checkoutToken,next}) => {
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')
  const methods = useForm()

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
//console.log(countries)
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0])
    console.log(shippingCountry)
  };

 const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };


  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  

 

  

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [checkoutToken,shippingSubdivision,shippingCountry]);

useEffect(()=>{
    fetchShippingCountries(checkoutToken.id)
    },[])
    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
      }, [shippingCountry]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
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