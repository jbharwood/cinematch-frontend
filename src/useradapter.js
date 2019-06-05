export default class UserAdapter {
  static POST_URL = `${API_URL}/posts`


  static getPosts() {
    return fetch(`${this.POST_URL}`)
      .then(res => res.json())
      .then(json => json)
  }

}
