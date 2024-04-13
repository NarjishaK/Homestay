import React, { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function SuggestionPlace() {
  const [homestay, setHomestay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:7000/admin/adminpanellist");
      setHomestay(response.data);
      setError(null); // reset error when fetch is successful
    } catch (err) {
      console.error(err);
      setError('Failed to load homestays. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // let publicUrl = process.env.PUBLIC_URL + "/";

  const options = {
    loop: true,
    margin: 10,
    // nav: true,
    dots: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };

  return (
    <div
      className="ltn__testimonial-area bg-image pt-115 pb-70"
      // style={{ backgroundImage: `url(${publicUrl}assets/img/bg/8.jpg)` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2--- text-center---" style={{textAlign:"center"}}>
              <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color" >
                suggessions
              </h6>
              <h1 className="section-title">Popular Place</h1>
            </div>
          </div>
        </div>
        <OwlCarousel className="owl-theme" {...options}>
          {homestay.map((home) => (
            <div className="item">
              <div className="ltn__testimonial-item ltn__testimonial-item-4">
                <div className="ltn__testimonial-img">
                  <img
                    src={`http://localhost:7000/upload/${home.image[0]}`}
                    alt="#"
                  />
                </div>
                <div className="ltn__testimoni-info">
                  <p>{home.housename}</p>
                  <div className="ltn__testimoni-info-inner">
                    <div className="ltn__testimoni-name-designation">
                      <h4>{home.place}</h4>
                      <h6>₹.{home.price}</h6>
                    </div>
                  </div>
                  <div className="ltn__testimoni-bg-icon">
                    <i className="far fa-comments" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
}

export default SuggestionPlace;
