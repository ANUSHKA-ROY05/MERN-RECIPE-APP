import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import apiConnector from '../component/apiConnector'; // Import your preconfigured Axios instance

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    recipeName: '',
    ingredients: '',
    instructions: '',
    cuisineType: '',
    preparationTime: '',
    cookingTime: '',
    servings: '',
   // image: null,
    tags: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle changes for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevState) => ({ ...prevState, [name]: value }));
  };

  // // Handle file input change
  // const handleImageChange = (e) => {
  //   setRecipe((prevState) => ({ ...prevState, image: e.target.files[0] }));
  // };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: ensure required fields are filled
    if (
      !recipe.recipeName.trim() ||
      !recipe.ingredients.trim() ||
      !recipe.instructions.trim() ||
      !recipe.cuisineType.trim()
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    // Clear any previous errors
    setError('');
    // Create FormData to support file uploads
    const formData = new FormData();
    formData.append('recipeName', recipe.recipeName);
    formData.append('ingredients', recipe.ingredients.split(',').map((ingredient) => ingredient.trim())); // Parse ingredients as an array
    formData.append('instructions', recipe.instructions);
    formData.append('cuisineType', recipe.cuisineType);
    formData.append('preparationTime', recipe.preparationTime);
    formData.append('cookingTime', recipe.cookingTime);
    formData.append('servings', recipe.servings);
    if (recipe.image) {
      formData.append('image', recipe.image);
    }
    formData.append('tags', recipe.tags.split(',').map((tag) => tag.trim())); // Parse tags as an array

    try {
      // Make an API call to add the recipe
      const response = await apiConnector.post('/addrecipe', formData,{});
      
      console.log(response);
      // Provide success feedback and reset form fields
      setSuccess('Recipe added successfully!');
      setRecipe({
        recipeName: '',
        ingredients: '',
        instructions: '',
        cuisineType: '',
        preparationTime: '',
        cookingTime: '',
        servings: '',
        image: null,
        tags: '',
      });

      // Redirect to the recipes list (or dashboard) after success
      navigate('/recipes');
    } catch (err) {
      console.error('Error adding recipe:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'An error occurred while adding the recipe.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Add a New Recipe</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formRecipeName">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter recipe name"
                  name="recipeName"
                  value={recipe.recipeName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formIngredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter ingredients (comma-separated)"
                  name="ingredients"
                  value={recipe.ingredients}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formInstructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter instructions"
                  name="instructions"
                  value={recipe.instructions}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCuisineType">
                <Form.Label>Cuisine Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter cuisine type"
                  name="cuisineType"
                  value={recipe.cuisineType}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPreparationTime">
                <Form.Label>Preparation Time (in minutes)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter preparation time"
                  name="preparationTime"
                  value={recipe.preparationTime}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCookingTime">
                <Form.Label>Cooking Time (in minutes)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter cooking time"
                  name="cookingTime"
                  value={recipe.cookingTime}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formServings">
                <Form.Label>Servings</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter number of servings"
                  name="servings"
                  value={recipe.servings}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image Upload</Form.Label>
                <Form.Control type="file" name="image" onChange={handleImageChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tags (comma-separated)"
                  name="tags"
                  value={recipe.tags}
                  onChange={handleChange}
                />
              </Form.Group> */}
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Add Recipe
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRecipe;
