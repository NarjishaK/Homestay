import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";

function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  let publicUrl = process.env.PUBLIC_URL + "/";
  useEffect(() => {
    fetchDestination();
  }, []);
  const fetchDestination = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/admin/destinationlist"
      );
      setDestinations(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ltn__img-slider-area">
      <div className="container-fluid">
        <div className="row ltn__image-slider-4-active slick-arrow-1 slick-arrow-1-inner ltn__no-gutter-all">
          {destinations.map((destination) => (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <div className="ltn__img-slide-item-4">
                <a
                  href={`${publicUrl}assets/img/img-slide/21.jpg`}
                  data-rel="lightcase:myCollection"
                >
                  <img
                    src={`http://localhost:7000/upload/${destination.image}`}
                    alt="Image"
                  />
                </a>
                <div className="ltn__img-slide-info">
                  <div className="ltn__img-slide-info-brief gp-top">
                    <h6>{destination.destination}</h6>
                    <h1>
                      <Link to="">{destination.categories} </Link>
                    </h1>
                  </div>
                  <div className="btn-wrapper go-top">
                    <Link
                      to="/portfolio-details"
                      className="btn theme-btn-1 btn-effect-1 text-uppercase"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DestinationList;
