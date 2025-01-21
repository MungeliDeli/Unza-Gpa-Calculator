import "./App.css";
import logo from "./unzaLog.png";
import smiley from "./smiley.png";
import { useEffect, useRef, useState } from "react";
import GpaInput from "./components/GpaInput";
import { v4 as randId } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const initialCourses = [
    { id: randId(), length: 0, gpv: "" },
    { id: randId(), length: 0, gpv: "" },
    { id: randId(), length: 0, gpv: ""},
    { id: randId(), length: 0, gpv: "" },
  ];
  const [courses, setCourses] = useState(initialCourses);
  const [gpa, setGpa] = useState(null);
  const addCourseButtonRef = useRef(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const maxNoCourses = 9;

  const aboutSectionRef = useRef(null);
  const handleRadioChange = (course, e) => {
    const newCourse = { ...course, length: Number(e.target.value) };
    console.log(courses);
    const temp = courses.map((c) => (c.id === course.id ? newCourse : c));
    setCourses(temp);
  };

  const handleSelectionChange = (course, e) => {
    const newCourse = { ...course, gpv: Number(e.target.value) };
    const temp = courses.map((c) => (c.id === course.id ? newCourse : c));
    console.log(courses);

    setCourses(temp);
  };

  const addCourse = () => {
    if (courses.length < maxNoCourses) {
      const newCourse = { id: randId(), length: 0, gpv: "" };
      setCourses([...courses, newCourse]);

      setTimeout(() => {
        addCourseButtonRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } else {
      toast.error(`You can't add more than ${maxNoCourses} courses`, {
        position: "bottom-center",
        autoClose: 1000, // Time in ms to auto close (false to disable)
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const calculateGpa = () => {
    let totalCourseCredit = 0;
    let sum = 0;
    let error = false;

    courses.map((course) => {
      if (course.length > 0 ) {
        totalCourseCredit += course.length;
        sum += course.gpv * course.length;
        console.log(totalCourseCredit);
      } else error = true;
      return sum;
    });

    if (error) {
      toast.error("fill out all courses ", {
        position: "bottom-center",
        hideProgressBar: true,
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const newGpa = sum / totalCourseCredit;
    const formatedNewGpa = parseFloat(newGpa.toFixed(2));
    setGpa(formatedNewGpa);
  };

  const renderGpaResult = () => {
    let gpaRemark = { name: "", color: "" };

    if (gpa >= 3.75) gpaRemark = { name: "DISTINCTION", color: "green" };
    else if (gpa >= 3.25) gpaRemark = { name: "MERIT", color: "royalblue" };
    else if (gpa >= 2.68) gpaRemark = { name: "CREDIT", color: "orange" };
    else gpaRemark = { name: "PASS", color: "red" };

    return (
      <div className="gpa_display">
        <p style={{ color: gpaRemark.color }}> {gpaRemark.name}</p>
        <p>{gpa}</p>
      </div>
    );
  };

  const reset = () => {
    setCourses(initialCourses);
    setGpa(null);
  };
  const toggleAboutSection = () => {
    setIsAboutVisible(!isAboutVisible);
  };

  const handleClickOutside = (event) => {
    if (
      aboutSectionRef.current &&
      !aboutSectionRef.current.contains(event.target)
    ) {
      setIsAboutVisible(false); // Close the "About" section
    }
  };

  useEffect(() => {
    if (isAboutVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAboutVisible]);

  return (
    <div className="gpa_container">
      <div className="gpa_title">
        <img src={logo} alt="UNZA" />
        <h1> UNZA GPA CALCULATOR</h1>
      </div>
      {gpa && renderGpaResult()}
      <div className="gpa_form">
        {courses.map((course) => (
          <GpaInput
            key={course.id}
            checked={course.length}
            selectedValue={course.gpv}
            onRadioChange={(e) => handleRadioChange(course, e)}
            onSelectionChange={(e) => handleSelectionChange(course, e)}
          />
        ))}
        <button onClick={addCourse} ref={addCourseButtonRef}>
          ADD COURSE
        </button>
      </div>
      <div className="gpa_btn">
        <button id="calculateGpa" onClick={calculateGpa}>
          CALCULATE GPA
        </button>
        <button id="reset" onClick={reset}>
          RESET
        </button>
      </div>
      <button id="about" onClick={toggleAboutSection}>
        ABOUT
      </button>
      {isAboutVisible && (
        <div className="about_overlay">
          <div className="about_section" ref={aboutSectionRef}>
            <button
              className="close_btn"
              onClick={() => setIsAboutVisible(false)}
            >
              &times;
            </button>
            <p>
              <a
                className="profile"
                href="https://www.linkedin.com/in/davy-mwansa-1689aa296/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Created by Mungeli
              </a>
            </p>
            <p>
              <a
                href="https://www.unza.zm/sites/default/files/article_files/2019-04/Guidelines%20for%20Credit%20Accumulation%2C%20Grade%20Point%20Average%20and%20Degree%20Classification_1.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Guidelines about how GPA is calculated at UNZA
              </a>
            </p>
            <p className="smiley">
              Inspired by Silent{" "}
              <img src={smiley} alt="Silent Emoji" width="20" height="20" />
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
