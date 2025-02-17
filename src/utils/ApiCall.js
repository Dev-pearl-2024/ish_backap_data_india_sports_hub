import axios from 'axios';

/**
 * Utility function to call APIs.
 *
 * @param {string} endpoint - The API endpoint (relative or absolute URL).
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE', etc.).
 * @param {object} params - Query parameters for the request.
 * @param {object} payload - Request body for POST/PUT requests.
 * @param {object} headers - Custom headers for the request.
 * @param {number} timeout - Request timeout in milliseconds (default 10 seconds).
 * @returns {Promise<object>} - A Promise resolving to the API response.
 */
const ApiCall = async ({
  endpoint,
  method = 'GET',
  params = {},
  payload = {},
  headers = {},
  timeout = 60000,
}) => {
  const BASE_URL = 'https://prod.indiasportshub.com/';

  try {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      params,
      data: method.toUpperCase() !== 'GET' ? payload : undefined, // Only add data if method is not GET
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      timeout,
    });
    return response.data;
  } catch (error) {
    console.log('error in api call',error)
    if (error.response) {
      throw error.response.data; 
    } else if (error.request) {
      throw new Error('No response from the server. Please try again later.');
    } else {
      throw new Error(error.message);
    }
  }
};

export default ApiCall;
