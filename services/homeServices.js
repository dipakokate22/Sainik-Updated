import { getAuthToken } from './authServices';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://resume.zihcc.in/api';

// Helper to build headers with optional auth
const buildHeaders = () => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Section One
export const getSectionOne = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/section-one`, {
      method: 'GET',
      headers: buildHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch section one');
    return data;
  } catch (error) {
    console.error('Get section one error:', error);
    throw error;
  }
};

// Section Three
export const getSectionThree = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/section-three`, {
      method: 'GET',
      headers: buildHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch section three');
    return data;
  } catch (error) {
    console.error('Get section three error:', error);
    throw error;
  }
};

// Section Four
export const getSectionFour = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/section-four`, {
      method: 'GET',
      headers: buildHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch section four');
    return data;
  } catch (error) {
    console.error('Get section four error:', error);
    throw error;
  }
};

// Section Five
export const getSectionFive = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/section-five`, {
      method: 'GET',
      headers: buildHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch section five');
    return data;
  } catch (error) {
    console.error('Get section five error:', error);
    throw error;
  }
};

// Section Seven
export const getSectionSeven = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/section-seven`, {
      method: 'GET',
      headers: buildHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch section seven');
    return data;
  } catch (error) {
    console.error('Get section seven error:', error);
    throw error;
  }
};

// Section Eight
export const getSectionEight = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/section-eight`, {
      method: 'GET',
      headers: buildHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch section eight');
    return data;
  } catch (error) {
    console.error('Get section eight error:', error);
    throw error;
  }
};
