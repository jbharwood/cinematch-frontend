import API_URL from '../config.js'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const fetchPosts = () => {
  return fetch(`${API_URL}/posts`)
  .then(r => r.json())
  .then(r => {
  })
}

const createPost = post => {
  return fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post)
  }).then(res => res.json())
  .then(r => {
  })
}

const fetchFeed = feedId => {
  return fetch(`${API_URL}/feeds/${feedId}`)
  .then(res => res.json())
  .then(r => {
  })
}

export default { createPost, fetchFeed }
