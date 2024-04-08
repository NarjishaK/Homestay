import axios from "axios";
import PageHeader from "../global-components/page-header";
// import CallToActionV1 from './section-components/call-to-action-v1';
// <CallToActionV1 />
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

function Categorycreate() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

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

  return (
    <div className="ltn__login-area pb-110">
      <PageHeader headertitle="Admin Panel Create" subheader="Create" />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Create <br />
                Categories
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="account-login-inner">
              <form action="#" className="ltn__form-box contact-form-box">
                <input
                  type="text"
                  id="place"
                  placeholder="Place Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="file"
                  id="image"
                  placeholder="Image"
                  accept="image/*"
                  onChange={handleImage}
                />
                {imagePreview && (
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto' }}/>
                )}
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                    style={{ width: "100%" }}
                    onClick={handleCreate}
                  >
                    CREATE
                  </button>
                </div>
              </form>
              <div className="by-agree text-center">
                <div className="go-to-btn mt-20 go-top">
                  <Link to="/categorylist">GO BACK</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorycreate;
