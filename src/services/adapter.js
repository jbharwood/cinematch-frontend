const API_URL = `https://cinematch-api.herokuapp.com/`

const headers = {
  Accepts: 'application/json',
  'Content-Type': 'application/json'
}

const fetchPosts = () => {
  return fetch(`https://cinematch-api.herokuapp.com/posts`)
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
