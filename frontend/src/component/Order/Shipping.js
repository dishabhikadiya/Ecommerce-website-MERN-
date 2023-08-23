import React, { Fragment, useState, useEffect } from "react";
import "./Shipping.css";
import MetaData from "../layout/MataData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
const Shipping = () => {
  const location = useLocation();
  console.log("location", location?.state?.data);
  const history = useHistory();
  const alert = useAlert();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pincode, setPinCode] = useState();
  const [phoneNo, setPhoneNo] = useState();
  // const [product, setproduct] = useState();

  const getdetails = (id) => {
    axios.get(`http://localhost:4000/api/v1/product/${id}`, {
      withCredentials: true,
      params: {
        id: id,
      },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const shopping = {
      address,
      city,
      state,
      country,
      pincode,
      phoneNo,
    };

    console.log("pincode", pincode);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/order/new",

        {
          itemsPrice: 15000,
          taxPrice: 36,
          shippingPrice: 100,
          totalPrice: 336,
          shippingInfo: shopping,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response) {
        console.log("shipping success");
        history.push("/order/confirm", {
          data: {
            params1: state.id,
            params2: state.quantity,
            params3: state.name,
            params4: state.price,
          },
        });
        // location.state.data;
        alert.success("success");
      }
      setAddress("");
      setCity("");
      setState("");
      setCountry("");
      setPinCode("");
      setPhoneNo("");
    } catch (error) {
      console.log(error);
    }
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
  };

  useEffect(() => {
    getdetails();
  }, []);
  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="PinCode"
                required
                value={pincode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item?.isoCode} value={item?.isoCode}>
                      {item?.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item?.isoCode} value={item?.isoCode}>
                        {item?.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
