import React, { Fragment } from "react";
import CheckoutSteps from "../Order/CheckoutSteps";
import MetaData from "../layout/MataData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom/cjs/react-router-dom";
const ConfirmOrder = ({ history }) => {
  let { id } = useParams();
  // const [orderDetails, setOrderDetails] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState();
  const [user, setuser] = useState();
  const location = useLocation();
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/orders/me`,
        { withCredentials: true }
      );
      // console.log("location neww", location.state);
      console.log("response...", response);
      const orderDetails = response.data.orders;
      setShippingInfo(orderDetails[0].shippingInfo);
      console.log("11111111111", shippingInfo.id);
      console.log("qqqq", orderDetails.orderItems);
      setuser(orderDetails[0].orderItems);
      setCartItems(orderDetails[0].orderItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    // getdetails();
  }, []);
  // console.log("uqantitty", cartItems.quantity);
  const subtotal = cartItems.quantity * cartItems.price;

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  console.log("address", shippingInfo);
  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pincode}, ${shippingInfo?.country}`;
  console.log("ddddddd", address);
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo?.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <div className="confirmCartItemsContainer">
              <img src="https://picsum.photos/200/300" alt="Product" />
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
