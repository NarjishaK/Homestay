import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar";
import axios from "axios";

function BlogSlider(props) {
  const [homestay, setHomestay] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/admin/adminpanellist"
      );
      setHomestay(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  let publicUrl = process.env.PUBLIC_URL + "/";
  let customClass = props.customClass ? props.customClass : "";
  let sectionClass = props.sectionClass ? props.sectionClass : "";
  return (
    <div className={"ltn__blog-area pt-115--- pb-70 go-top " + sectionClass}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2--- text-center">
              <h6
                className={
                  "section-subtitle ltn__secondary-color " + customClass
                }
              >
                New &amp; Popular
              </h6>
              <h1 className="section-title">Leatest HOmestays</h1>
            </div>
          </div>
        </div>
        <div className="row  ltn__blog-slider-one-active slick-arrow-1 ltn__blog-item-3-normal">
          {/* Blog Item */}
		  {homestay.map((place)=>(
          <div className="col-lg-12">
            <div className="ltn__blog-item ltn__blog-item-3">
              <div className="ltn__blog-img">
                <Link to="/blog-details">
                  <img src={`http://localhost:7000/upload/${place.image[0]}`} alt="#" />
                </Link>
              </div>
              <div className="ltn__blog-brief">
                <div className="ltn__blog-meta">
                  <ul>
                    <li className="ltn__blog-author">
                      <Link to="/team-details">
                        <i className="far fa-user" />
                        Admin
                      </Link>
                    </li>
                    <li className="ltn__blog-tags">
                      <Link to="/blog-grid">
                        <i className="fas fa-tags" />
                        Interior
                      </Link>
                      <Link to="/blog-grid">
                        <i className="fas fa-tags" />
                        Decorate
                      </Link>
                    </li>
                  </ul>
                </div>
                <h3 className="ltn__blog-title">
                  <Link to="/blog-details">
                   {place.description}
                  </Link>
                </h3>
                <div className="ltn__blog-meta-btn">
                  <div className="ltn__blog-meta">
                    <ul>
                      <li className="ltn__blog-date">
                        <i className="far fa-calendar-alt" />
                        June 24, 2021
                      </li>
                    </ul>
                  </div>
                  <div className="ltn__blog-btn">
                    <Link to="/blog-details">Read more</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
		  ))}
          {/* Blog Item */}

          {/*  */}
        </div>
      </div>
    </div>
  );
}

export default BlogSlider;
