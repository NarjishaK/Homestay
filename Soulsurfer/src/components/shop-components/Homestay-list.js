import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";
import styles from "../shop-components/shop.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function HomestayList() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const [homestay, setHomestay] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const history =useHistory()


  useEffect(() => {
    fetchHomestay();
  }, []);

  const fetchHomestay = async () => {
    const response = await axios
      .get("http://localhost:7000/admin/adminpanellist")
      .then((response) => {
        setHomestay(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Step 2: Add onChange handler to update searchTerm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Step 3: Filter homestay based on searchTerm before rendering
  const filteredHomestay = searchTerm
    ? homestay.filter(
        (place) =>
          place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place.room.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : homestay;


    const handleview = (placeId) => {
      const placeDetails = homestay.find((place) => place._id === placeId);
      setSelectedPlace(placeDetails);
    };

    const aboutDetails= async(id)=>{
      history.push(`/about/${id}`)
    }
  return (
    <div>
      <div className="ltn__product-area ltn__product-gutter mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__shop-options">
                <ul>
                  <li>
                    <div className="ltn__grid-list-tab-menu ">
                      <div className="nav">
                        <a
                          className="active show"
                          data-bs-toggle="tab"
                          href="#liton_product_grid"
                        >
                          <i className="fas fa-th-large" />
                        </a>
                        <a data-bs-toggle="tab" href="#liton_product_list">
                          <i className="fas fa-list" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="short-by text-center">
                      <select className="nice-select">
                        <option>Default sorting</option>
                        <option>Sort by popularity</option>
                        <option>Sort by new arrivals</option>
                        <option>Sort by price: low to high</option>
                        <option>Sort by price: high to low</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <div className="showing-product-number text-right">
                      <span>Showing 9 of 20 results</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="tab-content ">
                <div
                  className="tab-pane fade active show"
                  id="liton_product_grid"
                >
                  <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* Search Widget */}
                        <div className="ltn__search-widget mb-30">
                          <form action="#">
                            <input
                              type="text"
                              name="search"
                              placeholder="Search your keyword..."
                              onChange={handleSearchChange}
                            />
                            <button type="submit">
                              <i className="fas fa-search" />
                            </button>
                          </form>
                        </div>
                        {/* {filteredHomestay.map((place) => ())} */}
                      </div>
                      {filteredHomestay.map((place) => (
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                            <div className="product-img">
                              <a onClick={()=>aboutDetails(place._id)}>
                                <img
                                  src={`http://localhost:7000/upload/${place.image[0]}`}
                                  alt="#"
                                />
                              </a>
                            </div>
                            <div className="product-info">
                              <div className="product-badge">
                                <ul>
                                  <li
                                    className="sale-badg"
                                    id={
                                      place.status === "Not Available"
                                        ? styles.statusRed
                                        : styles.statusGreen
                                    }
                                  >
                                    {place.status}
                                  </li>
                                </ul>
                              </div>
                              <h2 className="product-title go-top">
                                <Link to="/product-details">
                                  {place.description}
                                </Link>
                              </h2>
                              <div className="product-img-location">
                                <ul>
                                  <li className="go-top">
                                    <a href={place.location}>
                                      <i className="flaticon-pin" />
                                      {place.place}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                <li>{place.room}</li>
                              </ul>
                              <div className="product-hover-action">
                                <ul>
                                  <li>
                                    <a
                                      href="#"
                                      title="Quick View"
                                      data-bs-toggle="modal"
                                      data-bs-target="#quick_view_modal"
                                      onClick={()=>handleview(place._id)}
                                    >
                                      <i className="flaticon-expand" />
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      title="Wishlist"
                                      data-bs-toggle="modal"
                                      data-bs-target="#liton_wishlist_modal"
                                    >
                                      <i className="flaticon-heart-1" />
                                    </a>
                                  </li>
                                  <li>
                                    <span className="go-top">
                                      <Link
                                        to="/product-details"
                                        title="Booking Now"
                                      >
                                        <i className="flaticon-add" />
                                      </Link>
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="product-info-bottom">
                              <div className="product-price">
                                <span>
                                ₹{place.price}
                                  <label>/Day</label>
                                  {/* <p>Booking Now</p> */}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ltn__pagination-area text-center">
                <div className="ltn__pagination">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fas fa-angle-double-left" />
                      </a>
                    </li>
                    <li>
                      <a href="#">1</a>
                    </li>
                    <li className="active">
                      <a href="#">2</a>
                    </li>
                    <li>
                      <a href="#">3</a>
                    </li>
                    <li>
                      <a href="#">...</a>
                    </li>
                    <li>
                      <a href="#">10</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-angle-double-right" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ltn__modal-area ltn__add-to-cart-modal-area">
        <div className="modal fade" id="liton_wishlist_modal" tabIndex={-1}>
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="ltn__quick-view-modal-inner">
                  <div className="modal-product-item">
                    <div className="row">
                      <div className="col-12">
                        <div className="modal-product-img">
                          <img
                            src={publicUrl + "assets/img/product/7.png"}
                            alt="#"
                          />
                        </div>
                        <div className="modal-product-info go-top">
                          <h5>
                            <Link to="/product-details">
                              Brakee Conversion Kit
                            </Link>
                          </h5>
                          <p className="added-cart">
                            <i className="fa fa-check-circle" /> Successfully
                            added to your Wishlist
                          </p>
                          <div className="btn-wrapper">
                            <Link
                              to="/wishlist"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              View Wishlist
                            </Link>
                          </div>
                        </div>
                        {/* additional-info */}
                        <div className="additional-info d-none">
                          <p>
                            We want to give you <b>10% discount</b> for your
                            first order, <br /> Use discount code at checkout
                          </p>
                          <div className="payment-method">
                            <img
                              src={publicUrl + "assets/img/icons/payment.png"}
                              alt="#"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


{selectedPlace && (
      <div className="ltn__modal-area ltn__quick-view-modal-area">
        <div className="modal fade" id="quick_view_modal" tabIndex={-1}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                  {/* <i class="fas fa-times"></i> */}
                </button>
              </div>
              <div className="modal-body">
                <div className="ltn__quick-view-modal-inner">
                  <div className="modal-product-item">
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="modal-product-img">
                          <img
 src={`http://localhost:7000/upload/${selectedPlace.image[0]}`}
                             alt="#"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="modal-product-info">
                          <div className="product-ratting">
                            <ul>
                              <li>
                                <a href="#">
                                  <i className="fas fa-star" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fas fa-star" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fas fa-star" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fas fa-star-half-alt" />
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="far fa-star" />
                                </a>
                              </li>
                              <li className="review-total">
                                {" "}
                                <a href="#"> ( 95 Reviews )</a>
                              </li>
                            </ul>
                          </div>
                          <h3>{selectedPlace.place}</h3>
                          <div className="product-price">
                            <span>₹{selectedPlace.price}</span>
                            <del>₹165.00</del>
                          </div>
                          <div className="modal-product-meta ltn__product-details-menu-1">
                            <ul>
                              <li>
                                <strong>Categories:</strong>
                                <span className="go-top">
                                  <Link to="/blog">Parts</Link>
                                  <Link to="/blog">Car</Link>
                                  <Link to="/blog">Seat</Link>
                                  <Link to="/blog">Cover</Link>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="ltn__product-details-menu-2">
                            <ul>
                              <li>
                                <div className="cart-plus-minus">
                                  <input
                                    type="text"
                                    defaultValue="02"
                                    name="qtybutton"
                                    className="cart-plus-minus-box"
                                  />
                                </div>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="theme-btn-1 btn btn-effect-1"
                                  title="Add to Cart"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add_to_cart_modal"
                                >
                                  <i className="fas fa-shopping-cart" />
                                  <span>ADD TO CART</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <hr />
                          <div className="ltn__social-media">
                            <ul>
                              <li>Share:</li>
                              <li>
                                <a href="#" title="Facebook">
                                  <i className="fab fa-facebook-f" />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="Twitter">
                                  <i className="fab fa-twitter" />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="Linkedin">
                                  <i className="fab fa-linkedin" />
                                </a>
                              </li>
                              <li>
                                <a href="#" title="Instagram">
                                  <i className="fab fa-instagram" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
)}
      <div className="ltn__modal-area ltn__add-to-cart-modal-area">
        <div className="modal fade" id="add_to_cart_modal" tabIndex={-1}>
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="ltn__quick-view-modal-inner">
                  <div className="modal-product-item">
                    <div className="row">
                      <div className="col-12">
                        <div className="modal-product-img">
                          <img
                            src={publicUrl + "assets/img/product/1.png"}
                            alt="#"
                          />
                        </div>
                        <div className="modal-product-info go-top">
                          <h5 className="go-top">
                            <Link to="/product-details">
                              Brake Conversion Kit
                            </Link>
                          </h5>
                          <p className="added-cart">
                            <i className="fa fa-check-circle" />
                            Successfully added to your Cart
                          </p>
                          <div className="btn-wrapper">
                            <Link
                              to="/cart"
                              className="theme-btn-1 btn btn-effect-1"
                            >
                              View Cart
                            </Link>
                            <Link
                              to="/checkout"
                              className="theme-btn-2 btn btn-effect-2"
                            >
                              Checkout
                            </Link>
                          </div>
                        </div>
                        {/* additional-info */}
                        <div className="additional-info d-none">
                          <p>
                            We want to give you <b>10% discount</b> for your
                            first order, <br /> Use discount code at checkout
                          </p>
                          <div className="payment-method">
                            <img
                              src={publicUrl + "assets/img/icons/payment.png"}
                              alt="#"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomestayList;
