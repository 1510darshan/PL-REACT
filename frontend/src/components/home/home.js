import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance"; // Import the instance

import './home.css';

const Home = () => {
    const [schools, setSchools] = useState([]); // State for schools fetched from API
    const [courses, setCourses] = useState([]); // State for courses fetched from API
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch suggestions using axiosInstance
    const fetchSuggestions = async (input) => {
        if (!input.trim()) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const response = await axiosInstance.get('/suggestions', {
                params: { query: input }, // Pass the query as a parameter
            });
            setSuggestions(response.data.suggestions); // Adjust to your API's response format
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Debounced function for fetching suggestions
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

    const [school, setSchool] = useState('');
    const [course, setCourse] = useState('');
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    // Handle input change
    const handleInputChange = (e) => {
        const input = e.target.value;
        setQuery(input);
        debouncedFetchSuggestions(input); // Use the debounced function
    };

    // Close suggestions on full match
    useEffect(() => {
        if (schools.includes(school.trim())) {
            setFilteredSchools([]); // Clear school suggestions
        }
        if (courses.includes(course.trim())) {
            setFilteredCourses([]); // Clear course suggestions
        }
    }, [school, course, schools, courses]);

    const navigate = useNavigate();

    // Logic for selecting a suggestion value inside the input field
    const handleSchoolSelect = (selectedSchool) => {
        setSchool(selectedSchool); // Update the input value
        setFilteredSchools([]); // Clear the suggestions
    };

    // const handleCourseSelect = (selectedCourse) => {
    //     setCourse(selectedCourse); // Update the input value
    //     setFilteredCourses([]); // Clear the suggestions
    // };

    /*---------logic for the typing text------------*/
    const words = ["𝕿𝖍𝖊 𝕾𝖚𝖈𝖈𝖊𝖘𝖘.!", "Lectures", "Tutorials", "Notes", "Free Resources"];
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        let typingInterval = setInterval(() => {
            const currentWord = words[wordIndex];

            if (!isDeleting) {
                setText((prev) => currentWord.slice(0, prev.length + 1));
                if (text === currentWord) {
                    setIsDeleting(true);
                    setTypingSpeed(310); // Delay before starting deletion
                }
            } else {
                setText((prev) => currentWord.slice(0, prev.length - 1));
                if (text === '') {
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % words.length);
                    setTypingSpeed(0); // Speed for typing
                }
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
    }, [text, isDeleting, typingSpeed, wordIndex, words]);

    const counterData = [
        { icon: "fas fa-server", number: "150+", label: "Resources" },
        { icon: "fas fa-user-graduate", number: "1300+", label: "Students" },
        { icon: "fas fa-chalkboard-user", number: "100%[PL]", label: "Pass Data" },
        { icon: "fas fa-face-smile", number: "100%", label: "Satisfaction" }
    ];

    // Reusable Counter Box component
    const CounterBox = ({ icon, number, label }) => (
        <div className="box">
            <i className={icon}></i>
            <div className="content">
                <h3>{number}</h3>
                <p>{label}</p>
            </div>
        </div>
    );

    /*-----------------------structuring starts here---------------------------- */
    return (
        <section className='main'>
            <section className="home" id="home">
                <div className='left'>
                    <div className="homebgimage">
                        {/*contact us button*/}
                        <a
                            href="#contact"
                            className="btn"
                            style={{ textDecoration: 'none' }}
                            title="Reach out to us—we're always here for you."
                        >
                            Contact us
                        </a>

                        <img
                            src={require('../assets/main.svg').default}
                            alt="Reading illustration"
                        />
                    </div>
                </div>

                <div className="right">
                    <div className="content">
                        <h3>LEARN TO LEARN</h3>
                        <div className="container">
                            <span className="typing">{text}</span>
                        </div>
                    </div>

                    <div className="searchbox">
                        <input
                            className="searchInput"
                            type="text"
                            placeholder="search Academics, passion, courses, tech"
                        />
                        <span className="icon">
                            <i className="bx bx-search-alt bx-tada"></i>
                        </span>
                    </div>

                    {/*-------------------home university and course form section starts------------------ */}

                    <section className="info" id="info">
                        <h1 className="title">Select Your University/College</h1>
                        <div className="form-group">
                            <input
                                type="text"
                                id="school"
                                name="school"
                                placeholder="Enter University/College"
                                value={school}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <label className="form-label">University/College</label>

                            <div className="suggestions" >
                                {suggestions.length > 0 ? (
                                    suggestions.map((suggestion) => (
                                        <div
                                            key={suggestion.id}
                                            className="suggestion-item"
                                            onClick={() => handleSchoolSelect(suggestion.name)}
                                            style={{
                                                padding: "8px",
                                                cursor: "pointer",
                                                borderBottom: "1px solid #ccc",
                                            }}
                                        >
                                            {suggestion.name} {/* Adjust based on your API response */}
                                        </div>
                                    ))
                                ) : (
                                    !loading && query.length > 2 && (
                                        <div className="no-suggestions" style={{ padding: "8px", color: "#666" }}>
                                            No suggestions available
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <h1 className="title two">Select Your Course</h1>
                        <div className="form-group" >
                            <input
                                type="text"
                                id="course"
                                name="course"
                                placeholder="Enter Course"
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <label className="form-label">Course</label>
                        </div>

                        <div className="enter">
                            <button type="submit" >
                                <i className="bx bx-right-arrow-alt"></i>
                                <span>Enter</span>
                            </button>
                        </div>
                    </section>
                </div>
            </section>

            {/* ------------------------Counter Section------------ */}
            <section className="count">
                <div className="box-container">
                    {counterData.map((item, index) => (
                        <CounterBox
                            key={index}
                            icon={item.icon}
                            number={item.number}
                            label={item.label}
                        />
                    ))}
                </div>
            </section>
        </section>
    );
};

export default Home;
