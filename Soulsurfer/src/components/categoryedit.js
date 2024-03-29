import axios from "axios";
import PageHeader from "./global-components/page-header";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Categoryedit() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/admin/categoryedit/${id}`
        );

        const categories = response.data;
        console.log(response.data, "hellllllllllllllllllllo");
        setName(categories.name);
        setImage(categories.image);
        setImagePreview(`http://localhost:7000/upload/${categories.image}`);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategoryData();
  }, [id]);

  // const handleImage = (e) => {
  //   const selectedImage = e.target.files[0];
  //   if (selectedImage) {
  //     setImage(selectedImage);
  //     const imagePreview = URL.createObjectURL(selectedImage);
  //     setImagePreview(imagePreview);
  //   }
  // };
  const handleImage = (e) => {
    const selectedImage = e.target.files[0]; // Corrected typo here
    if (selectedImage) {
      setImage(selectedImage);
      const imagePreview = URL.createObjectURL(selectedImage);
      setImagePreview(imagePreview);
    }
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    try {
      const response = await axios.put(
        `http://localhost:7000/admin/updatecategory/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update response:", response);
      window.location.href = "/quarter#/categorylist";
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
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                    style={{ width: "100%" }}
                    onClick={handleUpdate}
                  >
                    UPDATE
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

export default Categoryedit;
