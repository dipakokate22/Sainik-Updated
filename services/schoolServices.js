import { getAuthToken } from './authServices';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.codekrafters.in/api';
const SEARCH_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.codekrafters.in/api';

// Get All Schools List
export const getAllSchools = async () => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/schools`, { method: 'GET', headers });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to fetch schools list');
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
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/schools/${slug}`, { method: 'GET', headers });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to fetch school details');
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
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/schools/${id}`, { method: 'GET', headers });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to fetch school details');
    return data;
  } catch (error) {
    console.error('Get school by id error:', error);
    throw error;
  }
};

// ✅ New API: Get School Details by User ID
export const getSchoolByUserId = async (userId) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/user/schools/${userId}`, { method: 'GET', headers });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to fetch school by userId');
    return data;
  } catch (error) {
    console.error('Get school by userId error:', error);
    throw error;
  }
};



// ✅ Update School Details (JSON only, no file upload)
export const updateSchoolById = async (id, schoolData) => {
  try {
    const token = getAuthToken();
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/user/schools/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(schoolData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update school details");
    }
    return data;
  } catch (error) {
    console.error("Update school by id error:", error);
    throw error;
  }
};

// ✅ Upload Profile Image (FormData, separate API call)
export const uploadSchoolImage = async (id, file) => {
  try {
    const token = getAuthToken();
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const formData = new FormData();
    formData.append("profile_image", file);

    const response = await fetch(`${API_BASE_URL}/user/schools/${id}`, {
      method: "PUT",
      headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to upload profile image");
    }
    return data;
  } catch (error) {
    console.error("Upload school image error:", error);
    throw error;
  }
};

// Search Schools with optional parameters
export const searchSchools = async (searchParams = {}) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const queryParams = new URLSearchParams();
    if (searchParams.name) queryParams.append('name', searchParams.name);
    if (searchParams.city) queryParams.append('city', searchParams.city);
    if (searchParams.state) queryParams.append('state', searchParams.state);
    if (searchParams.board) queryParams.append('board', searchParams.board);
    if (searchParams.latitude) queryParams.append('latitude', searchParams.latitude);
    if (searchParams.longitude) queryParams.append('longitude', searchParams.longitude);
    if (searchParams.category) queryParams.append('category', searchParams.category);
    if (searchParams.medium) queryParams.append('medium', searchParams.medium);
    if (searchParams.max_fees) queryParams.append('max_fees', searchParams.max_fees);

    const queryString = queryParams.toString();
    const url = `${SEARCH_API_BASE_URL}/schools/search${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, { method: 'GET', headers });
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to search schools');
    return data;
  } catch (error) {
    console.error('Search schools error:', error);
    throw error;
  }
};

// Helper function to search schools by name
export const searchSchoolsByName = async (name) => searchSchools({ name });

// Helper function to search schools by location
export const searchSchoolsByLocation = async (city, state) => searchSchools({ city, state });

// Helper function to search schools by board
export const searchSchoolsByBoard = async (board) => searchSchools({ board });

// Helper function to search schools by coordinates
export const searchSchoolsByCoordinates = async (latitude, longitude) =>
  searchSchools({ latitude, longitude });

// Helper function for combined search
export const searchSchoolsAdvanced = async (name, city, state, board, latitude, longitude) =>
  searchSchools({ name, city, state, board, latitude, longitude });
