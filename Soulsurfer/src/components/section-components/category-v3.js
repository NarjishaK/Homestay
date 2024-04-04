
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import parse from 'html-react-parser';

function CategoryV3() {
  const [category, setCategory] = useState([]);
  const history =useHistory()

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

  const handleCategory =(id)=>{
    // window.location.href = "/portfolio"
 history.push(`/portfolio/${id}`)
  }

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="ltn__banner-area pt-120 go-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2--- text-center">
              <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                Property
              </h6>
              <h1 className="section-title">Property By Categories</h1>
            </div>
          </div>
        </div>

        <div className="row">
          {category.map((categories) => (
            <div className="col-lg-4 col-md-6">
              <div
                className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
                data-bs-bg={`http://localhost:7000/upload/${categories.image}`}
              >
                <div className="ltn__banner-info">
                  <h3>
                    <Link to="/shop"> {categories.name}</Link>
                  </h3>
                  <p> Great Deals Available</p>
                  {/* <Link to={categories._id}> */}
                  <mark onClick={()=>handleCategory(categories._id)}> Show More</mark>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryV3;
