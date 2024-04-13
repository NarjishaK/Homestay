import PageHeader from "../global-components/page-header";
// import CallToActionV1 from './section-components/call-to-action-v1';
// <CallToActionV1 />
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";

function Admins() {
  //   render()
  let publicUrl = process.env.PUBLIC_URL + "/";

  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
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
    // formData.append("image", image);
    for(let i =0;i<image.length;i++){
      formData.append ('image',image[i])
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
      window.location.href = "/quarter#/adminpanellist";
    } catch (err) {
      console.log(err);
    }
  };

  const handleImages = (e) => {
    const selectedImage = e.target.files;
    setImage([...selectedImage]);
    
    const imageUrls = Array.from(selectedImage).map(file =>
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
  return (
    <div className="ltn__login-area pb-110">
      <PageHeader headertitle="Admin Panel Create" subheader="Create" />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Create <br />
                Homestays
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="account-login-inner">
              <form action="#" className="ltn__form-box contact-form-box">
                <div style={{ width: "100%" }}>
                  <select
                    style={{
                      width: "100%",
                      height: "55px",
                      borderColor: "#b7d1d0",
                    }}
                    value={place} 
                    onChange={(e) => setPlace(e.target.value)} 
                  >
                    <option value="">Select Place</option>
                    {category.map((cat, index) => (
                      <option key={index} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <input
                  type="text"
                  id="place"
                  placeholder="Housename"
                  value={housename}
                  onChange={(e) => setHousename(e.target.value)}
                />
                <input
                  type="text"
                  id="place"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <input
                  type="text"
                  id="place"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <textarea
                  type="text"
                  id="place"
                  placeholder="About the place"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <input type="file" id="image" placeholder="Image" onChange={handleImages} accept="image/*" multiple />

                {imagePreviews && (
                  <img
                    src={imagePreviews}
                    alt="Preview"
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <br />
                <br />
                <input
                  type="text"
                  placeholder="Offer price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Ogprice"
                  value={ogprice}
                  onChange={(e) => setOgprice(e.target.value)}
                />
                <textarea
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div style={{ width: "100%" }}>
                  <select
                    style={{
                      width: "100%",
                      height: "55px",
                      borderColor: "#b7d1d0",
                    }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Status</option>
                    <option>Available</option>
                    <option>Not Available</option>
                  </select>
                </div><br/>
                <div style={{ width: "100%" }}>
                  <select
                    style={{
                      width: "100%",
                      height: "55px",
                      borderColor: "#b7d1d0",
                    }}
                    value={refund}
                    onChange={(e) => setRefund(e.target.value)}
                  >
                    <option>Refund</option>
                    <option>Available</option>
                    <option>Not Available</option>
                  </select>
                </div>
                <br />
                <div style={{ width: "100%" }}>
                  <select
                    style={{
                      width: "100%",
                      height: "55px",
                      borderColor: "#b7d1d0",
                    }}
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  >
                    <option>Rooms</option>
                    <option>1BHK</option>
                    <option>2BHK</option>
                    <option>3BHK</option>
                    <option>4BHK</option>
                  </select>
                </div>
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
              </form>
              <div className="by-agree text-center">
                <div className="go-to-btn mt-20 go-top">
                  <Link to="/adminpanellist">GO BACK</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admins;
