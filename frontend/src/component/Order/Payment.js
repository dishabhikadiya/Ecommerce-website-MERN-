import React, { Fragment, useEffect, useRef } from "react";
import MetaData from "../layout/MataData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Order/CheckoutSteps";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
const Payment = () => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderinfo"));
  const payBtn = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/v1/payment/process", {
        orderInfo: orderInfo,
      })
      .then((res) => {
        if (res.status === 200) {
          alert.show("Payment Successful", {
            type: "success",
          });
        } else {
          alert.show("Payment Failed", {
            type: "error",
          });
        }
      })
      .catch((err) => {
        alert.show("Payment Failed", {
          type: "error",
        });
      });
    payBtn.current.click();
    window.location.reload();
    sessionStorage.clear();
  };
  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
