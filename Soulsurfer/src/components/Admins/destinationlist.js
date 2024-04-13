import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./admin.module.css";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DestinationList() {
  let publicUrl = process.env.PUBLIC_URL + "/";
  const [destinations, setDestinations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchDestination();
  }, []);
  const fetchDestination = async () => {
    const response = await axios
      .get("http://localhost:7000/admin/destinationlist")
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    history.push(`/destinationedit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this Destination"
    );
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:7000/admin/deletedestination/${id}`
        );
        fetchDestination();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <div className="ltn__product-area ltn__product-gutter mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__shop-options"></div>
              <div className="tab-content ">
                <div
                  className="tab-pane fade active show"
                  id="liton_product_grid"
                >
                  <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* Search Widget */}
                        <div className="ltn__search-widget mb-30">
                          <div className={styles.category}>
                            <h4>Destination Lists</h4>
                          </div>
                        </div>
                      </div>
                      {/* ltn__product-item */}
                      {destinations.map((places) => (
                        <div className="col-lg-4 col-sm-6 col-12">
                          <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                            <div className="product-img">
                              <Link to="/product-details">
                                <img
                                  src={`http://localhost:7000/upload/${places.image}`}
                                  alt="#"
                                />
                              </Link>
                            </div>
                            <div className="product-info">
                              <div className="product-badge">
                                <ul>
                                  <li>{places.destination}</li>
                                </ul>
                                <a href={places.loc}>{places.add}</a>
                                <p style={{ fontStyle: "italic" }}>
                                  "{places.des}"
                                </p>
                              </div>
                              <div className="product-hover-action">
                                <ul>
                                  <li>
                                    <a onClick={() => handleEdit(places._id)}>
                                      <i className="fas fa-pencil-alt" />
                                    </a>
                                  </li>
                                  <li>
                                    <a onClick={() => handleDelete(places._id)}>
                                      <i className="fa fa-trash"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <span className="go-top">
                                      <Link
                                        to="/admins"
                                        title="Product Details"
                                      >
                                        <i className="flaticon-add" />
                                      </Link>
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationList;
