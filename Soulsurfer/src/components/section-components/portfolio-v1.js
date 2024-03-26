import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";

function PortfolioV1() {
  // render() {

  let publicUrl = process.env.PUBLIC_URL + "/";
  const [homestay , setHomestay] =useState([])

  useEffect(()=>{
	fetchDisplay();
  },[])
  const fetchDisplay = async()=>{
  const response = await axios.get("http://localhost:7000/admin/adminpanellist")
  .then((response)=>{
	setHomestay(response.data)
  })
  .catch((err)=>{
	console.log(err);
  })
  }

  return (
    <div className="ltn__gallery-area mb-120">
      <div className="container">
        {/* (ltn__gallery-info-hide) Class for 'ltn__gallery-item-info' not showing */}
        <div className="ltn__gallery-active row ltn__gallery-style-2 ltn__gallery-info-hide---">
          <div className="ltn__gallery-sizer col-1" />
          {/* gallery-item */}
		  {homestay.map((place)=>(
          <div className="ltn__gallery-item filter_category_3 col-lg-4 col-sm-6 col-12">
            <div className="ltn__gallery-item-inner">
              <div className="ltn__gallery-item-img">
                <a>
                  <img
					src={`http://localhost:7000/upload/${place.image}`}
                    alt="Image"
                  />
                  <span className="ltn__gallery-action-icon">
                    <i className="fas fa-search" />
                  </span>
                </a>
              </div>
              <div className="ltn__gallery-item-info">
                <h4 className="go-top">
                  <Link to="/portfolio-details">{place.status} </Link>
                </h4>
                <p>{place.description} </p>
              </div>
            </div>
          </div>
		  ))}
        </div>
        <div id="ltn__inline_description_1" style={{ display: "none" }}>
          <h4 className="first">
            This content comes from a hidden element on that page
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis
            mi eu elit tempor facilisis id et neque. Nulla sit amet sem sapien.
            Vestibulum imperdiet porta ante ac ornare. Nulla et lorem eu nibh
            adipiscing ultricies nec at lacus. Cras laoreet ultricies sem, at
            blandit mi eleifend aliquam. Nunc enim ipsum, vehicula non pretium
            varius, cursus ac tortor.
          </p>
          <p>
            Vivamus fringilla congue laoreet. Quisque ultrices sodales orci,
            quis rhoncus justo auctor in. Phasellus dui eros, bibendum eu
            feugiat ornare, faucibus eu mi. Nunc aliquet tempus sem, id aliquam
            diam varius ac. Maecenas nisl nunc, molestie vitae eleifend vel.
          </p>
        </div>
        <div className="btn-wrapper text-center">
          <Link to="#" className="btn btn-transparent btn-effect-3 btn-border">
            LOAD MORE +
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PortfolioV1;
