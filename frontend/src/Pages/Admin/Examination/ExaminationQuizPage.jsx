import React from "react";
import AdminNavbar from "../../../Components/Admin/AdminNavbar/AdminNavbar";
import MiniCalander from "../../../Components/MiniCalander/MiniCalander";
import AdminSideBar from "../../../Components/Admin/AdminSideBar/AdminSideBar"
import Footer from "../../../Components/Footer/Footer";
import CreateExamination from "./CreateExamination/CreateExamination";
import CreateQuiz from "./CreateQuiz/CreateQuiz";
import CourseList from "../../../Components/Admin/CourseList/CourseList";
import withAuth from "../../../hoc/withAuth";

function ExaminationPage() {
    return (
        <div style={{ diplay: "flex", flexDirection: "column" }}>
            <div className="overview" style={{ display: "flex", width: "100%" }}>
                < AdminSideBar />
                <div className="mainContainer">
                    <AdminNavbar />
                    <h5 style={{ color: '#041083', fontSize: '25px', marginTop:"-50px" }}>Quizzes</h5>
                    <div className="overviewSections" style={{ display: "flex" }}>
                        <div className="middle-section" style={{ display: "flex", flexDirection: "column", flex: 4 }}>
                            <div className="createButtons" style={{ marginTop: "15x", display: "flex", flexDirection: "row" }}>
                                <CreateExamination />
                                <CreateQuiz />
                            </div>
                            <div className="createdExams" style={{marginTop:"5px"}}>
                                <CourseList/>
                            </div>
                        </div>
                        <div className="right-section" style={{ display: "flex", flex: 1 ,marginTop:'150px'}}>
                            <MiniCalander />
                        </div>

                    </div>

                </div>

            </div>
            <div className="footer" style={{ diplay: "flex" }}>
                <Footer />
            </div>
        </div>
    );
}

export default withAuth(ExaminationPage);
