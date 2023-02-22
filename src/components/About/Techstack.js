import React from "react";
import { Col, Row } from "react-bootstrap";
import {
    DiJavascript1,
    DiReact,
    DiGit,
    DiSass,
    DiNodejs,
} from "react-icons/di";
import {
    SiRedux,
    SiBootstrap,
    SiNextdotjs,
    SiTailwindcss,
    SiCss3,
    SiAngular,
    SiMongodb,
    SiTypescript,
    SiFigma,
    SiHtml5,
} from "react-icons/si";

function Techstack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            <Col xs={4} md={2} className='tech-icons' title='HTML'>
                <SiHtml5 title='HTML' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='CSS'>
                <SiCss3 title='CSS' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='JavaScript'>
                <DiJavascript1 title='JavaScript' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='React.js'>
                <DiReact title='React.js' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='Redux'>
                <SiRedux title='Redux' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='Next.js'>
                <SiNextdotjs title='Next.js' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='Sass'>
                <DiSass title='Sass' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='Tailwind.css'>
                <SiTailwindcss title='Tailwind.css' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='Bootstrap'>
                <SiBootstrap title='Bootstrap' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='Angular'>
                <SiAngular title='Angular' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='TypeScript'>
                <SiTypescript title='TypeScript' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='Node.js'>
                <DiNodejs title='Node.js' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='Mongo DB'>
                <SiMongodb title='Mongo DB' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='Figma'>
                <SiFigma title='Figma' />
            </Col>
            <Col xs={4} md={2} className='tech-icons' title='GIT'>
                <DiGit title='GIT' />
            </Col>
        </Row>
    );
}

export default Techstack;
