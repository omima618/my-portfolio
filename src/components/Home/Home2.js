import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
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
                            I am a frontend developer with hands in
                            <i>
                                <b className='main-color'> React.js </b>
                            </i>
                            as a mian framework.
                            <br />I am also familiar with
                            <i>
                                <b className='main-color'> Angular. </b>
                            </i>
                            <br />
                            <br />
                            Able to integrate
                            <i>
                                <b className='main-color'>
                                    {" "}
                                    frontend with backend{" "}
                                </b>
                            </i>
                            and work with    <i>
                                <b className='main-color'>
                                    {" "}
                                    apis.
                                </b>
                            </i>
                            <br />
                            <br />
                            I am very Passionate about creating elegant user
                            interfaces,
                            <br />
                            that are responsive to all screens.
                            <br />
                            <br />
                            Able to convert any Design on Figma or AdobeXD to a
                            responsive interactive website.
                            <br />
                            <br />I am famaliar with
                            <i>
                                <b className='main-color'>
                                    {" "}
                                    Node.js & Mongo DB.
                                </b>
                            </i>
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
