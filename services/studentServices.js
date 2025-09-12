export async function getStudentProfile(id) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const res = await fetch(`https://sainik.skdagriculturecollege.org/api/student/profile/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function updateStudentProfile(id, payload) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  let res;
  if (payload.imageFile) {
    // If imageFile is present, use FormData
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'imageFile') {
        formData.append('image', value); // API expects 'image'
      } else {
        formData.append(key, value);
      }
    });
    formData.append('id', id);
    res = await fetch(`https://sainik.skdagriculturecollege.org/api/student/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Do not set Content-Type for FormData; browser sets it automatically
      },
      body: formData,
    });
  } else {
    res = await fetch(`https://sainik.skdagriculturecollege.org/api/student/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...payload, id }),
    });
  }
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

// New API: Upload profile image via POST /api/profile/image/{id}
export async function uploadStudentProfileImage(id, imageFile) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await fetch(`https://sainik.skdagriculturecollege.org/api/profile/image/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Let the browser set Content-Type for multipart/form-data
    },
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload profile image');
  return res.json();
}

export async function getLibraryResources() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const res = await fetch('https://sainik.skdagriculturecollege.org/api/library/class', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch library resources');
  return res.json();
}

export async function applyToSchool({ school_id, user_id, applied_date }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const res = await fetch('https://sainik.skdagriculturecollege.org/api/applied-students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ school_id, user_id, applied_date }),
  });
  if (!res.ok) throw new Error('Failed to apply to school');
  return res.json();
}

export async function updateAppliedStudentStatus(id, { school_id, user_id, applied_date, status }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const res = await fetch(`https://sainik.skdagriculturecollege.org/api/applied-students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ school_id, user_id, applied_date, status }),
  });
  if (!res.ok) throw new Error('Failed to update applied student status');
  return res.json();
}

export async function getAppliedStudentsByUser(user_id) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const res = await fetch(`https://sainik.skdagriculturecollege.org/api/applied-students?user_id=${encodeURIComponent(user_id)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch applied students');
  return res.json();
}
export async function getSubscriptionPlans() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const res = await fetch('https://sainik.skdagriculturecollege.org/api/student-subscription-plans', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Failed to fetch subscription plans: ${res.status} - ${errorData}`);
  }
  
  return res.json();
}

export async function purchaseSubscriptionPlan(user_id, plan_id) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const res = await fetch('https://sainik.skdagriculturecollege.org/api/student-subscription-purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id, plan_id }),
  });
  
  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Failed to purchase subscription plan: ${res.status} - ${errorData}`);
  }
  
  return res.json();
}

export async function getUserSubscriptions(userId) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const res = await fetch(`https://sainik.skdagriculturecollege.org/api/student-subscription-get/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Failed to fetch user subscriptions: ${res.status} - ${errorData}`);
  }
  
  return res.json();
}
