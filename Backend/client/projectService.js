import axios from 'axios';

export const fetchProjects = async () => {
  try {
    const response = await axios.get('/api/projects'); // Token is automatically added by axiosConfig
    return response.data;
  } catch (error) {
    console.error('Error fetching projects', error);
    throw error;
  }
};
