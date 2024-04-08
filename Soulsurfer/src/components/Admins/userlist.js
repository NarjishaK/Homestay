import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import PageHeader from '../global-components/page-header';
import parse from "html-react-parser";
import axios from "axios";

import DeleteIcon from "@material-ui/icons/Delete";

import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { IconButton } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function UserLists() {
  // render() {

  //   const userDetails = JSON.parse(localStorage.getItem('userDetails')) ||[];
  const [users, setUsers] = useState([]);
  const {id} =useParams()
  const history =useHistory()

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:7000/users/userlist");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete =async(id)=>{
  const confirm = window.confirm("Are you sure you want to delete this");
   if(confirm){
  try{
  const response =await axios.delete(`http://localhost:7000/users/deleteuser/${id}`)
  fetchUser();
  
  }catch(err){
    console.log(err);
  }
}
}

  const handleView =async(id)=>{
    history.push(`/userprofile/${id}`)
  }

  let publicUrl = process.env.PUBLIC_URL + "/";
  let imagealt = "image";

  return (
    <>
      {/* <PageHeader  /> */}
      <div
        style={{
          height: "150px",
          width: "100%",
          textAlign: "center",
          paddingTop: "50px",
          backgroundColor: "7da556a8",
        }}
      >
        <h3>USER LISTS</h3>
      </div>
      <br />

      <div className="ltn__team-area pt-110--- pb-90">
        <div className="container">
          <div className="row justify-content-center go-top">
            {users.map((user) => (
              <div className="col-lg-3 col-sm-6">
                <div className="ltn__team-item ltn__team-item-3---">
                  <div className="team-img">
                    <img
                      src={`http://localhost:7000/upload/${user.image}`}
                      alt="Image"
                      style={{ height: "50%", width: "50%" }}
                    />
                  </div>
                  <div className="team-info">
                    <h4>
                      <Link to="/team-details">{user.username}</Link>
                    </h4>
                    <h6 className="ltn__secondary-color">{user.email}</h6>
                    <p>{user.phone}</p>
                    <div className="ltn__social-media">
                      <ul>
                        <li>
                          <IconButton onClick={() => handleDelete(user._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </li>
                        <li>
                          <IconButton onClick={()=>handleView(user._id)}>
                            <EditIcon />
                          </IconButton>
                        </li>
                        <li>
                          <IconButton onClick={()=>handleView(user._id)}>
                            <VisibilityIcon />
                          </IconButton>
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
    </>
  );
}

export default UserLists;
