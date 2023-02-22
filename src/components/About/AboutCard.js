import React from "react";
import Card from "react-bootstrap/Card";
function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="main-color">Omima Khaled </span>
            from <span className="main-color"> Alexandria, Egypt.</span>
            <br />
            <br />Frontend <span className="main-color"> React</span> Developer.
            <br />
            <br />I am a self learner and ITI graduate. 
            <br />
            <br />Very Passionate about <span className="main-color"> Web twchnologies </span>
            <br />
            <br />I love to learn new technologies and develop my skills.
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
