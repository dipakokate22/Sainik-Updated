import { getAuthToken } from './authServices';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.codekrafters.in/api';
const SEARCH_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.codekrafters.in/api';

// Get All Schools List
export const getAllSchools = async () => {
  try {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/schools`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch schools list');
    }

    return data;
  } catch (error) {
    console.error('Get all schools error:', error);
    throw error;
  }
};

// Get School Details by Slug (with Nearby Schools)
export const getSchoolBySlug = async (slug) => {
  try {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/schools/${slug}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch school details');
    }

    return data;
  } catch (error) {
    console.error('Get school by slug error:', error);
    throw error;
  }
};

// Get School Details by ID
export const getSchoolById = async (id) => {
  try {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}/schools/${id}`, {
      method: 'GET',
      headers,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch school details');
    }
    return data;
  } catch (error) {
    console.error('Get school by id error:', error);
    throw error;
  }
}

// Search Schools with optional parameters
export const searchSchools = async (searchParams = {}) => {
  try {
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Build query string from search parameters
    const queryParams = new URLSearchParams();
    if (searchParams.name) queryParams.append('name', searchParams.name);
    if (searchParams.city) queryParams.append('city', searchParams.city);
    if (searchParams.state) queryParams.append('state', searchParams.state);
    if (searchParams.board) queryParams.append('board', searchParams.board);
    if (searchParams.latitude) queryParams.append('latitude', searchParams.latitude);
    if (searchParams.longitude) queryParams.append('longitude', searchParams.longitude);
    // Add support for category, medium, max_fees
    if (searchParams.category) queryParams.append('category', searchParams.category);
    if (searchParams.medium) queryParams.append('medium', searchParams.medium);
    if (searchParams.max_fees) queryParams.append('max_fees', searchParams.max_fees);

    const queryString = queryParams.toString();
    const url = `${SEARCH_API_BASE_URL}/schools/search${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to search schools');
    }
    return data;
  } catch (error) {
    console.error('Search schools error:', error);
    throw error;
  }
};

// Helper function to search schools by name
export const searchSchoolsByName = async (name) => {
  return searchSchools({ name });
};

// Helper function to search schools by location
export const searchSchoolsByLocation = async (city, state) => {
  return searchSchools({ city, state });
};

// Helper function to search schools by board
export const searchSchoolsByBoard = async (board) => {
  return searchSchools({ board });
};

// Helper function to search schools by coordinates
export const searchSchoolsByCoordinates = async (latitude, longitude) => {
  return searchSchools({ latitude, longitude });
};

// Helper function for combined search
export const searchSchoolsAdvanced = async (name, city, state, board, latitude, longitude) => {
  return searchSchools({ name, city, state, board, latitude, longitude });
};