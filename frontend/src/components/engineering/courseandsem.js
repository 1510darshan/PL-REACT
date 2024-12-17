import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../engineering/courseandsem.css';
import Header from "../header/header";

const CourseAndSem = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedSemesterId, setSelectedSemesterId] = useState(null);
    const navigate = useNavigate(); // React Router navigation hook

    // Handle course click
    const handleCourseClick = (id) => {
        setSelectedCourseId(id);
    };

    // Handle semester click
    const handleSemesterClick = (semester) => {
        setSelectedSemesterId(semester);
    };

    const nextRedirect = () => {
        if (selectedCourseId === "IT" && selectedSemesterId === 1) {
            navigate("/IT1STSEM");
        }
    };

    // Simulate fetching data (replace with API call if needed)
    useEffect(() => {
        const fetchData = async () => {
            const response = [
                { id: "CS", image: require("../assets/cs.jpg"), shortName: "C.S.", fullName: "Computer Science" },
                { id: "CE", image: require("../assets/ce.jpg"), shortName: "C.E.", fullName: "Computer Engineering" },
                { id: "IT", image: require("../assets/IT.jpg"), shortName: "I.T.", fullName: "Information Technology" },
                { id: "DS", image: require("../assets/ds.jpg"), shortName: "D.S.", fullName: "Data Science" },
                { id: "AI", image: require("../assets/AI.jpg"), shortName: "A.I.", fullName: "Artificial Intelligence" },
                { id: "MBATECH", image: require("../assets/mbatech.jpg"), shortName: "MBA Tech", fullName: "Management & Technology" },
                { id: "M", image: require("../assets/m.jpg"), shortName: "M.", fullName: "Mechatronics" },
                { id: "CSE", image: require("../assets/cse.jpg"), shortName: "C.S.E.", fullName: "Cyber Security" }
            ];
            setCourses(response);
        };
        fetchData();
    }, []);

    return (
        <div className="select">
            <div className="header">
                <Header />
            </div>

            <div className="container">
                <p id="title">Empowering Minds, Shaping Futures.</p>

                <div className="mainbox">
                    <div className="cleft">
                        <p id="line">Your Course</p>
                        <div className="course-container">
                            {courses.map((course) => (
                                <div
                                    className="coursebox"
                                    key={course.id}
                                    onClick={() => handleCourseClick(course.id)}
                                    style={{
                                        boxShadow: "0px 4px 8px rgba(200, 198, 198, 0.1)",
                                        backgroundColor: selectedCourseId === course.id ? "rgb(202, 241, 202)" : "rgba(113, 147, 128, 0.44)",
                                        color: selectedCourseId === course.id ? "black" : "rgba(33, 32, 32, 0.964)",
                                        cursor: "pointer",
                                        transition: "0.3s ease",
                                        transform: selectedCourseId === course.id ? "scale(1.05)" : "scale(1)",
                                        border: "1px solid rgba(103, 103, 103, 0.95)"
                                    }}
                                >
                                    <div className="img">
                                        <img src={course.image} alt={`${course.shortName}`} />
                                    </div>
                                    <div className="name">
                                        <p className="short-name">{course.shortName}</p>
                                        <p className="full-name">{course.fullName}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cright">
                        <p id="line">Your Semester</p>
                        <div className="semester-grid">
                            {Array.from({ length: 10 }, (_, i) => (
                                <div
                                    key={i}
                                    className="semester-box"
                                    onClick={() => handleSemesterClick(i + 1)}
                                    style={{
                                        boxShadow: "0px 4px 8px rgba(200, 198, 198, 0.1)",
                                        backgroundColor: selectedSemesterId === i + 1 ? "rgb(202, 241, 202)" : "rgba(113, 147, 128, 0.44)",
                                        color: selectedSemesterId === i + 1 ? "black" : "rgba(33, 32, 32, 0.964)",
                                        cursor: "pointer",
                                        transition: "0.3s ease",
                                        transform: selectedSemesterId === i + 1 ? "scale(1.05)" : "scale(1)",
                                        border: "1px solid rgba(103, 103, 103, 0.95)"
                                    }}
                                >
                                    Semester {i + 1}
                                </div>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            className="nextbtn"
                            onClick={nextRedirect}
                            style={{
                                backgroundColor: selectedCourseId && selectedSemesterId ? "rgb(34, 139, 34)" : "gray",
                                color: "white",
                                cursor: selectedCourseId && selectedSemesterId ? "pointer" : "not-allowed",
                                transition: "0.3s ease",
                                transform: selectedCourseId && selectedSemesterId ? "scale(1.05)" : "scale(1)"
                            }}
                            disabled={!selectedCourseId || !selectedSemesterId}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseAndSem;
