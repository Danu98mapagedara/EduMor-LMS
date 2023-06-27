import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import axios from "axios";

function VacancySection() {
  const [vacancy, setVacancy] = useState([]);
  const [filteredVacancy, setFilteredVacancy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(7);

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");

    if (!token) {
      alert("Authorization token missing");
      return;
    }
    axios
      .get("http://localhost:8000/vacancies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setVacancy(res.data.existingVacancies);
        setFilteredVacancy(res.data.existingVacancies);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  const applyFilters = (filters) => {
    let filtered = vacancy;
    if (filters.jobType !== "All") {
      filtered = filtered.filter((job) => job.type === filters.jobType);
    }
    if (filters.district !== "All") {
      filtered = filtered.filter((job) => job.district === filters.district);
    }
    setFilteredVacancy(filtered);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredVacancy.slice(firstPostIndex, lastPostIndex);
  const pageCount = Math.ceil(filteredVacancy.length / postsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  //flter closing date greater than today date
  const today = new Date();
  const filteredJobCards = currentPosts.filter(({ closingDate }) => {
    const closingDateObj = new Date(closingDate);
    return closingDateObj > today;
  });

  return (
    <>
      <Grid container justifyContent="center" style={{ width: "100%" }}>
        <Grid item xs={10}>
          <Search onSearch={applyFilters} />
          {filteredJobCards.length === 0 ? (
            <p
              style={{ textAlign: "center", color: "grey", marginTop: "200px" }}
            >
              No records found
            </p>
          ) : (
            filteredJobCards.map(
              ({ title, type, company, closingDate, district, url }, index) => {
                return (
                  <JobCard
                    key={index}
                    title={title}
                    company={company}
                    closingDate={new Date(closingDate).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })}
                    type={type}
                    district={district}
                    link={url}
                  />
                );
              }
            )
          )}
        </Grid>
        <Pagination
          totalPosts={filteredVacancy.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageCount={pageCount}
          onChange={changePage}
        />
      </Grid>
    </>
  );
}

export default VacancySection;
