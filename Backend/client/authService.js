import axios from 'axios';

// User login function
export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });

    const { token } = response.data; 
    localStorage.setItem('token', token); 

    console.log('Login successful');
    return response.data;
  } catch (error) {
    console.error('Error during login', error);
    throw error;
  }
};
