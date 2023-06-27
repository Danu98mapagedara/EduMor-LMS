import React, { useEffect, useState } from "react";
import "./CardOverview.css";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";

function CardOverview() {
  const [allUsers, setAllUsers] = useState([]);
  const [emailCount, setEmailCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [examinationCount, setExaminationCount] = useState(0);
  const token = localStorage.getItem("AUTH_TOKEN");

  useEffect(() => {
    axios
      .get("http://localhost:8000/enrollment/:userId")
      .then((response) => {
        setAllUsers(response.data.existingUsers);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  console.log(allUsers);

  useEffect(() => {
    const fetchEmailCount = async () => {
      try {
        const response = await axios.get("/auth/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const users = response.data;
        let userCount = 0;
        users.forEach((users) => {
          if (users.email) {
            userCount++;
          }
        });

        setEmailCount(userCount);
      } catch (error) {
        console.error(
          "Error retrieving user count:",
          error.response.data.message
        );
      }
    };

    //get number of quizes
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("/allQuizes"); // Replace '/api/quizzes' with your actual API endpoint
        const quizzes = response.data;
        setQuizCount(quizzes.length);
      } catch (error) {
        console.error(error);
      }
    };

    //get number of examinations
    const fetchExaminationCount = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get("/examinations", { headers });
        const count = response.data.length;
        setExaminationCount(count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExaminationCount();
    fetchQuizzes();
    fetchEmailCount();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="icon">
          <ManageAccountsIcon />
        </div>
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{emailCount}</span>
        </div>
      </div>

      <div className="featuredItem">
        <div className="icon">
          <AutoStoriesIcon />
        </div>
        <span className="featuredTitle">Examinations</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{examinationCount}</span>
        </div>
      </div>

      <div className="featuredItem">
        <div className="icon">
          <LoginIcon />
        </div>
        <span className="featuredTitle">Quizes</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{quizCount}</span>
        </div>
      </div>
    </div>
  );
  // })}
}

export default CardOverview;
