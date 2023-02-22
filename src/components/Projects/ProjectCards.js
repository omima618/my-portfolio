import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body style= {{ display: "flex", flexDirection: "column", justifyContent : "space-between" }}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "center" }}>
          {props.description}
        </Card.Text>
        <div style={{ display: "flex", gap : "20px", justifyContent: "space-between" }}>
        <Button variant="primary" href={props.ghLink} target="_blank" style={{ flexGrow : "1" }}>
          <BsGithub /> &nbsp;
          {props.isBlog ? "Blog" : "GitHub"}
          </Button>
        {!props.isBlog && props.demoLink && (
            <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ flexGrow : "1" }}          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </Button>
        )}
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
