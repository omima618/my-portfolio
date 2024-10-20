import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import workiom from "../../Assets/Projects/workiom.png";
import muslimc from "../../Assets/Projects/muslimc.png";
import moviesHub from "../../Assets/Projects/movies-hub.png";
import rently from "../../Assets/Projects/rently.png";
import weatherApp from "../../Assets/Projects/weather-app.png";
import nest from "../../Assets/Projects/nest-market.png";
import mapty from "../../Assets/Projects/mapty-app.png";
import supportTickets from "../../Assets/Projects/support-desk.png";
import YoutubeChannelBrowse from "../../Assets/Projects/youtube-channel-browse.png";

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
              description="Cloud-based task and workflow management platform, offering customizable features, automation, and integration with popular third-party tools."
              demoLink="https://www.workiom.com"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={moviesHub}
              isBlog={false}
              title="Movies Hub"
              description="Movie discovery Application, allows users to explore popular movies, search by title, and view detailed information such as ratings, release dates, and descriptions. The design emphasizes simplicity and user-friendly navigation, with a responsive layout."
              ghLink="https://github.com/omima618/Movies-Hub"
              demoLink="https://omima618.github.io/Movies-Hub/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={rently}
              isBlog={false}
              title="Rently"
              description="Allows users to browse available rental properties, view key details like price, location, and description,and filter results based on preferences. With the ability of adding properties and more."
              ghLink="https://github.com/omima618/Rently"
              demoLink="https://omima618.github.io/Rently/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={muslimc}
              isBlog={false}
              title="Muslim Scholars Association"
              description="Website offers a comprehensive Islamic scholarly content. The site features religious articles, fatwas, educational resources, magazine section, and events."
              demoLink="https://muslimsc.net/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={YoutubeChannelBrowse}
              isBlog={false}
              title="Youtube Channel Browse"
              description="An application to browse youtube channel videos with the ability to watch, add notes, and sort the videos."
              ghLink="https://github.com/omima618/Youtube-channel-browse"
              demoLink="https://omima618.github.io/Youtube-channel-browse/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={weatherApp}
              isBlog={false}
              title="Weather App"
              description="provides weather details of the current location in addition to searching for a certain location."
              ghLink="https://github.com/omima618/weather-app"
              demoLink="https://resilient-fairy-f0b8f0.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mapty}
              isBlog={false}
              title="Mapty"
              description="Application gets the current location and show a map where the user can list his workouts on."
              ghLink="https://github.com/omima618/Mapty-application"
              demoLink="https://omima618.github.io/Mapty-application/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={nest}
              isBlog={false}
              title="Nest Market"
              description="E-commerce Theme."
              ghLink="https://github.com/omima618/Nest_Market"
              demoLink="https://omima618.github.io/Nest_Market/" 
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
