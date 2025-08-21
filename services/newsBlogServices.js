const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sainik.codekrafters.in/api';

// Helper to build query string from params object
const buildQueryString = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  return query.toString() ? `?${query.toString()}` : '';
};

export const getAllNews = async (page = 1, per_page = 10) => {
  const params = { page, per_page };
  const url = `${API_BASE_URL}/news${buildQueryString(params)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch news');
  return data;
};

export const searchNews = async ({
  title,
  content,
  category,
  date_from,
  date_to,
  page = 1,
  per_page = 10,
}) => {
  const params = {
    ...(title && { title }),
    ...(content && { content }),
    ...(category && { category }),
    ...(date_from && { date_from }),
    ...(date_to && { date_to }),
    page,
    per_page,
  };
  const url = `${API_BASE_URL}/news/search${buildQueryString(params)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to search news');
  return data;
};

export const getNewsDetails = async (slugOrId) => {
  const url = `${API_BASE_URL}/news/${slugOrId}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch news details');
  return data;
};

export const getStudentSuccessStories = async () => {
  const url = `${API_BASE_URL}/student-success-stories`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch student success stories');
  return data;
};
