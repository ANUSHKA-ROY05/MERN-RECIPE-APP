import React from 'react';
import { Link } from "react-router-dom";  
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';


const Home = () => {
  return (
    <div className="home-container">

      <Container className="mt-5">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="img.jpg"
              alt="Delicious Dish"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption className="custom-carousel-caption">
              <h3>Welcome to FLAVORBook</h3>
              <p>Discover thousands of trusted recipes from home cooks worldwide.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="img6.jpeg"
              alt="Tasty Cuisine"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption className="custom-carousel-caption">
              <h3>Cook Like a Pro</h3>
              <p>Learn cooking tips and tricks from seasoned chefs.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="img4.jpg" 
              alt="Sweet Treats"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption className="custom-carousel-caption">
              <h3>Your Recipe Journey</h3>
              <p>Create, share, and cherish your culinary experiences.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>


      <Container className="mt-4 text-center">
        <Row className="align-items-center">
          <Col md={12}>
            <h2>Explore FLAVORBook</h2>
            <p>
              From quick weeknight meals to show-stopping desserts, find inspiration
              for any occasion.
            </p>
          </Col>
          <Col md={12} className="d-flex justify-content-center gap-3 mt-3">
           
          <Link to="./Dashboard">
          <button className="btn btn-primary">Get Started</button>
          </Link>
            <Button variant="outline-secondary" size="lg">
              Learn More
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
