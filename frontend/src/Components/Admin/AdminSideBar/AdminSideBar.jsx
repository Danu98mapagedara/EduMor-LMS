import React from "react";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import FeaturedVideoOutlinedIcon from "@mui/icons-material/FeaturedVideoOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import "./AdminSideBar.css";
import LogoC from "../../../Assets/LogoC.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import withAuth from "../../../hoc/withAuth";

const Sidebar = () => {
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

  return (
    <div className="SidebarAdmin">
      <div className="Logo">
        <img src={LogoC} alt="logo" />
        <span>EduMor</span>
      </div>

      <div className="menu">
        <NavLink
          to="/adminOverview"
          className={({ isActive }) => (isActive ? "actived" : "inactived")}
        >
          <div className="menuItem">
            <div>
              <DashboardCustomizeOutlinedIcon />
            </div>
            <span>Overview</span>
          </div>
        </NavLink>

        <NavLink
          to="/userDetails"
          className={({ isActive }) => (isActive ? "actived" : "inactived")}
        >
          <div className="menuItem">
            <div>
              <GroupOutlinedIcon />
            </div>
            <span>Users</span>
          </div>
        </NavLink>

        <NavLink
          to="/quizUpload"
          className={({ isActive }) => (isActive ? "actived" : "inactived")}
        >
          <div className="menuItem">
            <div>
              <CollectionsBookmarkOutlinedIcon />
            </div>
            <span>Quizzes</span>
          </div>
        </NavLink>

        <NavLink
          to="/adsUpload"
          className={({ isActive }) => (isActive ? "actived" : "inactived")}
        >
          <div className="menuItem">
            <div>
              <FeaturedVideoOutlinedIcon />
            </div>
            <span>Advertisements</span>
          </div>
        </NavLink>

        <NavLink
          to="/paymentsData"
          className={({ isActive }) => (isActive ? "actived" : "inactived")}
        >
          <div className="menuItem">
            <div>
              <PaidOutlinedIcon />
            </div>
            <span>Payments</span>
          </div>
        </NavLink>

        <NavLink
          to="/videoUpload"
          className={({ isActive }) => (isActive ? "actived" : "inactived")}
        >
          <div className="menuItem">
            <div>
              <DashboardCustomizeOutlinedIcon />
            </div>
            <span>Lecture Videos</span>
          </div>
        </NavLink>

        <NavLink
          to="/newsUpload"
          className={({ isActive }) => (isActive ? "actived" : "inactived")}
        >
          <div className="menuItem">
            <div>
              <NewspaperOutlinedIcon />
            </div>
            <span>News</span>
          </div>
        </NavLink>
        <div class="Logout">
          <button
            type="button"
            name="submit"
            class="btn btn-primary logout-btn"
            onClick={() => {
              logoutUser();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Sidebar);
