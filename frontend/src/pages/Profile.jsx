import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import apiConnector from '../component/apiConnector';

const BASE_URL = "http://localhost:5174";

function ProfilePage() {
  const [profile, setProfile] = useState(null); // State to store profile data
  const [error, setError] = useState(null); // State to handle errors

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiConnector.get(`${BASE_URL}/api/profile`); // Fetch profile data
        setProfile(response.data); // Assuming the API returns an object with user and recipe details
      } catch (err) {
        console.error('Error fetching profile data:', err.message);
        setError('Failed to fetch profile data. Please try again later.');
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures the fetch happens only once

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="text-center">
          <h2>User Profile</h2>
        </Card.Header>
        <Card.Body>
          {error && <div className="alert alert-danger">{error}</div>} {/* Show error if any */}
          {profile ? (
            <>
              <Row>
                <Col md={4}>
                  <img
                    src={profile.imageUrl || 'default-profile-image.jpg'} // Use profile image or a default placeholder
                    alt="Profile"
                    className="img-fluid"
                  />
                </Col>
                <Col md={8}>
                  <h4>Name: {profile.userData.username}</h4>
                  <p>Email: {profile.userData.email}</p>
                  <p>My Recipes: {profile.recipeData.length}</p>
                </Col>
              </Row>
              <h3 className="mt-4">My Recipes</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Recipe Name</th>
                    <th>Description</th>
                    <th>Preparation Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.recipeData.map((recipe, index) => (
                    <tr key={recipe._id}>
                      <td>{index + 1}</td>
                      <td>{recipe.recipeName}</td>
                      <td>{recipe.cuisineType}</td>
                      <td>{recipe.preparationTime} mins</td>
                      <td>
                        <Button variant="info" size="sm" className="me-2">
                          View
                        </Button>
                        <Button variant="danger" size="sm">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <div>Loading profile...</div>
          )}
        </Card.Body>
        <Card.Footer className="text-center">
          <Button variant="primary">Edit Profile</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default ProfilePage;
