import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdvertisementTable() {
  const [allAdvertisement, setAllAdvertisement] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (!token) {
      alert("Authorization token missing");
      return;
    }
    axios
      .get("http://localhost:8000/advertisements", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllAdvertisement(response.data.existingAds);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  function deleteAdvertisement(id) {
    axios
      .delete(`http://localhost:8000/advertisements/delete/${id}`)
      .then((response) => {
        console.log("Advetisementdeleted successfully:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting advertisement:", error);
      });
  }

  return (
    <div
      className="NewsForm"
      style={{
        width: "100%",
        background: "#fff",
        overflowY: "scroll",
        height: "400px",
        padding: "25px",
        borderRadius: "10px",
        marginLeft: "20px",
        maxHeight: "380px",
      }}
    >
      <MDBTable
        align="middle"
        style={{ overflowY: "auto", height: "40px", tableLayout: "fixed" }}
      >
        <MDBTableHead>
          <tr style={{ color: "#646a85" }}>
            <th scope="col" style={{ color: "red", paddingLeft: "50px" }}>
              Advertisement
            </th>
            <th scope="col" style={{ color: "red", paddingLeft: "100px" }}>
              Link
            </th>
            <th scope="col" style={{ color: "red", paddingLeft: "260px" }}>
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {allAdvertisement.map((allAdvertisement, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p
                        className="fw-bold mb-1"
                        style={{ color: "#041083", cursor: "pointer" }}
                      >
                        {allAdvertisement.addTitle}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p
                    className="fw-bold mb-1"
                    style={{
                      color: "#041083",
                      cursor: "pointer",
                      overflowX: "hidden",
                      maxHeight: "30px",
                      overflowY: "hidden",
                    }}
                  >
                    {allAdvertisement.link}
                  </p>
                </td>

                <td>
                  <button
                    onClick={() => deleteAdvertisement(allAdvertisement._id)}
                    style={{
                      marginLeft: "250px",
                      padding: "2px 10px",
                      fontWeight: "bolder",
                      padding: "2px 10px",
                      border: "none",
                      background: "transparent",
                      color: "#041083",
                    }}
                  >
                    <DeleteIcon/>
                  </button>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
