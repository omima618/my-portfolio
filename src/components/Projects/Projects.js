import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import workiom from "../../Assets/Projects/workiom.png";
import muslimc from "../../Assets/Projects/muslimc.png";
import moviesHub from "../../Assets/Projects/movies-hub.png";
import rently from "../../Assets/Projects/rently.png";
import simpleEcommerce from "../../Assets/Projects/simple-ecommerce.png";
import weatherApp from "../../Assets/Projects/weather-app.png";
import nest from "../../Assets/Projects/nest-market.png";
import mapty from "../../Assets/Projects/mapty-app.png";
import daruma from "../../Assets/Projects/daruma-art.png";
import feliciano from "../../Assets/Projects/feliciano-resturant.png";
import supportTickets from "../../Assets/Projects/support-desk.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="main-color">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={workiom}
              isBlog={false}
              title="Workiom"
              description="Data and task management software, with elegant design and integration capabilities, it optimizes data organization and task automation, and more other features."
              demoLink="https://www.workiom.com"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={moviesHub}
              isBlog={false}
              title="Movies Hub"
              description="website displaying list of movies and tv show with details and cast"
              ghLink="https://github.com/omima618/Movies-Hub"
              demoLink="https://omima618.github.io/Movies-Hub/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={rently}
              isBlog={false}
              title="Rently"
              description="Rently is a website helps people to find a house, apartment,
              or room with affordable coast in addition to some other features like request a tour to a certain rent before start renting it."
              ghLink="https://github.com/omima618/Rently"
              demoLink="https://rehabmahmoud20.github.io/Rently/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={muslimc}
              isBlog={false}
              title="Muslim Scholars Association"
              description="Islamic news and articles website"
              demoLink="https://muslimsc.net/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={weatherApp}
              isBlog={false}
              title="Weather App"
              description="Weather app gets the current location and show weather details 
              in addition to search by place name to get weather details in there."
              ghLink="https://github.com/omima618/weather-app"
              demoLink="https://resilient-fairy-f0b8f0.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={simpleEcommerce}
              isBlog={false}
              title="Shop"
              description="Simple ecommerce website, where you can find a list of product 
              with some ecommerce features like show details, adding to cart..."
              ghLink="https://github.com/omima618/shopping-cart-react"
              demoLink="https://omima618.github.io/shopping-cart-react/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mapty}
              isBlog={false}
              title="Mapty"
              description="Mapty is an application which gets the current location and show a map
              where on it user can add some workouts with some details and save these workouts on the map and sidebar list."
              ghLink="https://github.com/omima618/Mapty-application"
              demoLink="https://omima618.github.io/Mapty-application/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={nest}
              isBlog={false}
              title="Nest Market"
              description="e-commerce website with some features developed by Javascript:
              (add to cart - add to wishlist - compare products - Quick View....) "
              ghLink="https://github.com/omima618/Nest_Market"
              demoLink="https://omima618.github.io/Nest_Market/" 
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={feliciano}
              isBlog={false}
              title="Feliciano Resturant"
              description="Multiple pages website for resturant responsive to all screens.              "
              ghLink="https://github.com/omima618/Feliciano_Resturant"
              demoLink="https://omima618.github.io/Feliciano_Resturant/" 
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={daruma}
              isBlog={false}
              title="Daruma"
              description="Art website multiply pages"
              ghLink="https://github.com/omima618/Daruma-Project"
              demoLink="https://omima618.github.io/Daruma-Project/" 
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={supportTickets}
              isBlog={false}
              title="Support Desk"
              description="Support ticket app built with the MERN stack"
              ghLink="https://github.com/omima618/support-disk"
              // demoLink="https://omima618.github.io/support-disk/" 
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
