import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function AboutV4() {
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [room, setRoom] = useState("");
  const [ogprice, setOgprice] = useState("");
  const { id } = useParams();
  const history =useHistory("")

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/admin/adminpaneledit/${id}`
        );
        const places = response.data;
        setDescription(places.description);
        setPrice(places.price);
        setOgprice(places.ogprice);
        setAbout(places.about);
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

  const handleBooking = async(id)=>{
    history.push(`/blog/${id}`)
  }

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="ltn__about-us-area pt-120--- pb-90 mt--30 go-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="about-us-img-wrap about-img-left">
              <img
                src={`http://localhost:7000/upload/${image[0]}`}
                alt="About Us Image"
              />
              <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
                <div className="ltn__video-img ltn__animation-pulse1"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2--- mb-20">
                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                  About Us
                </h6>
                <h1 className="section-title">
                  {place}
                  <span>.</span>
                </h1>
                <p>{about}</p>
              </div>
              <ul className="ltn__list-item-half clearfix">
                <li>
                  <i className="flaticon-home-2" />
                  Smart Home Design
                </li>
                <li>
                  <i className="flaticon-mountain" />
                  Beautiful Scene Around
                </li>
                <li>
                  <i className="flaticon-heart" />
                  Exceptional Lifestyle
                </li>
                <li>
                  <i className="flaticon-secure" />
                  Complete 24/7 Security
                </li>
              </ul>
              <div>
                <p>₹.{price} {ogprice}</p>
              </div>
              <div className="ltn__callout bg-overlay-theme-05  mt-30">
                <p>"{description}" </p>
              </div>
              <div className="btn-wrapper animated" onClick={()=>handleBooking(place._id)}>
                <Link to="" className="theme-btn-1 btn btn-effect-1">
                  BOOKING
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />

        <br />

        <div className="row ltn__custom-gutter--- justify-content-center go-top">
          {image.slice(0).map((img,index) => (
              <div key={index} className="col-lg-4 col-sm-6 col-12">
                <div
                  className={`ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1 ${
                    index === 0 ? "active" : ""
                  }`}
                >
                  <div className="ltn__feature-icon">
                    <img
                      src={`http://localhost:7000/upload/${img}`} // Use `img` here which is each image from the array
                      alt="homestay images"
                    />
                  </div>
                  <div className="ltn__feature-info">
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutV4;
