import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../section-components/category.module.css";

function PortfolioV1() {
  const [homestay, setHomestay] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchProductdetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/admin/placedetails/${id}`
        );
        setHomestay(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductdetails();
  }, [id]);

  const aboutDetails = (placeId) => {
    history.push(`/about/${placeId}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {homestay.map((place) => (
          <div key={place._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card">
              <img
                onClick={() => aboutDetails(place._id)}
                src={`http://localhost:7000/upload/${place.image[0]}`}
                className="card-img-top"
                alt="Homestay"
              />
              <div className="card-body">
                <h5
                  className="card-title"
                  onClick={() => aboutDetails(place._id)}
                  id={
                    place.status === "Not Available"
                      ? styles.statusRed
                      : styles.statusGreen
                  }
                >
                  {place.status}
                </h5>
                <p className="card-text">{place.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioV1;
