import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSingUp from "./component/User/LoginSingUp";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import UpdatePassword from "./component/User/UpdatePassword";
import UpdateProfile from "./component/User/UpdateProfile";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import axios from "axios";
import Shipping from "./component/Order/Shipping";
import ConfirmOrder from "./component/Order/ConfirmOrder";
import Payment from "./component/Order/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Order/Myorders";
import Loader from "./component/layout/Loader/Loader";
function App() {
  const [user, setuser] = useState();
  const [stripeApiKey, setstripeApiKey] = useState("");

  async function getstripeApiKey() {
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/stripeapikey`,
      { withCredentials: true }
    );
    setstripeApiKey(data.stripeApiKey);
  }
  const isAuthenticated = async () => {
    const user = await axios.get(`http://localhost:4000/api/v1/me`, {
      withCredentials: true,
    });
    console.log("user", user);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    getstripeApiKey();
    isAuthenticated();
  }, [user]);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions />}
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exac path="/login" component={LoginSingUp} />
      <Route exac path="/updatepassword" component={UpdatePassword} />
      <Route exac path="/updateprofile" component={UpdateProfile} />
      <Route exac path="/forgot" component={ForgotPassword} />
      <Route exac path="/shipping" component={Shipping} />
      <Route exac path="/password/reset/:token" component={ResetPassword} />
      <Route exac path="/order/confirm" component={ConfirmOrder} />
      <Route exac path="/myorders" component={MyOrders} />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exac path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Footer />
    </Router>
  );
}

export default App;
