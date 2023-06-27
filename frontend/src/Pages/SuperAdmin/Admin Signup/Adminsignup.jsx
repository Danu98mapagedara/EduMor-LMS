import React from "react";
import "./Adminsignup.css";
import Adminsignupform from "./Admin Signup Form/Adminsignupform";
import withAuth from "../../../hoc/withAuth";

function Adminsignup() {
  return (
    <div>
      <Adminsignupform />
    </div>
  );
}

export default withAuth(Adminsignup);
