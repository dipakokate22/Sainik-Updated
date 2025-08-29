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
  const res = await fetch(`https://sainik.codekrafters.in/api/student/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ ...payload, id }),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}
