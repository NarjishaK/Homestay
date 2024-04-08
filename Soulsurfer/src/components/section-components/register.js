import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import axios from "axios";

function Register() {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [password, SetPassword] = useState("");
  const [image, SetImage] = useState("");
  const [address, SetAddress] = useState("");
  const [confirm, Setconfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [invalid, setInvalid] = useState("");

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    SetImage(selectedImage);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const validationError = {};
    if (!username) {
      validationError.username = "Name is required";
    }
    if (!address) {
      validationError.address = "Address is required";
    }
    if (!phone) {
      validationError.phone = "Phone number is required";
    }
    if (!email) {
      validationError.email = "Email is required";
    }
    if (!image) {
      validationError.image = "Image is required";
    }
    if (Object.keys(validationError).length > 0) {
      setInvalid(validationError);
      return;
    }

    if (password !== confirm) {
      setPasswordError("Password and confirm password do not match");
      return;
    } else {
      setPasswordError("");
    }

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confirm", confirm);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:7000/users/userRegistration",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API response", response.data);
      setInvalid({});
      window.location.href = "/#/login";
    } catch (err) {
      setInvalid({ email: "Email is already in use" });
      console.log(err);
    }
  };

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Register <br />
                Your Account
              </h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
                Sit aliquid, Non distinctio vel iste.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="account-login-inner">
              <form action="#" className="ltn__form-box contact-form-box">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={username}
                  onChange={(e) => SetUsername(e.target.value)}
                />
                {invalid.username && (
                  <div style={{ color: "red" }}>{invalid.username}</div>
                )}
                <input
                  type="text"
                  name="Address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => SetAddress(e.target.value)}
                />
                {invalid.address && (
                  <div style={{ color: "red" }}>{invalid.address}</div>
                )}
                <div>
                  <input
                    type="file"
                    accept="Image/*"
                    placeholder="Image"
                    onChange={handleImage}
                  />
                </div>
                {invalid.image && (
                  <div style={{ color: "red" }}>{invalid.image}</div>
                )}
                <br />
                <input
                  type="number"
                  name="Phone"
                  placeholder="Phone Number*"
                  style={{ width: "100%", height: "55px" }}
                  value={phone}
                  onChange={(e) => SetPhone(e.target.value)}
                />
                {invalid.phone && (
                  <div style={{ color: "red" }}>{invalid.phone}</div>
                )}
                <br />
                <br />
                <input
                  type="text"
                  name="email"
                  placeholder="Email*"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                />
                {invalid.email && (
                  <div style={{ color: "red" }}>{invalid.email}</div>
                )}
                <input
                  type="password"
                  name="password"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                />
                <input
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password*"
                  value={confirm}
                  onChange={(e) => Setconfirm(e.target.value)}
                />
                {passwordError && (
                  <div style={{ color: "red" }}>{passwordError}</div>
                )}

                {/* <label className="checkbox-inline">
							<input type="checkbox" defaultValue />&nbsp;
							I consent to Herboil processing my personal data in order to send personalized marketing material in accordance with the consent form and the privacy policy.
						</label>
						<label className="checkbox-inline">
							<input type="checkbox" defaultValue /> &nbsp;
							By clicking "create account", I consent to the privacy policy.
						</label> */}
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                    style={{ width: "100%" }}
                    onClick={handleCreate}
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </form>
              <div className="by-agree text-center">
                <div className="go-to-btn mt-50 go-top">
                  <Link to="/login">ALREADY HAVE AN ACCOUNT ?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
