const API_URL = "http://localhost:5000/api";


const request = async (url, options = {}) => {
  const response = await fetch(
    `${API_URL}${url}`,
    options
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
};


export const api = {

  register: (data) =>
    request("/auth/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }),


  login: (data) =>
    request("/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }),


  getPosts: () =>
    request("/posts"),


  getPost: (id) =>
    request(`/posts/${id}`),


  createPost: (data, token) =>
    request("/posts", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(data),
    }),


  deletePost: (id, token) =>
    request(`/posts/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),


  likePost: (id, token) =>
    request(`/posts/${id}/like`, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),


  addComment: (id, text, token) =>
    request(`/posts/${id}/comments`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        text,
      }),
    }),


  sharePost: (id) =>
    request(`/posts/${id}/share`, {
      method: "POST",
    }),
};