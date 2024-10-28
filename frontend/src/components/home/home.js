import React, { useState, useEffect } from 'react';
import './home.css';

const Home = () => {

    /*----------LOGIC FOR SHOWING SUGGESTIONS IN FORM------------*/
    const schools = [
        "NMIMS, Mumbai",
        "NMIMS, Shirpur",
        "RC Patel, Shirpur",
        "D.Y. Patil, Pune",
        "Sandeep University, Nashik",
        "Fergusson College, Pune"
    ];

    const courses = [
        "Engineering",
        "Pharmacy",
        "BCA",
        "Pharmatech",
        "BSc"
    ];


    const [school, setSchool] = useState('');
    const [course, setCourse] = useState('');
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [formSection, setFormSection] = useState(null);
    

    const filterSuggestions = (type, value) => {
        if (type === 'school') {
            setFilteredSchools(
                schools.filter(item => item.toLowerCase().includes(value.toLowerCase()))
            );
        } else if (type === 'course') {
            setFilteredCourses(
                courses.filter(item => item.toLowerCase().includes(value.toLowerCase()))
            );
        }
    };

        // Hide suggestions when the input loses focus
        const handleBlur = (type) => {
            if (type === 'school') {
                setFilteredSchools([]);  // Clear the suggestions for schools when input loses focus
            } else if (type === 'course') {
                setFilteredCourses([]);  // Clear the suggestions for courses when input loses focus
            }
        };

    const handleSchoolSelect = (selectedSchool) => {
        setSchool(selectedSchool);
        setFilteredSchools([]);
    };

    const handleCourseSelect = (selectedCourse) => {
        setCourse(selectedCourse);
        setFilteredCourses([]);
    };



    /*---------logic for the typing texxt------------*/
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
    /*----------------------------------------------------------------------- */


    return (
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

                <section className="info" id="info">
                    <h1 className="title">Select Your University/College</h1>
                    <div className="form-group">
                        <input
                            type="text"
                            id="school"
                            name="school"
                            placeholder="Enter University/College"
                            value={school}
                            onChange={(e) => {
                                setSchool(e.target.value);
                                filterSuggestions('school', e.target.value);
                            }}
                            onBlur={() => handleBlur('school')}  // OnBlur function applied here
                            autoComplete="off"
                        />
                        <label className="form-label">University/College</label>
                        {filteredSchools.length > 0 && (
                            <div className="suggestions">
                                {filteredSchools.map((s, index) => (
                                    <div key={index} onClick={() => handleSchoolSelect(s)}>
                                        {s}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <h1 className="title two">Select Your Course</h1>
                    <div className="form-group">
                        <input
                            type="text"
                            id="course"
                            name="course"
                            placeholder="Enter Course"
                            value={course}
                            onChange={(e) => {
                                setCourse(e.target.value);
                                filterSuggestions('course', e.target.value);
                            }}
                            onBlur={() => handleBlur('course')}  // OnBlur function applied here
                            autoComplete="off"
                        />
                        <label className="form-label">Course</label>
                        {filteredCourses.length > 0 && (
                            <div className="suggestions">
                                {filteredCourses.map((c, index) => (
                                    <div key={index} onClick={() => handleCourseSelect(c)}>
                                        {c}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="enter">
                    {/* onClick={checkAndRedirect} */}
                        <button >
                            <i className="bx bx-right-arrow-alt"></i>
                            <span>Enter</span>
                        </button>
                    </div>
                </section>

                {formSection && (
                    <div>
                        {formSection}
                    </div>
                )}

            </div>
        </section>
    );
};

export default Home;

