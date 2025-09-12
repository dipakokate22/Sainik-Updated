import { getAuthToken, getUserId } from './authServices';

/**
 * Create a new school.
 * @param {Object} schoolData - All school fields, including profile_image as File.
 * @returns {Promise<Object>} - API response.
 */
export const createSchool = async (schoolData) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.skdagriculturecollege.org/api';
  const url = `${API_BASE_URL}/user/schools`;
  const token = getAuthToken();
  const userId = getUserId();

  const formData = new FormData();

  // Required fields
  formData.append('name', schoolData.name);
  formData.append('profile_image', schoolData.profile_image); // File object
  formData.append('latitude', schoolData.latitude);
  formData.append('longitude', schoolData.longitude);
  formData.append('full_address', schoolData.full_address);
  formData.append('city', schoolData.city);
  formData.append('state', schoolData.state);
  formData.append('mobile', schoolData.mobile);
  formData.append('email', schoolData.email);
  formData.append('user_id', userId); // Pass user_id

  // Optional fields
  if (schoolData.website) formData.append('website', schoolData.website);
  if (schoolData.ownership) formData.append('ownership', schoolData.ownership);
  if (schoolData.medium) formData.append('medium', schoolData.medium);
  if (schoolData.board) formData.append('board', schoolData.board);
  if (schoolData.category) formData.append('category', schoolData.category);
  if (schoolData.welcome_note) formData.append('welcome_note', schoolData.welcome_note);

  // Array fields
  const arrayFields = [
    'key_highlights',
    'admission_criteria_eligibility',
    'school_hours',
    'annual_fee_structure',
    'additional_fees',
    'academic_facilities',
    'sports_recreation_facilities',
    'infrastructure_facilities',
    'gallery',
    'tags'
  ];
  arrayFields.forEach(field => {
    if (schoolData[field]) {
      // Send arrays as JSON strings
      formData.append(field, JSON.stringify(schoolData[field]));
    }
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
        // Do not set Content-Type for FormData; browser will set it with boundary
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'School creation failed');
    }

    return data;
  } catch (error) {
    console.error('Create school error:', error);
    throw error;
  }
};

/**
 * Get school info for the logged-in user.
 * @returns {Promise<Object>} - School info response.
 */
export const getSchoolInfo = async () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.skdagriculturecollege.org/api';
  const url = `${API_BASE_URL}/user/schools`;
  const token = getAuthToken();

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch school info');
    }

    return data;
  } catch (error) {
    console.error('Get school info error:', error);
    throw error;
  }
};