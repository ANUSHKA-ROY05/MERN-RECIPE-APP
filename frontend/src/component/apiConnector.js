import axios from 'axios';
import Cookies from 'js-cookie'; // Using js-cookie instead of custom getCookie

// Base URL for your API
const API_BASE_URL = "http://localhost:5174";

// Create an Axios instance
const apiConnector = axios.create({
    baseURL: API_BASE_URL, // Base URL for the API
    headers: {
        'Content-Type': 'application/json', // Default content type
    },
});


// Add an interceptor to include the token automatically in each request
apiConnector.interceptors.request.use(
    (config) => {
        

        // Retrieve the token from cookies using js-cookie
        const token = Cookies.get('authToken');
        //console.log(token)
       
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`; // Attach the token as a Bearer token
           // console.log(config.headers['Authorization'].split(" ")[1].trim());
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Export the apiConnector for use in other files
export default apiConnector;
