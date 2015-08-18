import axios from 'axios';

var baseUrl = 'http://localhost:1337/api';

function getHeaders(token) {
  return { Authorization: 'Bearer ' + token };
}

export async function signup(email, password, username, shortDescription) {
  try {
    var response = await axios.post(`${baseUrl}/signup`, {
      email,
      password,
      username,
      shortDescription
    });

    return response.data;
  } catch (err) {
    if (err.status === 409) {
      throw Error('User with such an email already exists');
    }

    throw Error('Unknown error occured :-(. Please, try again later.');
  }
}

export async function login(email, password) {
  try {
    var response = await axios.post(`${baseUrl}/login`, { email, password });

    return response.data;
  } catch (err) {
    if (err.status === 401) { throw Error('Incorrect email or password'); }

    throw Error('Unknown error occured :-(. Please, try again later.');
  }
}

export async function fetchProfile(token) {
  try {
    let headers = getHeaders(token);
    let response = await axios.get(`${baseUrl}/profile`, { headers });

    return response.data;
  } catch (err) {
    throw Error('Unknown error occured :-(. Please, try again later.');
  }
}

export async function saveProfile(token, update) {
  try {
    const headers = getHeaders(token);
    const response = await axios.put(`${baseUrl}/profile`, update, { headers });

    return response.data;
  } catch (err) {
    throw Error('Unknown error occured :-(. Please, try again later.');
  }
}

export async function fetchSingleUser(token, username) {
  try {
    let headers = getHeaders(token);
    let response = await axios.get(`${baseUrl}/users/${username}`, { headers });
    return response.data;
  } catch (err) {
    throw Error('Unknown error occured :-(. Please, try again later.');
  }
}

export async function fetchPublishedPosts() {
  try {
    let response = await axios.get(`${baseUrl}/posts`);
    return response.data;
  } catch (err) {
    throw Error('Unknown error occured :-(. Please, try again later.');
  }
}

export async function fetchUnpublishedPosts(token) {
  try {
    let headers = getHeaders(token);
    let response = await axios.get(`${baseUrl}/posts/drafts`, { headers });
    return response.data;
  } catch (err) {
    throw Error('Unknown error occured :-(. Please, try again later.');
  }
}

export async function savePost(token, post) {
  try {
    let headers = getHeaders(token);
    let response;
    if (post.id) {
      response = await axios.put(`${baseUrl}/posts/${post.id}`, post, {
        headers
      });
    } else {
      response = await axios.post(`${baseUrl}/posts`, post, { headers });
    }

    return response.data;
  } catch (err) {
    throw Error('Unknown error occured :-(. Please, try again later.');
  }
}
