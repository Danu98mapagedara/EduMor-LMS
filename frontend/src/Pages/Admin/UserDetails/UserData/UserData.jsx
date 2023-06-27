import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import DeleteIcon from "@mui/icons-material/Delete";
import defaultUser from "../../../../Assets/defaultUser.png";
import axios from "axios";

export default function UserData() {
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    if (!token) {
      alert("Authorization token missing");
      return;
    }
    axios
      .get("http://localhost:8000/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  function removeList(index) {
    const newList = [...userData];
    newList.splice(index, 1);
    setUserData(newList);
  }

  return (
    <MDBTable
      align="middle"
      style={{
        margin: "-15px 10px",
        background: "#fff",
        padding: " 5px 20px",
        borderRadius: "10px",
        maxHeight:"250px",
        overflowY:"scroll"
      }}
    >
      <MDBTableHead>
        <tr style={{ color: "#646a85"}}>
          <th scope="col" style={{ color: "red", paddingLeft: "50px" }}>
            User Name
          </th>
          <th scope="col" style={{ color: "red", paddingLeft: "50px" }}>
            Email
          </th>
          <th scope="col" style={{ color: "red" }}>
            Action
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {userData.map((userData, index) => {
          return (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={defaultUser}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p
                      className="fw-bold mb-1"
                      style={{ color: "#041083", cursor: "pointer" }}
                    >
                      {userData.firstName}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p
                  className="fw-bold mb-1"
                  style={{ color: "#041083", cursor: "pointer" }}
                >
                  {userData.email}
                </p>
              </td>
              <td>
                <button
                  style={{
                    fontWeight: "bolder",
                    padding: "2px 10px",
                    border:"none",
                    background:"transparent",
                    color:"#041083"
                  }}
                  onClick={() => removeList(userData._id)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable>
  );
}
