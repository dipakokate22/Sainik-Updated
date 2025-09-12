import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://sainik.skdagriculturecollege.org/api";

const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  "AIzaSyBXm5uF-ladXhm6MijlNeEFxyrSHO8MpCw";

// ================= REGISTER =================
export const registerUser = async (userData) => {
  try {
    let response, data;

    if (userData.image) {
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("mobile", userData.mobile);
      formData.append("email", userData.email);
      formData.append("role", userData.role);
      formData.append("password", userData.password);
      formData.append("image", userData.image);

      if (userData.website) formData.append("website", userData.website);
      if (userData.current_class)
        formData.append("current_class", userData.current_class);

      response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        body: formData,
      });
      data = await response.json();
    } else {
      const payload = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobile: userData.mobile,
        email: userData.email,
        role: userData.role,
        password: userData.password,
      };

      if (userData.website) payload.website = userData.website;
      if (userData.current_class) payload.current_class = userData.current_class;

      response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      data = await response.json();
    }

    if (!response.ok) {
      toast.error(data.message || "Registration failed");
      throw new Error(data.message || "Registration failed");
    }

    if (data && data.jwttoken) {
      localStorage.setItem("authToken", data.jwttoken);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("firstName", data.firstName || "");
      localStorage.setItem("lastName", data.lastName || "");
      localStorage.setItem("email", data.email || "");
      localStorage.setItem("mobile", data.mobile || "");
      if (data.image) localStorage.setItem("image", data.image);
    }

    toast.success("Registration successful");
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Something went wrong while registering");
    throw error;
  }
};

// ================= SCHOOL LOGIN =================
export const schoolLogin = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/school-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginData.email,
        role: loginData.role,
        password: loginData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "School login failed");
      throw new Error(data.message || "School login failed");
    }

    if (data.login && data.jwttoken) {
      localStorage.setItem("authToken", data.jwttoken);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("firstName", data.firstName || "");
      localStorage.setItem("lastName", data.lastName || "");
      localStorage.setItem("email", data.email || "");
      localStorage.setItem("mobile", data.mobile || "");
      if (data.image) localStorage.setItem("image", data.image);
      if (data.school) {
        localStorage.setItem("school", JSON.stringify(data.school));
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("userInfoUpdated"));
      }
    }

    toast.success("School login successful");
    return data;
  } catch (error) {
    console.error("School login error:", error);
    toast.error("Something went wrong during school login");
    throw error;
  }
};

// ================= STUDENT LOGIN =================
export const studentLogin = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginData.email,
        role: loginData.role,
        password: loginData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Student login failed");
      throw new Error(data.message || "Student login failed");
    }

    if (data.login && data.jwttoken) {
      localStorage.setItem("authToken", data.jwttoken);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("firstName", data.firstName || "");
      localStorage.setItem("lastName", data.lastName || "");
      localStorage.setItem("email", data.email || "");
      localStorage.setItem("mobile", data.mobile || "");
      localStorage.setItem("studentId", data.id ? String(data.id) : "");
      localStorage.setItem("signupDate", data.created_at || "");
      if (data.image) localStorage.setItem("image", data.image);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("userInfoUpdated"));
      }
    }

    toast.success("Student login successful");
    return data;
  } catch (error) {
    console.error("Student login error:", error);
    toast.error("Something went wrong during student login");
    throw error;
  }
};

// ================= GOOGLE SEARCH =================
export const googleSearch = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/google-search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        apiKey: GOOGLE_MAPS_API_KEY,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Google search failed");
      throw new Error(data.message || "Google search failed");
    }

    return data;
  } catch (error) {
    console.error("Google search error:", error);
    toast.error("Something went wrong while fetching Google results");
    throw error;
  }
};

// ================= AUTH UTILS =================
export const getAuthToken = () => {
  if (typeof window !== "undefined") return localStorage.getItem("authToken");
  return null;
};

export const getUserRole = () => {
  if (typeof window !== "undefined") return localStorage.getItem("userRole");
  return null;
};

export const getUserId = () => {
  if (typeof window !== "undefined") return localStorage.getItem("userId");
  return null;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully");
  }
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// ================= CONTACT FORM =================
export const submitContactForm = async (contactData) => {
  try {
    const payload = {
      name: contactData.name,
      email: contactData.email,
      number: contactData.number,
      message: contactData.message,
    };

    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Failed to submit contact form");
      throw new Error(data.message || "Failed to submit contact form");
    }

    toast.success("Message sent successfully");
    return data;
  } catch (error) {
    console.error("Contact form error:", error);
    toast.error("Something went wrong while sending message");
    throw error;
  }
};
