import axios from "axios";
import PageHeader from "../global-components/page-header";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Destinationedit() {
  const [add, setAdd] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [des, setDes] = useState("");
  const [loc, setLoc] = useState("");
  const [destination, setDestination] = useState("");
  const [categories, setCategories] = useState("");
  const [category, setCategory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchCategory();
    const fetchDestinationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/admin/destinationedit/${id}`
        );
        const destinations = response.data;
        setAdd(destinations.add);
        setCategories(destinations.categories);
        setLoc(destinations.loc);
        setImage(destinations.image);
        setDestination(destinations.destination);
        setDes(destinations.des);
        setImagePreview(`http://localhost:7000/upload/${destinations.image}`);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDestinationData();
  }, [id]);

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

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const imagePreview = URL.createObjectURL(selectedImage);
      setImagePreview(imagePreview);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("destination", destination);
    formData.append("des", des);
    formData.append("loc", loc);
    formData.append("add", add);
    formData.append("image", image);
    formData.append("categories", categories);
    try {
      const response = await axios.put(
        `http://localhost:7000/admin/destinationupdate/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Update Successfully");
      window.location.href = "/quarter#/destinationlist";
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
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <textarea
                  type="text"
                  id="place"
                  placeholder="Address"
                  value={add}
                  onChange={(e) => setAdd(e.target.value)}
                />
                <input
                  type="text"
                  id="place"
                  placeholder=" Location"
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                />
                <div style={{ width: "100%" }}>
                  <select
                    style={{
                      width: "100%",
                      height: "55px",
                      borderColor: "#b7d1d0",
                    }}
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                  >
                    <option>Selec place</option>
                    {category.map((places) => (
                      <option> {places.name}</option>
                    ))}
                  </select>
                </div>
                <br />
                <input
                  type="text"
                  id="place"
                  placeholder=" Description"
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
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

export default Destinationedit;
