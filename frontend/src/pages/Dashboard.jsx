import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Card, Row, Col, Button } from 'react-bootstrap';
import '../styles/RecipeDashboard.css';
import { Link } from "react-router-dom";
import axios from 'axios'; // Import Axios for API calls

 const BASE_URL = 'http://localhost:5174';

function RecipeDashboard() {
  const [recipes, setRecipes] = useState([]); // State to store fetched recipes
  const [error, setError] = useState(null); // State to handle errors

  // Fetch recipes from backend using Axios
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/recipes`); // Replace with your backend endpoint
        setRecipes(response.data); // Assuming the API returns an array of recipes
      } catch (err) {
        console.error('Error fetching recipes:', err.message);
        setError('Failed to fetch recipes. Please try again later.');
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array ensures the fetch happens only once

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Recipe Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/add-recipe">Add Recipe</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {error && <div className="alert alert-danger">{error}</div>} {/* Show error if any */}
        <Row>
          {recipes.map((recipe, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="recipe-card">
                {/* <Card.Img variant="top" src={recipe.imageUrl} alt={recipe.title} /> Dynamically render image */}
                <Card.Body>
                  <Card.Title>{recipe.recipeName} By {recipe.author.name}</Card.Title> {/* Render recipe title */}
                  <Card.Text>Type : {recipe.cuisineType}</Card.Text>
                  <Card.Text>Ingredients : {
                            recipe.ingredients.length > 4 ? (
                        recipe.ingredients.map((ingredientName, index) => (
                            ingredientName+',' // Render all ingredients
                              ))
                            ) : (
                                recipe.ingredients.map((ingredientName, index) =>
                          index <= 4 ? (
                            ingredientName// Render up to 4 ingredients
                            ) : null // Exclude items beyond index 4
                          )
                        )
                      }
                  </Card.Text>
                  <Card.Text>Preparation Time : {recipe.preparationTime} minutes</Card.Text>
                  <Card.Text>Servings : {recipe.servings} {recipe.servings>1 && "people"} {!(recipe.servings>1) && "person"}</Card.Text>
                  <Button variant="primary">View Recipe</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default RecipeDashboard;
