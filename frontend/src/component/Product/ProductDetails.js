import axios from "axios";
import { useState, useEffect } from "react";
import React, { Fragment } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Rating } from "@material-ui/lab";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import MataData from "../layout/MataData";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
// import { param } from "express/lib/request";
// import { useParams } from "react-router-dom/cjs/react-router-dom";

const ProductDetails = (product, match) => {
  // console.log("img", product);
  const alert = useAlert();
  const history = useHistory();
  let { id } = useParams();
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (setdata.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartHendler = () => {
    history.push("/Shipping", {
      data: {
        params1: id,
        params2: quantity,
        params3: setdata.name,
        params4: setdata.price,
      },
    });
    console.log("hellllllll", {
      params1: id,
      params2: quantity,
      params3: setdata.name,
      params4: setdata.price,
    });
    // console.log("rrrrrr", setdata._id);
    localStorage.setItem(`cart_${setdata._id}`, JSON.stringify({ ...setdata }));
    console.log("helo", setdata);
    // alert("Added to Cart Successfully!");
  };
  const [comment, setComment] = useState();
  const [loading, setloading] = useState(false);
  const [setdata, setdataDt] = useState([]);
  const [setrev, getrev] = useState([]);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReviews] = useState([]);
  // console.log("gettttt", setrev);
  const dataGet = async (req, res) => {
    // console.log("data --- ", id);
    const data = await axios.get(
      `http://localhost:4000/api/v1/getproduct/${id}`,
      { withCredentials: true }
    );
    // console.log("zxcvbnm", data);
    setdataDt(data.data.product);
    // console.log("@@@@@@@@@@@@@", setdata.id);
  };
  const submiteHendler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    console.log("submite", rating, setrev, comment);

    myForm.set("rating", setdata.rating);
    myForm.set("reviews", setrev);
    myForm.set("comment", comment);
    myForm.set("productId", setdata._id);
    console.log("setdetaaa", setdata._id);

    setOpen(false);
    let data = JSON.stringify({
      // productId: setdata.productId,
      comment,
      rating,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/v1/review",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("ddddd", response.data);
        console.log("ressss[", response);
      })
      .catch((error) => {
        console.log(error);
      });

    open ? setOpen(false) : setOpen(true);
  };
  useEffect(() => {
    const fetchProductReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/reviews?id=${id}`
        );
        setReviews(response.data.data);
        console.log("respon", response);
      } catch (error) {
        console.error("Error fetching product reviews:", error);
      }
    };

    fetchProductReviews();
  }, []);
  useEffect(() => {
    dataGet();
  }, [alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MataData title={setdata.name} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {setdata.images &&
                  setdata.images.map((item, i) => (
                    <div>
                      <img
                        className="CarouselImage"
                        key={item.i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{setdata.name}</h2>
                <p>
                  product # {setdata?._id}
                  {/* {console.log("1111",setdata._id)} */}
                </p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({setdata.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                {" "}
                <h1>{`₹${setdata.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHendler}>BUY NOW</button>
                </div>
                <p>
                  status:{""}
                  <b className={setdata.Stock < 1 ? "RedColor" : "GreenColor"}>
                    {setdata.Stock < 1 ? "Out Of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{setdata.description}</p>
              </div>
              <button
                className="submitReview"
                onClick={submiteHendler}
                onChange={(e) => getrev(e.target.value)}
              >
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHendling" onClick={submiteHendler}>
            REVIEW
          </h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submiteHendler}
          >
            {" "}
            <DialogTitle>submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="secondary">Cancel</Button>
              <Button color="primary" onClick={submiteHendler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {setdata.reviews && setdata.reviews[0] ? (
            <div className="reviews">
              {setdata.reviews &&
                setdata.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">NO Review</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
