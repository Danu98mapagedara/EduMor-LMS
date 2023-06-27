import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export default function NewsTable() {
  const [allNews, setAllNews] = useState([]);
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    if (!token) {
      alert("Authorization token missing");
      return;
    }
    axios
      .get("http://localhost:8000/news", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllNews(response.data.existingNews);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  function deleteNews(id) {
    axios
      .delete(`http://localhost:8000/news/delete/${id}`)
      .then((response) => {
        console.log("News deleted successfully:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting news:", error);
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
        margin:"-15px 10px"
      }}
    >
      <MDBTable
        align="middle"
        style={{
          overflowY: "auto",
          height: "40px",
          tableLayout: "fixed",
          marginRight: "10px",
        }}
      >
        <MDBTableHead>
          <tr style={{ color: "#646a85" }}>
            <th scope="col" style={{ color: "red", width: "60%" }}>
              News
            </th>
            <th scope="col" style={{ color: "red", width: "30%" }}>
              Link
            </th>
            <th scope="col" style={{ color: "red", width: "10%" }}>
              Action
            </th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {allNews.map((news, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p
                        className="fw-bold mb-1"
                        style={{ color: "#041083", cursor: "pointer" }}
                      >
                        {news.news}
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
                    }}
                  >
                    {news.link}
                  </p>
                </td>

                <td>
                  <button
                    onClick={() => deleteNews(news._id)}
                    style={{
                      fontWeight: "bolder",
                      padding: "2px 10px",
                      border: "none",
                      background: "transparent",
                      color: "#041083",
                    }}
                  >
                    <DeleteIcon />
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
