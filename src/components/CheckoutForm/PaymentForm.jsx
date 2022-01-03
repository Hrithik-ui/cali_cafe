import React from 'react'
import {Typography,Button,Divider} from "@material-ui/core"
import {Elements,CardElement,ElementsConsumer} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import Review from "./Checkout/Review"
const stripePromise=loadStripe("pk_test_51JnzqfKgs2k41WJ6FDcRju0J6orbLr53EhYsA6c4hJsoqS0T8yPmJLHugOaSlFmRe3nwVuwFeU9YZ4iMOr5Gf18D00TFbC2zqx")
const PaymentForm = ({checkoutToken,backStep,onCaptureCheckout,nextStep,refreshCart}) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();
    
        if (!stripe || !elements) return;
    
        const cardElement = elements.getElement(CardElement);
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    
        if (error) {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                payment: {
                  gateway: 'stripe',
                  stripe: {
                    payment_method_id: paymentMethod.id,
                  },
                },
              };
            onCaptureCheckout(checkoutToken.id,orderData);
    refreshCart()
          nextStep();
        } else {
          const orderData = {
            line_items: checkoutToken.live.line_items,
            payment: {
              gateway: 'stripe',
              stripe: {
                payment_method_id: paymentMethod.id,
              },
            },
          };
    
          onCaptureCheckout(checkoutToken.id,orderData);
    refreshCart()
          nextStep();
        }
      };
    return (
        <div>
        <Review checkoutToken={checkoutToken} />
        <Divider />
        <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>{({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                  
                </Button>
              </div>
            </form>
            )}
            </ElementsConsumer>
            </Elements>
        </div>
    )
}

export default PaymentForm
