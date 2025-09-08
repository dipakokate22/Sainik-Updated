import { getAuthToken,getUserId } from './authServices';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.codekrafters.in/api';
const SEARCH_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.codekrafters.in/api';

/* ================== SCHOOL APIs ================== */

// Get All Schools
export const getAllSchools = async () => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/schools`, { method: 'GET', headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch schools list');
    return data;
  } catch (err) {
    console.error('Get all schools error:', err);
    throw err;
  }
};

/* ================== SUBSCRIPTION APIs ================== */

// ✅ Purchase Subscription
export const purchaseSubscription = async (schoolId) => {
  try {
    const token = getAuthToken();
    const userId = getUserId();

    if (!userId) throw new Error('User ID not found. Please login again.');

    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const payload = {
      user_id: userId,
      school_id: schoolId,
    };

    const res = await fetch(`${API_BASE_URL}/subscription/purchase`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to purchase subscription');

    return data;
  } catch (err) {
    console.error('Purchase subscription error:', err);
    throw err;
  }
};
// ✅ Get School Subscriptions By User ID
export const getSchoolSubscriptionsByUserId = async () => {
  try {
    const token = getAuthToken();
    const userId = getUserId();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/school-subscriptions/user/${userId}`, {
      method: 'GET',
      headers,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch school subscriptions');
    return data;
  } catch (err) {
    console.error('Get school subscriptions by userId error:', err);
    throw err;
  }
};

// Get School By Slug
export const getSchoolBySlug = async (slug) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/schools/${slug}`, { method: 'GET', headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch school details');
    return data;
  } catch (err) {
    console.error('Get school by slug error:', err);
    throw err;
  }
};

// Get School By ID
export const getSchoolById = async (id) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/schools/${id}`, { method: 'GET', headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch school by id');
    return data;
  } catch (err) {
    console.error('Get school by id error:', err);
    throw err;
  }
};

// ✅ Get School By User ID
export const getSchoolByUserId = async (userId) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/user/schools/${userId}`, { method: 'GET', headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch school by userId');
    return data;
  } catch (err) {
    console.error('Get school by userId error:', err);
    throw err;
  }
};

// ✅ Update School Details (JSON only, no file upload)
export const updateSchoolById = async (id, schoolData) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/user/schools/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(schoolData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update school details');
    return data;
  } catch (err) {
    console.error('Update school by id error:', err);
    throw err;
  }
};

/* ================== IMAGE UPLOAD APIs ================== */

// ✅ Upload Profile Image
export const uploadProfileImage = async (id, file) => {
  try {
    const token = getAuthToken();
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE_URL}/school/profile/${id}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to upload profile image');
    return data;
  } catch (err) {
    console.error('Upload profile image error:', err);
    throw err;
  }
};

// ✅ Upload Gallery Images
export const uploadGalleryImages = async (id, files) => {
  try {
    const token = getAuthToken();
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('gallery[]', file);
    });

    const res = await fetch(`${API_BASE_URL}/school/gallery/${id}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to upload gallery images');
    return data;
  } catch (err) {
    console.error('Upload gallery images error:', err);
    throw err;
  }
};

/* ================== SEARCH APIs ================== */
export const searchSchools = async (params = {}) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const queryParams = new URLSearchParams(params).toString();
    const url = `${SEARCH_API_BASE_URL}/schools/search${queryParams ? `?${queryParams}` : ''}`;

    const res = await fetch(url, { method: 'GET', headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to search schools');
    return data;
  } catch (err) {
    console.error('Search schools error:', err);
    throw err;
  }
};

// schoolServices.js

// GET: Categories, Boards, Mediums master payload
export const getCategoriesBoardMedium = async () => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/categories-board-medium`, {
      method: 'GET',
      headers,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch categories/board/medium');
    return data;
  } catch (err) {
    console.error('Get categories/board/medium error:', err);
    throw err;
  }
};


export const getStates = async () => {
  const res = await fetch("https://sainik.codekrafters.in/api/states");
  if (!res.ok) {
    throw new Error("Failed to fetch states");
  }
  return await res.json(); // adjust if API response has { data: [...] }
};

export const getCities = async (stateId) => {
  const res = await fetch(`https://sainik.codekrafters.in/api/cities/${stateId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch cities for state " + stateId);
  }
  return await res.json();
};


// Helpers
export const searchSchoolsByName = async (name) => searchSchools({ name });
export const searchSchoolsByLocation = async (city, state) => searchSchools({ city, state });
export const searchSchoolsByBoard = async (board) => searchSchools({ board });
export const searchSchoolsByCoordinates = async (latitude, longitude) =>
  searchSchools({ latitude, longitude });
