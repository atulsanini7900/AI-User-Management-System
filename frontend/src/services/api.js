
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

// GET all users
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    return await handleResponse(response);
  } catch (error) {
    console.error('API Error - Get All Users:', error);
    throw error;
  }
};

// GET single user by ID
export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('API Error - Get User:', error);
    throw error;
  }
};

// POST create new user
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('API Error - Create User:', error);
    throw error;
  }
};

// PUT update user
export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('API Error - Update User:', error);
    throw error;
  }
};

// DELETE user
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('API Error - Delete User:', error);
    throw error;
  }
};