const API_URL = `http://localhost:3000/`

const headers = {
  Accepts: 'application/json',
  'Content-Type': 'application/json'
}

const fetchPosts = () => {
  return fetch(`http://localhost:3000/posts`)
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
