import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";
import Navbar from "../global-components/navbar";
import PageHeader from "../global-components/page-header";

function AdminAccount() {
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [des, setDes] = useState("");
  const [loc, setLoc] = useState("");
  const [destination, setDestination] = useState("");
  const [add, setAdd] = useState("");
  const [categories, setCategories] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [room, setRoom] = useState("");
  const [location, setLocation] = useState("");
  const [refund, setRefund] = useState("");
  const [address, setAddress] = useState("");
  const [ogprice, setOgprice] = useState("");
  const [about, setAbout] = useState("");
  const [housename, setHousename] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [category, setCategory] = useState([]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    try {
      const response = await axios.post(
        "http://localhost:7000/admin/createcategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API response:", response.formData);
      alert("Added New Category");
      window.location.href = "/quarter#/categorylist";
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const imagepreviewUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imagepreviewUrl);
    }
  };

  //place create//

  const handleCreateplace = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("place", place);
    formData.append("status", status);
    formData.append("room", room);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("housename", housename);
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    formData.append("refund", refund);
    formData.append("about", about);
    formData.append("ogprice", ogprice);
    formData.append("address", address);
    try {
      const response = await axios.post(
        "http://localhost:7000/admin/adminpanel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API response:", response.formData);
      alert("Added new Homestay");
      window.location.href = "/quarter#/adminpanellist";
    } catch (err) {
      console.log(err);
    }
  };

  const handleImages = (e) => {
    const selectedImage = e.target.files;
    setImage([...selectedImage]);

    const imageUrls = Array.from(selectedImage).map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(imageUrls);
  };

  //categorylist//

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/admin/categorylist"
      );
      setCategory(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //destination create

  const handleDestination = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("loc", loc);
    formData.append("des", des);
    formData.append("add", add);
    formData.append("categories", categories);
    formData.append("destination", destination);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:7000/admin/destinationcreate",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Destination Added Successfully");
      window.location.href ="/quarter#/destinationlist"
    } catch (error) {
      console.error(
        "Error occurred:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to add destination.");
    }
  };

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="liton__wishlist-area pb-70">
      <Navbar />
      <PageHeader headertitle="Admin Panel" />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* PRODUCT TAB AREA START */}
            <div className="ltn__product-tab-area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="ltn__tab-menu-list mb-50">
                      <div className="nav">
                        <a
                          className="active show"
                          data-bs-toggle="tab"
                          href="#ltn_tab_1_1"
                        >
                          Dashboard <i className="fas fa-home" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_2">
                          Profiles <i className="fas fa-user" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_3">
                          address <i className="fas fa-map-marker-alt" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_4">
                          Account Details <i className="fas fa-user" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_5">
                          My Properties <i className="fa-solid fa-list" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_6">
                          Favorited Properties{" "}
                          <i className="fa-solid fa-heart" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_10">
                          Add Homestay{" "}
                          <i className="fa-solid fa-map-location-dot" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_7">
                          Add Destination{" "}
                          <i className="fa-solid fa-map-location-dot" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_8">
                          Payments{" "}
                          <i className="fa-solid fa-money-check-dollar" />
                        </a>
                        <a data-bs-toggle="tab" href="#ltn_tab_1_9">
                          Change Password <i className="fa-solid fa-lock" />
                        </a>
                        <a href="login.html">
                          Logout <i className="fas fa-sign-out-alt" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="ltn_tab_1_1"
                      >
                        <div className="ltn__myaccount-tab-content-inner">
                          <p>
                            Hello <strong>UserName</strong> (not{" "}
                            <strong>UserName</strong>?{" "}
                            <small>
                              <a href="login.html">Log out</a>
                            </small>{" "}
                            )
                          </p>
                          <p>
                            From your account dashboard you can view your{" "}
                            <span>recent orders</span>, manage your{" "}
                            <span>shipping and billing addresses</span>, and{" "}
                            <span>edit your password and account details</span>.
                          </p>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_2">
                        <div className="ltn__myaccount-tab-content-inner">
                          {/* comment-area */}
                          <div className="ltn__comment-area mb-50">
                            <div className="ltn-author-introducing clearfix">
                              <div className="author-img">
                                <img
                                  src={publicUrl + "assets/img/blog/author.jpg"}
                                  alt="Author Image"
                                />
                              </div>
                              <div className="author-info">
                                <h6>Agent of Property</h6>
                                <h2>Rosalina D. William</h2>
                                <div className="footer-address">
                                  <ul>
                                    <li>
                                      <div className="footer-address-icon">
                                        <i className="icon-placeholder" />
                                      </div>
                                      <div className="footer-address-info">
                                        <p>Brooklyn, New York, United States</p>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="footer-address-icon">
                                        <i className="icon-call" />
                                      </div>
                                      <div className="footer-address-info">
                                        <p>
                                          <a href="tel:+0123-456789">
                                            +0123-456789
                                          </a>
                                        </p>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="footer-address-icon">
                                        <i className="icon-mail" />
                                      </div>
                                      <div className="footer-address-info">
                                        <p>
                                          <a href="mailto:example@example.com">
                                            example@example.com
                                          </a>
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="ltn__form-box contact-form-box box-shadow white-bg">
                              <h4 className="title-2">Get A Quote</h4>
                              <form
                                id="contact-form"
                                action="mail.php"
                                method="post"
                              >
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="input-item input-item-name ltn__custom-icon">
                                      <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="input-item input-item-email ltn__custom-icon">
                                      <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter email address"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="input-item">
                                      <select className="nice-select">
                                        <option>Select Service Type</option>
                                        <option>Property Management </option>
                                        <option>Mortgage Service </option>
                                        <option>Consulting Service</option>
                                        <option>Home Buying</option>
                                        <option>Home Selling</option>
                                        <option>Escrow Services</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="input-item input-item-phone ltn__custom-icon">
                                      <input
                                        type="text"
                                        name="phone"
                                        placeholder="Enter phone number"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="input-item input-item-textarea ltn__custom-icon">
                                  <textarea
                                    name="message"
                                    placeholder="Enter message"
                                    defaultValue={""}
                                  />
                                </div>
                                <p>
                                  <label className="input-info-save mb-0">
                                    <input type="checkbox" name="agree" /> Save
                                    my name, email, and website in this browser
                                    for the next time I comment.
                                  </label>
                                </p>
                                <div className="btn-wrapper mt-0">
                                  <button
                                    className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                    type="submit"
                                  >
                                    get a free service
                                  </button>
                                </div>
                                <p className="form-messege mb-0 mt-20" />
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_3">
                        <div className="ltn__myaccount-tab-content-inner">
                          <p>
                            The following addresses will be used on the checkout
                            page by default.
                          </p>
                          <div className="row">
                            <div className="col-md-6 col-12 learts-mb-30">
                              <h4>
                                Billing Address{" "}
                                <small>
                                  <Link to="#">edit</Link>
                                </small>
                              </h4>
                              <address>
                                <p>
                                  <strong>Alex Tuntuni</strong>
                                </p>
                                <p>
                                  1355 Market St, Suite 900 <br />
                                  San Francisco, CA 94103
                                </p>
                                <p>Mobile: (123) 456-7890</p>
                              </address>
                            </div>
                            <div className="col-md-6 col-12 learts-mb-30">
                              <h4>
                                Shipping Address{" "}
                                <small>
                                  <Link to="#">edit</Link>
                                </small>
                              </h4>
                              <address>
                                <p>
                                  <strong>Alex Tuntuni</strong>
                                </p>
                                <p>
                                  1355 Market St, Suite 900 <br />
                                  San Francisco, CA 94103
                                </p>
                                <p>Mobile: (123) 456-7890</p>
                              </address>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_4">
                        <div className="ltn__myaccount-tab-content-inner">
                          <p>
                            The following addresses will be used on the checkout
                            page by default.
                          </p>
                          <div className="ltn__form-box">
                            <form action="#">
                              <div className="row mb-50">
                                <div className="col-md-6">
                                  <label>First name:</label>
                                  <input type="text" name="ltn__name" />
                                </div>
                                <div className="col-md-6">
                                  <label>Last name:</label>
                                  <input type="text" name="ltn__lastname" />
                                </div>
                                <div className="col-md-6">
                                  <label>Display Name:</label>
                                  <input
                                    type="text"
                                    name="ltn__lastname"
                                    placeholder="Ethan"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label>Display Email:</label>
                                  <input
                                    type="email"
                                    name="ltn__lastname"
                                    placeholder="example@example.com"
                                  />
                                </div>
                              </div>
                              <fieldset>
                                <legend>Password change</legend>
                                <div className="row">
                                  <div className="col-md-12">
                                    <label>
                                      Current password (leave blank to leave
                                      unchanged):
                                    </label>
                                    <input type="password" name="ltn__name" />
                                    <label>
                                      New password (leave blank to leave
                                      unchanged):
                                    </label>
                                    <input
                                      type="password"
                                      name="ltn__lastname"
                                    />
                                    <label>Confirm new password:</label>
                                    <input
                                      type="password"
                                      name="ltn__lastname"
                                    />
                                  </div>
                                </div>
                              </fieldset>
                              <div className="btn-wrapper">
                                <button
                                  type="submit"
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_5">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="ltn__my-properties-table table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">My Properties</th>
                                  <th scope="col" />
                                  <th scope="col">Date Added</th>
                                  <th scope="col">Actions</th>
                                  <th scope="col">Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="ltn__my-properties-img go-top">
                                    <Link to="/product-details">
                                      <img
                                        src={
                                          publicUrl +
                                          "assets/img/product-3/2.jpg"
                                        }
                                        alt="#"
                                      />
                                    </Link>
                                  </td>
                                  <td>
                                    <div className="ltn__my-properties-info">
                                      <h6 className="mb-10 go-top">
                                        <Link to="/product-details">
                                          New Apartment Nice View
                                        </Link>
                                      </h6>
                                      <small>
                                        <i className="icon-placeholder" />{" "}
                                        Brooklyn, New York, United States
                                      </small>
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
                                    </div>
                                  </td>
                                  <td>Feb 22, 2022</td>
                                  <td>
                                    <Link to="#">Edit</Link>
                                  </td>
                                  <td>
                                    <Link tp="#">
                                      <i className="fa-solid fa-trash-can" />
                                    </Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="ltn__my-properties-img go-top">
                                    <Link to="/product-details">
                                      <img
                                        src={
                                          publicUrl +
                                          "assets/img/product-3/3.jpg"
                                        }
                                        alt="#"
                                      />
                                    </Link>
                                  </td>
                                  <td>
                                    <div className="ltn__my-properties-info">
                                      <h6 className="mb-10 go-top">
                                        <Link to="/product-details">
                                          New Apartment Nice View
                                        </Link>
                                      </h6>
                                      <small>
                                        <i className="icon-placeholder" />{" "}
                                        Brooklyn, New York, United States
                                      </small>
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
                                    </div>
                                  </td>
                                  <td>Feb 22, 2022</td>
                                  <td>
                                    <Link to="#">Edit</Link>
                                  </td>
                                  <td>
                                    <Link tp="#">
                                      <i className="fa-solid fa-trash-can" />
                                    </Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="ltn__my-properties-img go-top">
                                    <Link to="/product-details">
                                      <img
                                        src={
                                          publicUrl +
                                          "assets/img/product-3/7.jpg"
                                        }
                                        alt="#"
                                      />
                                    </Link>
                                  </td>
                                  <td>
                                    <div className="ltn__my-properties-info">
                                      <h6 className="mb-10 go-top">
                                        <Link to="/product-details">
                                          New Apartment Nice View
                                        </Link>
                                      </h6>
                                      <small>
                                        <i className="icon-placeholder" />{" "}
                                        Brooklyn, New York, United States
                                      </small>
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
                                    </div>
                                  </td>
                                  <td>Feb 22, 2022</td>
                                  <td>
                                    <Link to="#">Edit</Link>
                                  </td>
                                  <td>
                                    <Link tp="#">
                                      <i className="fa-solid fa-trash-can" />
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="ltn__pagination-area text-center">
                            <div className="ltn__pagination">
                              <ul>
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-angle-double-left" />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">1</Link>
                                </li>
                                <li className="active">
                                  <Link to="#">2</Link>
                                </li>
                                <li>
                                  <Link to="#">3</Link>
                                </li>
                                <li>
                                  <Link to="#">...</Link>
                                </li>
                                <li>
                                  <Link to="#">10</Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-angle-double-right" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_6">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="ltn__my-properties-table table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Top Property</th>
                                  <th scope="col" />
                                  <th scope="col">Date Added</th>
                                  <th scope="col">Actions</th>
                                  <th scope="col">Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="ltn__my-properties-img go-top">
                                    <Link to="/product-details">
                                      <img
                                        src={
                                          publicUrl +
                                          "assets/img/product-3/2.jpg"
                                        }
                                        alt="#"
                                      />
                                    </Link>
                                  </td>
                                  <td>
                                    <div className="ltn__my-properties-info">
                                      <h6 className="mb-10 go-top">
                                        <Link to="/product-details">
                                          New Apartment Nice View
                                        </Link>
                                      </h6>
                                      <small>
                                        <i className="icon-placeholder" />{" "}
                                        Brooklyn, New York, United States
                                      </small>
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
                                    </div>
                                  </td>
                                  <td>Feb 22, 2022</td>
                                  <td>
                                    <Link to="#">Edit</Link>
                                  </td>
                                  <td>
                                    <Link tp="#">
                                      <i className="fa-solid fa-trash-can" />
                                    </Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="ltn__my-properties-img go-top">
                                    <Link to="/product-details">
                                      <img
                                        src={
                                          publicUrl +
                                          "assets/img/product-3/3.jpg"
                                        }
                                        alt="#"
                                      />
                                    </Link>
                                  </td>
                                  <td>
                                    <div className="ltn__my-properties-info">
                                      <h6 className="mb-10 go-top">
                                        <Link to="/product-details">
                                          New Apartment Nice View
                                        </Link>
                                      </h6>
                                      <small>
                                        <i className="icon-placeholder" />{" "}
                                        Brooklyn, New York, United States
                                      </small>
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
                                    </div>
                                  </td>
                                  <td>Feb 22, 2022</td>
                                  <td>
                                    <Link to="#">Edit</Link>
                                  </td>
                                  <td>
                                    <Link tp="#">
                                      <i className="fa-solid fa-trash-can" />
                                    </Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="ltn__my-properties-img go-top">
                                    <Link to="/product-details">
                                      <img
                                        src={
                                          publicUrl +
                                          "assets/img/product-3/7.jpg"
                                        }
                                        alt="#"
                                      />
                                    </Link>
                                  </td>
                                  <td>
                                    <div className="ltn__my-properties-info">
                                      <h6 className="mb-10 go-top">
                                        <Link to="/product-details">
                                          New Apartment Nice View
                                        </Link>
                                      </h6>
                                      <small>
                                        <i className="icon-placeholder" />{" "}
                                        Brooklyn, New York, United States
                                      </small>
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
                                    </div>
                                  </td>
                                  <td>Feb 22, 2022</td>
                                  <td>
                                    <Link to="#">Edit</Link>
                                  </td>
                                  <td>
                                    <Link tp="#">
                                      <i className="fa-solid fa-trash-can" />
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="ltn__pagination-area text-center">
                            <div className="ltn__pagination">
                              <ul>
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-angle-double-left" />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">1</Link>
                                </li>
                                <li className="active">
                                  <Link to="#">2</Link>
                                </li>
                                <li>
                                  <Link to="#">3</Link>
                                </li>
                                <li>
                                  <Link to="#">...</Link>
                                </li>
                                <li>
                                  <Link to="#">10</Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-angle-double-right" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* //add destination// */}
                      <div className="tab-pane fade" id="ltn_tab_1_7">
                        <div className="ltn__myaccount-tab-content-inner">
                          <h6>Destination Add</h6>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Destination Name"
                                  value={destination}
                                  onChange={(e) =>
                                    setDestination(e.target.value)
                                  }
                                />
                              </div>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <textarea
                                  name="ltn__message"
                                  placeholder="Description"
                                  defaultValue={""}
                                  value={des}
                                  onChange={(e) => setDes(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="input-item">
                                <select
                                  className="nice-select"
                                  value={categories}
                                  onChange={(e) =>
                                    setCategories(e.target.value)
                                  }
                                >
                                  <option>Category</option>
                                  {category.map((cat) => (
                                    <option>{cat.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Location"
                                  value={loc}
                                  onChange={(e) => setLoc(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <textarea
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Address"
                                  value={add}
                                  onChange={(e) => setAdd(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <h6>Choose Image</h6>
                          <input
                            type="file"
                            id="myFile"
                            name="filename"
                            className="btn theme-btn-3 mb-10"
                            accept="image/*"
                            onChange={handleImage}
                          />
                          <br />
                          <div className="btn-wrapper">
                            <button
                              className="theme-btn-1 btn reverse-color btn-block"
                              type="submit"
                              style={{ width: "100%" }}
                              onClick={handleDestination}
                            >
                              CREATE
                            </button>
                          </div>
                          <p>
                            <small>
                              * At least 1 image is required for a valid
                              submission.Minimum size is 500/500px.
                            </small>
                            <br />
                            <small>* PDF files upload supported as well.</small>
                            <br />
                            <small>
                              * Images might take longer to be processed.
                            </small>
                          </p>
                        </div>
                      </div>
                      {/* //add destination End// */}

                      {/* //homestay adding Start // */}
                      <div className="tab-pane fade" id="ltn_tab_1_10">
                        <div className="ltn__myaccount-tab-content-inner">
                          <h6>Property Description</h6>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Housename"
                                  value={housename}
                                  onChange={(e) => setHousename(e.target.value)}
                                />
                              </div>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <textarea
                                  name="ltn__message"
                                  placeholder="Address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                          <h6>Other Details</h6>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="input-item  input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Exact price"
                                  value={ogprice}
                                  onChange={(e) => setOgprice(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Offer price"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <textarea
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Description"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <textarea
                                  type="text"
                                  name="ltn__name"
                                  placeholder="About Place"
                                  value={about}
                                  onChange={(e) => setAbout(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="ltn__name"
                                  placeholder="Location"
                                  value={location}
                                  onChange={(e) => setLocation(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="property-details-google-map mb-60">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                frameBorder={0}
                                allowFullScreen
                                aria-hidden="false"
                                tabIndex={0}
                              />
                            </div>
                          </div>
                          <h6>Select Categories</h6>
                          <div className="row">
                            <div className="col-lg-4 col-md-6">
                              <div className="input-item">
                                <select
                                  className="nice-select"
                                  value={place}
                                  onChange={(e) => setPlace(e.target.value)}
                                >
                                  <option>Place</option>
                                  {category.map((cat) => (
                                    <option>{cat.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="input-item">
                                <select
                                  className="nice-select"
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  <option>Status</option>
                                  <option>Available</option>
                                  <option>Not Available</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="input-item">
                                <select
                                  className="nice-select"
                                  value={refund}
                                  onChange={(e) => setRefund(e.target.value)}
                                >
                                  <option>Refund</option>
                                  <option>Available</option>
                                  <option>Not Available</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                              <div className="input-item">
                                <select
                                  className="nice-select"
                                  value={room}
                                  onChange={(e) => setRoom(e.target.value)}
                                >
                                  <option>Rooms</option>
                                  <option>1BHK</option>
                                  <option>2BHK</option>
                                  <option>2BHK</option>
                                  <option>3BHK</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* <h6>Services</h6>
                            <div className="row">
                              <div className="col-lg-4 col-md-6">
                                <label className="checkbox-item">
                                  Chair Accessible
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                <label className="checkbox-item">
                                  Elevator
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                <label className="checkbox-item">
                                  Fireplace
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                <label className="checkbox-item">
                                  Smoke detectors
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                <label className="checkbox-item">
                                  Washer and dryer
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                              <div className="col-lg-4 col-md-6">
                                <label className="checkbox-item">
                                  WiFi
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
							<br/> */}
                          <h6>Add Images</h6>
                          <input
                            type="file"
                            id="myFile"
                            name="filename"
                            className="btn theme-btn-3 mb-10"
                            accept="image/*"
                            multiple
                            onChange={handleImages}
                          />
                          <br />
                          <div className="btn-wrapper">
                            <button
                              className="theme-btn-1 btn reverse-color btn-block"
                              type="submit"
                              style={{ width: "100%" }}
                              onClick={handleCreateplace}
                            >
                              CREATE
                            </button>
                          </div>
                          <br />
                          <p>
                            <small>
                              * At least 1 image is required for a valid
                              submission.Minimum size is 500/500px.
                            </small>
                            <br />
                            <small>* PDF files upload supported as well.</small>
                            <br />
                            <small>
                              * Images might take longer to be processed.
                            </small>
                          </p>
                          {/* <h6>Video Option</h6>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="input-item">
                                  <select className="nice-select">
                                    <option>Video from</option>
                                    <option>vimeo</option>
                                    <option>youtube</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="input-item input-item-textarea ltn__custom-icon">
                                  <input
                                    type="text"
                                    name="ltn__name"
                                    placeholder="Embed Video ID"
                                  />
                                </div>
                              </div>
                            </div>
                            <h6>Virtual Tour</h6>
                            <div className="input-item input-item-textarea ltn__custom-icon">
                              <textarea
                                name="ltn__message"
                                placeholder="Virtual Tour:"
                                defaultValue={""}
                              />
                            </div> */}
                          <h6>Create Category</h6>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  name="ltn__name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="Name of the Place"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="input-item input-item-textarea ">
                                <input
                                  type="file"
                                  id="myFile"
                                  name="filename"
                                  accept="image/*"
                                  onChange={handleImage}
                                />
                                {imagePreview && (
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ width: "100%", height: "auto" }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div
                            className="alert alert-warning d-none"
                            role="alert"
                          >
                            Please note that the date and time you requested may
                            not be available. We will contact you to confirm
                            your actual appointment details.
                          </div>
                          <div className="btn-wrapper text-center--- mt-30">
                            <button
                              className="btn theme-btn-1 btn-effect-1 text-uppercase"
                              type="submit"
                              onClick={handleCreate}
                            >
                              Create New Category
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* //homestay  create end // */}

                      <div className="tab-pane fade" id="ltn_tab_1_8">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="ltn__checkout-inner">
                                <div className="ltn__checkout-single-content ltn__returning-customer-wrap">
                                  <h5>
                                    Returning customer?{" "}
                                    <a
                                      className="ltn__secondary-color"
                                      href="#ltn__returning-customer-login"
                                      data-toggle="collapse"
                                    >
                                      Click here to login
                                    </a>
                                  </h5>
                                  <div
                                    id="ltn__returning-customer-login"
                                    className="collapse ltn__checkout-single-content-info"
                                  >
                                    <div className="ltn_coupon-code-form ltn__form-box">
                                      <p>Please login your accont.</p>
                                      <form action="#">
                                        <div className="row">
                                          <div className="col-md-6">
                                            <div className="input-item input-item-name ltn__custom-icon">
                                              <input
                                                type="text"
                                                name="ltn__name"
                                                placeholder="Enter your name"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="input-item input-item-email ltn__custom-icon">
                                              <input
                                                type="email"
                                                name="ltn__email"
                                                placeholder="Enter email address"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <button className="btn theme-btn-1 btn-effect-1 text-uppercase">
                                          Login
                                        </button>
                                        <label className="input-info-save mb-0">
                                          <input type="checkbox" name="agree" />{" "}
                                          Remember me
                                        </label>
                                        <p className="mt-30">
                                          <a href="register.html">
                                            Lost your password?
                                          </a>
                                        </p>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <div className="ltn__checkout-single-content ltn__coupon-code-wrap">
                                  <h5>
                                    Have a coupon?{" "}
                                    <a
                                      className="ltn__secondary-color"
                                      href="#ltn__coupon-code"
                                      data-toggle="collapse"
                                    >
                                      Click here to enter your code
                                    </a>
                                  </h5>
                                  <div
                                    id="ltn__coupon-code"
                                    className="collapse ltn__checkout-single-content-info"
                                  >
                                    <div className="ltn__coupon-code-form">
                                      <p>
                                        If you have a coupon code, please apply
                                        it below.
                                      </p>
                                      <form action="#">
                                        <input
                                          type="text"
                                          name="coupon-code"
                                          placeholder="Coupon code"
                                        />
                                        <button className="btn theme-btn-2 btn-effect-2 text-uppercase">
                                          Apply Coupon
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <div className="ltn__checkout-single-content mt-50">
                                  <h4 className="title-2">Billing Details</h4>
                                  <div className="ltn__checkout-single-content-info">
                                    <form action="#">
                                      <h6>Personal Information</h6>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="input-item input-item-name ltn__custom-icon">
                                            <input
                                              type="text"
                                              name="ltn__name"
                                              placeholder="First name"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="input-item input-item-name ltn__custom-icon">
                                            <input
                                              type="text"
                                              name="ltn__lastname"
                                              placeholder="Last name"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="input-item input-item-email ltn__custom-icon">
                                            <input
                                              type="email"
                                              name="ltn__email"
                                              placeholder="email address"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="input-item input-item-phone ltn__custom-icon">
                                            <input
                                              type="text"
                                              name="ltn__phone"
                                              placeholder="phone number"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="input-item input-item-website ltn__custom-icon">
                                            <input
                                              type="text"
                                              name="ltn__company"
                                              placeholder="Company name (optional)"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="input-item input-item-website ltn__custom-icon">
                                            <input
                                              type="text"
                                              name="ltn__phone"
                                              placeholder="Company address (optional)"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-4 col-md-6">
                                          <h6>Country</h6>
                                          <div className="input-item">
                                            <select className="nice-select">
                                              <option>Select Country</option>
                                              <option>Australia</option>
                                              <option>Canada</option>
                                              <option>China</option>
                                              <option>Morocco</option>
                                              <option>Saudi Arabia</option>
                                              <option>
                                                United Kingdom (UK)
                                              </option>
                                              <option>
                                                United States (US)
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                          <h6>Address</h6>
                                          <div className="row">
                                            <div className="col-md-6">
                                              <div className="input-item">
                                                <input
                                                  type="text"
                                                  placeholder="House number and street name"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-md-6">
                                              <div className="input-item">
                                                <input
                                                  type="text"
                                                  placeholder="Apartment, suite, unit etc. (optional)"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                          <h6>Town / City</h6>
                                          <div className="input-item">
                                            <input
                                              type="text"
                                              placeholder="City"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                          <h6>State </h6>
                                          <div className="input-item">
                                            <input
                                              type="text"
                                              placeholder="State"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                          <h6>Zip</h6>
                                          <div className="input-item">
                                            <input
                                              type="text"
                                              placeholder="Zip"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <p>
                                        <label className="input-info-save mb-0">
                                          <input type="checkbox" name="agree" />{" "}
                                          Create an account?
                                        </label>
                                      </p>
                                      <h6>Order Notes (optional)</h6>
                                      <div className="input-item input-item-textarea ltn__custom-icon">
                                        <textarea
                                          name="ltn__message"
                                          placeholder="Notes about your order, e.g. special notes for delivery."
                                          defaultValue={""}
                                        />
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="ltn__checkout-payment-method mt-50">
                                <h4 className="title-2">Payment Method</h4>
                                <div id="checkout_accordion_1">
                                  {/* card */}
                                  <div className="card">
                                    <h5
                                      className="collapsed ltn__card-title"
                                      data-toggle="collapse"
                                      data-target="#faq-item-2-1"
                                      aria-expanded="false"
                                    >
                                      Check payments
                                    </h5>
                                    <div
                                      id="faq-item-2-1"
                                      className="collapse"
                                      data-parent="#checkout_accordion_1"
                                    >
                                      <div className="card-body">
                                        <p>
                                          Please send a check to Store Name,
                                          Store Street, Store Town, Store State
                                          / County, Store Postcode.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* card */}
                                  <div className="card">
                                    <h5
                                      className="ltn__card-title"
                                      data-toggle="collapse"
                                      data-target="#faq-item-2-2"
                                      aria-expanded="true"
                                    >
                                      Cash on delivery
                                    </h5>
                                    <div
                                      id="faq-item-2-2"
                                      className="collapse show"
                                      data-parent="#checkout_accordion_1"
                                    >
                                      <div className="card-body">
                                        <p>Pay with cash upon delivery.</p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* card */}
                                  <div className="card">
                                    <h5
                                      className="collapsed ltn__card-title"
                                      data-toggle="collapse"
                                      data-target="#faq-item-2-3"
                                      aria-expanded="false"
                                    >
                                      PayPal{" "}
                                      <img
                                        src={
                                          publicUrl +
                                          "assets/img/icons/payment-3.png"
                                        }
                                        alt="#"
                                      />
                                    </h5>
                                    <div
                                      id="faq-item-2-3"
                                      className="collapse"
                                      data-parent="#checkout_accordion_1"
                                    >
                                      <div className="card-body">
                                        <p>
                                          Pay via PayPal; you can pay with your
                                          credit card if you don’t have a PayPal
                                          account.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="ltn__payment-note mt-30 mb-30">
                                  <p>
                                    Your personal data will be used to process
                                    your order, support your experience
                                    throughout this website, and for other
                                    purposes described in our privacy policy.
                                  </p>
                                </div>
                                <button
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                  type="submit"
                                >
                                  Place order
                                </button>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="shoping-cart-total mt-50">
                                <h4 className="title-2">Cart Totals</h4>
                                <table className="table">
                                  <tbody>
                                    <tr>
                                      <td>
                                        3 Rooms Manhattan <strong>× 2</strong>
                                      </td>
                                      <td>$298.00</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        OE Replica Wheels <strong>× 2</strong>
                                      </td>
                                      <td>$170.00</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Wheel Bearing Retainer{" "}
                                        <strong>× 2</strong>
                                      </td>
                                      <td>$150.00</td>
                                    </tr>
                                    <tr>
                                      <td>Shipping and Handing</td>
                                      <td>$15.00</td>
                                    </tr>
                                    <tr>
                                      <td>Vat</td>
                                      <td>$00.00</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <strong>Order Total</strong>
                                      </td>
                                      <td>
                                        <strong>$633.00</strong>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="ltn_tab_1_9">
                        <div className="ltn__myaccount-tab-content-inner">
                          <div className="account-login-inner">
                            <form
                              action="#"
                              className="ltn__form-box contact-form-box"
                            >
                              <h5 className="mb-30">Change Password</h5>
                              <input
                                type="password"
                                name="password"
                                placeholder="Current Password*"
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="New Password*"
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Confirm New Password*"
                              />
                              <div className="btn-wrapper mt-0">
                                <button
                                  className="theme-btn-1 btn btn-block"
                                  type="submit"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* PRODUCT TAB AREA END */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;