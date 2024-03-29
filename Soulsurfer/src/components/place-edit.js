import PageHeader from "./global-components/page-header";
// import CallToActionV1 from './section-components/call-to-action-v1';
// <CallToActionV1 />
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import parse from "html-react-parser";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Admins1() {
  //   render()
  // let publicUrl = process.env.PUBLIC_URL + "/";

  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/admin/adminpaneledit/${id}`
        );
        const places = response.data;
        setDescription(places.description);
        setPrice(places.price);
        setPlace(places.place);
        setStatus(places.status);
        setRoom(places.room);
        setLocation(places.location);
        setImage(places.image);
        setImagePreviewUrl(`http://localhost:7000/upload/${places.image}`);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [id]);

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const imagePreviewUrl = URL.createObjectURL(selectedImage); 
      setImagePreviewUrl(imagePreviewUrl);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("place", place);
    formData.append("status", status);
    formData.append("room", room);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    try {
      const response = await axios.put(
        `http://localhost:7000/admin/updated/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update response:", response);
      window.location.href = "/quarter#/adminpanellist";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <br/>
              <h1 className="section-title">
                Edit  Homestay Details
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
                    <option>Place</option>
                    <option>New Delhi</option>
                    <option>Tamilnadu</option>
                    <option>Goa</option>
                    <option>Manali</option>
                    <option>Kerala</option>
                  </select>
                </div>
                <br />
                <input
                  type="text"
                  id="place"
                  placeholder="Place Name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <input
                  type="file"
                  id="image"
                  placeholder="Image"
                  onChange={handleImage}
                  accept="image/*"
                />
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <br />
                <br />
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
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
                    <option>Availble</option>
                    <option>Not Availble</option>
                  </select>
                </div>
                <br />
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
                <br />
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

export default Admins1;
