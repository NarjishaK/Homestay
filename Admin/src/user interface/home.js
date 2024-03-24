import React, { useState } from "react";
import { Navbar, Nav, Container, Card, Col, Row, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faSearch, faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import OwlCarousel from "react-owl-carousel"; // Corrected import
import About from "assets/images/lipstic/about.jpg";
import banner1 from "assets/images/lipstic/banner1.png";
import banner2 from "assets/images/lipstic/banner2.jpg";
import banner3 from "assets/images/lipstic/banner3.jpg";
import family from "assets/images/lipstic/family.jpg";
import batchelor from "assets/images/lipstic/batchelor.jpg";
import couples from "assets/images/lipstic/couples.jpg";
import bagpackers from "assets/images/lipstic/bag packers.jpg";
import hyderabad from "assets/images/lipstic/manali.png";
import kerala from "assets/images/lipstic/kerala.avif";
import bangaluru from "assets/images/lipstic/bangaluru.png";
import delhi from "assets/images/lipstic/delhi.avif";
import kodaikkanal from "assets/images/lipstic/kodaikkanal.avif";
import styles from "./home.module.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Navbars from "./navbar";
import Footer from "./footer";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import home1 from "assets/images/lipstic/home1.jpg";
import home2 from "assets/images/lipstic/home2.jpeg";
import home3 from "assets/images/lipstic/home3.jpg";
import home4 from "assets/images/lipstic/home4.jpeg";
import home5 from "assets/images/lipstic/home6.jpeg";
import home6 from "assets/images/lipstic/home7.jpeg";
import home7 from "assets/images/lipstic/home8.jpeg";
import home8 from "assets/images/lipstic/home5.jpeg";
import home9 from "assets/images/lipstic/home9.jpeg";
import home10 from "assets/images/lipstic/home10.jpeg";
import home11 from "assets/images/lipstic/home11.jpeg";
import home12 from "assets/images/lipstic/home12.jpeg";

function home() {
  const options = {
    margin: 10,
    responsiveClass: true,
    nav: true,
    dots: true,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };
  const places = {
    "Manali ": [
      { src: home1, name: "House 1", price: "INR 10,000" },
      { src: home2, name: "House 1", price: "INR 10,000" },
      { src: home3, name: "House 1", price: "INR 10,000" },
      { src: home4, name: "House 1", price: "INR 10,000" },
      { src: home3, name: "House 1", price: "INR 10,000" },
      { src: home4, name: "House 1", price: "INR 10,000" },
      { src: home1, name: "House 1", price: "INR 10,000" },
      { src: home2, name: "House 1", price: "INR 10,000" },
    ],
    "Kodaikkanal ": [
      { src: home5, name: "House 1", price: "INR 10,000" },
      { src: home6, name: "House 1", price: "INR 10,000" },
      { src: home7, name: "House 1", price: "INR 10,000" },
      { src: home8, name: "House 1", price: "INR 10,000" },
      { src: home6, name: "House 1", price: "INR 10,000" },
      { src: home7, name: "House 1", price: "INR 10,000" },
      { src: home8, name: "House 1", price: "INR 10,000" },
    ],
    " Kerala": [
      { src: home9, name: "House 1", price: "INR 10,000" },
      { src: home10, name: "House 1", price: "INR 10,000" },
      { src: home11, name: "House 1", price: "INR 10,000" },
      { src: home12, name: "House 1", price: "INR 10,000" },
      { src: home11, name: "House 1", price: "INR 10,000" },
      { src: home12, name: "House 1", price: "INR 10,000" },
    ],
  };

  const [activeTab, setActiveTab] = useState("Manali ");
  const [houses, setHouses] = useState(places[activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setHouses(places[tab]);
  };
  return (
    <div>
      <Navbars />
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={banner1} alt="First slide" id={styles.banner} />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner3} alt="Second slide" id={styles.banner} />
        </Carousel.Item>
      </Carousel>
      <br />
      {/* categories */}
      <div className="container">
        <div style={{ textAlign: "center", height: "100px" }}>
          <h4 className={styles.sub_heading}>
            <MdOutlineHorizontalRule />
            Categories
            <MdOutlineHorizontalRule />
          </h4>
        </div>
        <OwlCarousel className="owl-theme col-sm-12">
          <card className={styles.item}>
            <Card.Img src={family} className={styles.category_img} />
            <Card.Title className={styles.categories_name}>
              <h4 className={styles.category_font}>FAMILY</h4>
            </Card.Title>
          </card>
          <card className={styles.item}>
            <Card.Img src={couples} className={styles.category_img} />
            <Card.Title className={styles.categories_name}>
              <h4 className={styles.category_font}>COUPLES</h4>
            </Card.Title>
          </card>
          <card className={styles.item}>
            <Card.Img src={bagpackers} className={styles.category_img} />
            <Card.Title className={styles.categories_name}>
              <h4 className={styles.category_font}>BACK PACKERS</h4>
            </Card.Title>
          </card>
          <card className={styles.item}>
            <Card.Img src={batchelor} className={styles.category_img} />
            <Card.Title className={styles.categories_name}>
              <h4 className={styles.category_font}>BATCHELORS</h4>
            </Card.Title>
          </card>
        </OwlCarousel>
      </div>
      <br />
      {/* categories End */}

      {/* Destinaton */}
      <div className="container">
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <h4 className={styles.sub_heading1}>
            <MdOutlineHorizontalRule />
            Top Destination In India
            <MdOutlineHorizontalRule />
          </h4>
        </div>
        <MDBRow>
          <MDBCol>
            <img src={hyderabad} />
            <br />
            <small className={styles.place}>Hyderabad</small>
          </MDBCol>
          <MDBCol>
            <img src={kerala} />
            <br />
            <small className={styles.place}>Kerala</small>
          </MDBCol>
          <MDBCol>
            <img src={kodaikkanal} />
            <br />
            <small className={styles.place}>Tamilnadu</small>
          </MDBCol>
          <MDBCol>
            <img src={bangaluru} />
            <br />
            <small className={styles.place}>Bangaluru</small>
          </MDBCol>
          <MDBCol>
            <img src={delhi} />
            <br />
            <a className={styles.place} href="/newdelhi">
              New Delhi
            </a>
          </MDBCol>
        </MDBRow>
      </div>
      <hr />
      {/* Destination End */}
      {/* About */}
      <div className="container">
        <div style={{ textAlign: "center", height: "100px" }}>
          <h4 className={styles.sub_heading}>
            <MdOutlineHorizontalRule />
            About Our Services
            <MdOutlineHorizontalRule />
          </h4>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <h1 className={styles.about}>
              About Us
              <MdOutlineHorizontalRule />
            </h1>
            <p className={styles.about_para}>
              Welcome to SurfToGo, your premier destination for premium homestays across the diverse
              landscape of India. We specialize in providing authentic, quality experiences,
              ensuring each stay is more than just accommodation, but a gateway to the rich culture
              and heritage of India. Our handpicked collection includes everything from traditional
              Havelis in Rajasthan to charming cottages in the Himalayas and modern villas in Goa,
              all guaranteeing high standards of comfort, cleanliness, and local insights. With
              SurfToGo, immerse yourself in the heart of India through our Heritage Homes, Nature
              Retreats, and City Connoisseur collections, each offering unique experiences whether
              you’re seeking historical grandeur, tranquil nature, or the urban hustle. We are
              committed to sustainable and responsible tourism, ensuring your stay contributes
              positively to the local community and environment. Experience home-cooked regional
              cuisine, partake in local festivals, and uncover hidden gems with insider tips from
              our hospitable hosts. SurfToGo is more than a booking platform; it’s your window to
              memorable, responsible, and truly immersive travel experiences across India. Embark on
              a journey with SurfToGo and embrace the comfort, culture, and charm of Indian
              hospitality.⬤
            </p>
          </div>
          <div className="col-lg-6 col-sm-12">
            <img src={About} className={styles.about_img}></img>
          </div>
        </div>
      </div>
      <br />
      <hr />
      {/* About End */}

      {/* Featured homes recommended for you */}
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h4 className={styles.sub_heading2}>
            <MdOutlineHorizontalRule />
            Featured homes recommended for you
            <MdOutlineHorizontalRule />
          </h4>
        </div>
        <div className={styles.tabsContainer}>
          {Object.keys(places).map((tab) => (
            <div
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
          <div
            className={styles.activeTabIndicator}
            style={{
              width: `${100 / Object.keys(places).length}%`,
              transform: `translateX(${Object.keys(places).indexOf(activeTab) * 100}%)`,
            }}
          />
        </div>
        <Container className="my-4">
          <Row>
            {houses.map((house, index) => (
              <Col key={index} lg={3} md={6} className="mb-4">
                <card>
                  <Card.Img
                    variant="top"
                    src={house.src}
                    alt={house.name}
                    style={{ height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>{house.name}</Card.Title>
                    <Card.Text>{house.price}</Card.Text>
                  </Card.Body>
                </card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: "center" }}>
            <Button className={styles.explore}>Explore More</Button>
          </div>
        </Container>
      </div>
      {/* Featured homes recommended for you */}
      <Footer />
    </div>
  );
}

export default home;
