const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.codekrafters.in/api';

// Register API
export const registerUser = async (userData) => {
  try {
    let response, data;
    // If image is present, use FormData
    if (userData.image) {
      const formData = new FormData();
      formData.append('firstName', userData.firstName);
      formData.append('lastName', userData.lastName);
      formData.append('mobile', userData.mobile);
      formData.append('email', userData.email);
      formData.append('role', userData.role);
      formData.append('password', userData.password);
      formData.append('image', userData.image);
      // Optional fields
      if (userData.website) {
        formData.append('website', userData.website);
      }
      if (userData.current_class) {
        formData.append('current_class', userData.current_class);
      }

      response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        body: formData
      });
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Server error: Invalid response format');
      }
    } else {
      const payload = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobile: userData.mobile,
        email: userData.email,
        role: userData.role,
        password: userData.password,
      };

      // Conditionally include optional fields
      if (userData.website) {
        payload.website = userData.website;
      }
      if (userData.current_class) {
        payload.current_class = userData.current_class;
      }

      response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      try {
        data = await response.json();
      } catch (jsonError) {
        // If response is not JSON, show a generic error
        throw new Error('Server error: Invalid response format');
      }
    }

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Store response in localStorage (similar to login)
    if (data && data.jwttoken) {
      localStorage.setItem('authToken', data.jwttoken);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('firstName', data.firstName || '');
      localStorage.setItem('lastName', data.lastName || '');
      localStorage.setItem('email', data.email || '');
      localStorage.setItem('mobile', data.mobile || '');
      // Optionally store image URL if returned
      if (data.image) {
        localStorage.setItem('image', data.image);
      }
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
      // Store image URL if present
      if (data.image) {
        localStorage.setItem('image', data.image);
      }
      // Store school object for sidebar display
      if (data.school) {
        localStorage.setItem('school', JSON.stringify(data.school));
      }
      
      // Trigger custom event to update sidebar immediately
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('userInfoUpdated'));
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
      // Store image URL if present
      if (data.image) {
        localStorage.setItem('image', data.image);
      }
      
      // Trigger custom event to update sidebar immediately
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('userInfoUpdated'));
      }
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

// Contact Form API
export const submitContactForm = async (contactData) => {
  try {
    // Create payload with exact field names matching the API requirements
    const payload = {
      name: contactData.name,
      email: contactData.email,
      number: contactData.number,
      message: contactData.message
      // Category is omitted as it's not in the required payload format
    };
    
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit contact form');
    }
    return data;
  } catch (error) {
    console.error('Contact form error:', error);
    throw error;
  }
};