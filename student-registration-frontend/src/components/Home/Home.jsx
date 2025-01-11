import React from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./Home.css"; // Custom styles for the carousel
import Courses from "./Courses/Courses";

const Home = ({ student }) => {
  return (
    <>
      <Header student={student} />
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleFade"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleFade" data-slide-to="1"></li>
          <li data-target="#carouselExampleFade" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://img.freepik.com/free-vector/flat-design-online-college-sale-banner-template_23-2150593113.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://static.vecteezy.com/system/resources/thumbnails/009/330/150/small_2x/online-education-landing-page-with-a-boy-studying-with-computer-illustration-in-flat-style-the-concept-of-online-education-illustration-vector.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://static.vecteezy.com/system/resources/previews/024/479/709/non_2x/flat-design-concept-online-courses-for-website-and-landing-page-template-perfect-for-web-page-design-banner-mobile-app-illustration-vector.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleFade"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleFade"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <h1
        className="text-center title-gradient"
        style={{ marginBottom: "-20px", marginTop: "50px" }}
      >
        Explore Our Courses
      </h1>
      {/* Courses cards */}
      <div
        style={{
          display: "flex",
          gap: "50px",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Courses student={student} />
      </div>
    </>
  );
};

export default Home;
