const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://resume.zihcc.in/api';

// Register API
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobile: userData.mobile,
        email: userData.email,
        role: userData.role,
        password: userData.password
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// School Login API
export const schoolLogin = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/school-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginData.email,
        role: loginData.role,
        password: loginData.password
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'School login failed');
    }

    // Store JWT token and user info in localStorage if login successful
    if (data.login && data.jwttoken) {
      localStorage.setItem('authToken', data.jwttoken);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('firstName', data.firstName || '');
      localStorage.setItem('lastName', data.lastName || '');
      localStorage.setItem('email', data.email || '');
      localStorage.setItem('mobile', data.mobile || '');
      // Store school object for sidebar display
      if (data.school) {
        localStorage.setItem('school', JSON.stringify(data.school));
      }
    }

    return data;
  } catch (error) {
    console.error('School login error:', error);
    throw error;
  }
};

// Student Login API
export const studentLogin = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginData.email,
        role: loginData.role,
        password: loginData.password
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Student login failed');
    }

    // Store JWT token in localStorage if login successful
    if (data.login && data.jwttoken) {
      localStorage.setItem('authToken', data.jwttoken);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('firstName', data.firstName || '');
      localStorage.setItem('lastName', data.lastName || '');
      localStorage.setItem('email', data.email || '');
      localStorage.setItem('mobile', data.mobile || '');
      // Store studentId and signupDate for sidebar
      localStorage.setItem('studentId', data.id ? String(data.id) : '');
      localStorage.setItem('signupDate', data.created_at || '');
    }

    return data;
  } catch (error) {
    console.error('Student login error:', error);
    throw error;
  }
};

// Utility function to get stored auth token
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Utility function to get user role
export const getUserRole = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userRole');
  }
  return null;
};

// Utility function to get user ID
export const getUserId = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userId');
  }
  return null;
};

// Logout function
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};