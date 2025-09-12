import { getAuthToken,getUserId } from './authServices';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.skdagriculturecollege.org/api';
const SEARCH_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.skdagriculturecollege.org/api';

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

// Get School By ID (with optional lat/long for nearby schools calculation)
export const getSchoolById = async (id, latitude = null, longitude = null) => {
  try {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (latitude !== null && longitude !== null) {
      queryParams.append('latitude', latitude.toString());
      queryParams.append('longitude', longitude.toString());
    }

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/schools/${id}${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, { method: 'GET', headers });
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
  const res = await fetch("https://sainik.skdagriculturecollege.org/api/states");
  if (!res.ok) {
    throw new Error("Failed to fetch states");
  }
  return await res.json(); // adjust if API response has { data: [...] }
};

export const getCities = async (stateId) => {
  const res = await fetch(`https://sainik.skdagriculturecollege.org/api/cities/${stateId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch cities for state " + stateId);
  }
  return await res.json();
};
export const getSubscriptionTransactionsByUserId = async (userId) => {
  try {
    const uid = userId ?? getUserId();
    if (!uid) throw new Error("User ID not found. Please login.");

    const token = getAuthToken();
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/subscription/transactions/${uid}`, {
      method: "GET",
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error((data && data.message) || "Failed to fetch subscription transactions");
    }

    return data; // raw response { success, message, data }
  } catch (err) {
    console.error("getSubscriptionTransactionsByUserId error:", err);
    throw err;
  }
};
/* ================== INVOICE (Mock) ================== */

// ✅ Mock: Download Invoice by Transaction ID
/* ================== INVOICE (Mock) ================== */

// ✅ Mock: Download Invoice by Transaction ID
export const downloadInvoiceByTransactionId = async (transactionId) => {
  try {
    // 🔹 Fake invoice content (you can make it richer if needed)
    const mockInvoiceContent = `
      INVOICE #: INV-${transactionId}
      Date: ${new Date().toLocaleDateString()}
      
      Billed To:
      John Doe
      johndoe@example.com
      
      School: Sainik School Example
      Plan: Premium
      Amount: ₹999
      Period: 01-Sep-2025 to 01-Sep-2026
      
      Thank you for your purchase!
    `;

    // 🔹 Return a Blob (pretend it's a PDF)
    const blob = new Blob([mockInvoiceContent], { type: "application/pdf" });

    return blob; // ⚡ Now your handleDownloadInvoice() can consume this
  } catch (err) {
    console.error("Download invoice (mock) error:", err);
    throw err;
  }
};


// Helpers
export const searchSchoolsByName = async (name) => searchSchools({ name });
export const searchSchoolsByLocation = async (city, state) => searchSchools({ city, state });
export const searchSchoolsByBoard = async (board) => searchSchools({ board });
export const searchSchoolsByCoordinates = async (latitude, longitude) =>
  searchSchools({ latitude, longitude });
