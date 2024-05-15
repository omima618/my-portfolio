import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import {
    AiFillGithub,
    AiOutlineTwitter,
    AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
    return (
        <Container fluid className='home-about-section' id='about'>
            <Container>
                <Row>
                    <Col md={8} className='home-about-description'>
                        <h1 style={{ fontSize: "2.6em" }}>
                            LET ME{" "}
                            <span className='main-color'> INTRODUCE </span>{" "}
                            MYSELF
                        </h1>
                        <p className='home-about-body'>
                            I am an experienced
                            <i>
                                <b className='main-color'> Frontend Developer </b>
                            </i>
                            with nearly
                            <i>
                                <b className='main-color'> 2 years of experience </b>
                            </i>
                            in frontend development technologies,
                            specializing in
                            <i>
                                <b className='main-color'> JavaScript </b>
                            </i>
                            with a strong emphasis on
                            <i>
                                <b className='main-color'> Angular </b>
                            </i>
                            as my primary framework, complemented by
                            <i>
                                <b className='main-color'> React.js </b>
                            </i>
                            as a secondary framework.
                            <br />
                            <br />
                            Skilled in seamlessly
                            <i>
                                <b className='main-color'> integrating </b>
                            </i>
                            frontend with backend systems and proficient in working with APIs to augment functionality and enhance user experience.
                            <br />
                            <br />
                            Passionate about creating elegant user interfaces that not only captivate visually but also adapt seamlessly across all screen sizes.
                            <br />
                            <br />
                            Proficient in converting designs into interactive, responsive websites with meticulous attention to detail.
                            <br />
                            <br />
                            Recognized for my exceptional
                            <i>
                                <b className='main-color'> problem-solving </b>
                            </i>
                            abilities and knack for conducting thorough research,
                            consistently delivering innovative solutions to intricate challenges.
                        </p>
                    </Col>
                    <Col md={4} className='myAvtar'>
                        <Tilt>
                            <img
                                src={myImg}
                                className='img-fluid'
                                alt='avatar'
                            />
                        </Tilt>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className='home-about-social'>
                        <h1>FIND ME ON</h1>
                        <p>
                            Feel free to{" "}
                            <span className='main-color'>connect </span>with me
                        </p>
                        <ul className='home-about-social-links'>
                            <li className='social-icons'>
                                <a
                                    href='https://github.com/omima618'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='icon-colour  home-social-icons'
                                >
                                    <AiFillGithub />
                                </a>
                            </li>
                            <li className='social-icons'>
                                <a
                                    href='https://twitter.com/Omima330'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='icon-colour  home-social-icons'
                                >
                                    <AiOutlineTwitter />
                                </a>
                            </li>
                            <li className='social-icons'>
                                <a
                                    href='https://www.linkedin.com/in/omima-khaled-frontend-dev/'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='icon-colour  home-social-icons'
                                >
                                    <FaLinkedinIn />
                                </a>
                            </li>
                            <li className='social-icons'>
                                <a
                                    href='https://www.instagram.com/omima560'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='icon-colour home-social-icons'
                                >
                                    <AiFillInstagram />
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
export default Home2;
