import PageHeader from "../global-components/page-header";
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
  const [image, setImage] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState("");
  const [refund, setRefund] = useState("");
  const [address, setAddress] = useState("");
  const [ogprice, setOgprice] = useState("");
  const [about, setAbout] = useState("");
  const [housename, setHousename] = useState("");
  const [category ,setCategory] =useState([])
  const { id } = useParams();
  useEffect(() => {
    fetchcategory()
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/admin/adminpaneledit/${id}`
        );
        const places = response.data;
        setDescription(places.description);
        setPrice(places.price);
        setHousename(places.housename);
        setPlace(places.place);
        setStatus(places.status);
        setRoom(places.room);
        setLocation(places.location);
        setRefund(places.refund);
        setAbout(places.about);
        setAddress(places.address);
        setOgprice(places.ogprice);
        setImage(places.image);
        setImagePreviewUrl(`http://localhost:7000/upload/${places.image}`);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [id]);

 
  const handleUpdate = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("place", place);
    formData.append("status", status);
    formData.append("room", room);
    formData.append("location", location);
    formData.append("housename", housename);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("refund", refund);
    formData.append("about", about);
    formData.append("ogprice", ogprice);
    formData.append("address", address);
    for(let i =0;i<image.length;i++){
      formData.append ('image',image[i])
    }
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

  const fetchcategory=async()=>{
    try{
      const response =await axios.get("http://localhost:7000/admin/categorylist")
      setCategory(response.data)
    }catch(err){
      console.log(err);
    }
  }

  const handleImage = (e) => {
    const selectedImages = e.target.files;
    setImage([...selectedImages]);
    
    const imageUrls = Array.from(selectedImages).map(file =>
      URL.createObjectURL(file)
    );
    setImagePreviewUrl(imageUrls);
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
                    <option>Selec place</option>
                    {category.map((categories,index)=>(
                    <option key={index}>{categories.name}</option>
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

                <input
                  type="file"
                  id="image"
                  placeholder="Image"
                  onChange={handleImage}
                  accept="image/*"
                  multiple
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
                  type="text"
                  placeholder="Offer Price"
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
                    <option>Availble</option>
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
                    value={refund}
                    onChange={(e) => setRefund(e.target.value)}
                  >
                    <option>Refund</option>
                    <option>Available</option>
                    <option>Not Available</option>
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
