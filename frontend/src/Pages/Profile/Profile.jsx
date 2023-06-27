import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SideBar from "../../Components/SideBar/SideBar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import defaultUser from "../../Assets/defaultUser.png";
import "./Profile.css";
import axios from "axios";
import withAuth from "../../hoc/withAuth";

function Profile() {

  const user = useSelector(state => state.auth.token);
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch({
      type: "RESET_USER",
      payload: {
        isLoggedIn: false,
        users: null,
        token: null,
      },
    });
    localStorage.removeItem("AUTH_TOKEN");
    window.location.replace("/login");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateObj = {};
    if (firstName !== "") updateObj.firstName = firstName;
    if (lastName !== "") updateObj.lastName = lastName;
    if (phonenumber !== "") updateObj.phoneNumber = phonenumber;
    if (street !== "") updateObj.street = street;
    if (city !== "") updateObj.city = city;
    if (province !== "") updateObj.province = province;

    axios
      .patch(`http://localhost:8000/auth/${user._id}`, updateObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
        },
      })
      .then((res) => {
        alert("Updated successfully");
      })
      .catch((err) => {
        alert("Error updating user");
      });
  };

  return (
    <div style={{ diplay: "flex", flexDirection: "column" }}>
      <div className="middle-contaier" style={{ display: "flex" }}>
        <SideBar />
        <div className="mainContainer">
          <Navbar />
          <div className="read-crumb">
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <a href="/">{t("Overview")}</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>{t("Profile")}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </div>
          <h5>{t("Profile")}</h5>
          <section>
            <div class="profile-container">
              <div class="row gutters">
                <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 ">
                  <div class="card h-100" style={{ borderRadius: "10px" }}>
                    <div class="card-body">
                      <div class="account-settings">
                        <div class="user-profile" style={{ marginTop: "80px" }}>
                          <div
                            class="user-avatar"
                            style={{ borderRadius: "10px" }}
                          >
                            <img src={defaultUser} alt="User Profile Picture" />
                          </div>
                          <h5 class="user-name">
                            {user.firstName} {user.lastName}
                          </h5>                          
                          <h6 class="user-email">{user.email}</h6>
                          {user.isPremiumMember?<h6 className="membership">Premium Member</h6>:<></>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                  <div class="card h-100" style={{ borderRadius: "10px" }}>
                    <div class="card-body">
                      <div class="row gutters">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <h6 class="mb-2 text-primary">
                            {t("Personal Details")}
                          </h6>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div class="form-group">
                            <label for="fisrtName">{t("First Name")}</label>
                            <input
                              type="text"
                              class="form-control"
                              id="fisrtName"
                              placeholder={user.firstName}
                              onChange={(e) => {
                                setFirstName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div class="form-group">
                            <label for="lastName">{t("Last Name")}</label>
                            <input
                              type="text"
                              class="form-control"
                              id="lastName"
                              placeholder={user.lastName}
                              onChange={(e) => {
                                setLastName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div class="form-group">
                            <label for="phone">{t("Phone")}</label>
                            <input
                              type="text"
                              class="form-control"
                              id="phone"
                              placeholder={user.phonenumber}
                              onChange={(e) => {
                                setPhoneNumber(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row gutters">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <h6 class="mt-3 mb-2 text-primary">{t("Address")}</h6>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div class="form-group">
                            <label for="Street">{t("Street")}</label>
                            <input
                              type="name"
                              class="form-control"
                              id="Street"
                              placeholder={"Enter the street"}
                              onChange={(e) => {
                                setStreet(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div class="form-group">
                            <label for="ciTy">{t("City")}</label>
                            <input
                              type="name"
                              class="form-control"
                              id="ciTy"
                              placeholder={"Enter the city"}
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div class="form-group">
                            <label for="sTate">{t("State")}</label>
                            <input
                              type="text"
                              class="form-control"
                              id="sTate"
                              placeholder={"Enter the province"}
                              onChange={(e) => {
                                setProvince(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row gutters">
                        <div
                          class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                          className="profile-buttons"
                        >
                          <div class="text-right">
                            <button
                              type="button"
                              id="submit"
                              name="submit"
                              class="btn btn-secondary"
                              onClick={() => window.location.reload()}
                            >
                              {t("Cancel")}
                            </button>
                            <button
                              type="submit"
                              id="submit"
                              name="submit"
                              class="btn btn-primary"
                              onClick={handleUpdate}
                            >
                              {t("Update")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text">
                  <button
                    type="button"
                    name="submit"
                    class="btn btn-primary logout-btn"
                    onClick={() => {
                      logoutUser();
                    }}
                  >
                    {t("Logout")}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="footer" style={{ diplay: "flex" }}>
        <Footer />
      </div>
    </div>
  );
}

export default withAuth(Profile);
