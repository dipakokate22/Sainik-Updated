export async function getStudentProfile(id) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const res = await fetch(`https://sainik.codekrafters.in/api/student/profile/${id}`, {
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
    res = await fetch(`https://sainik.codekrafters.in/api/student/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Do not set Content-Type for FormData; browser sets it automatically
      },
      body: formData,
    });
  } else {
    res = await fetch(`https://sainik.codekrafters.in/api/student/profile`, {
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

export async function getLibraryResources() {
  const res = await fetch('https://sainik.codekrafters.in/api/Library');
  if (!res.ok) throw new Error('Failed to fetch library resources');
  return res.json();
}

export async function applyToSchool({ school_id, user_id, applied_date }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
  const res = await fetch('https://sainik.codekrafters.in/api/applied-students', {
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
  const res = await fetch(`https://sainik.codekrafters.in/api/applied-students/${id}`, {
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
  const res = await fetch(`https://sainik.codekrafters.in/api/applied-students?user_id=${encodeURIComponent(user_id)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch applied students');
  return res.json();
}
