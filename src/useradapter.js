export default class UserAdapter {
  static POST_URL = "http://localhost:3000/posts"


  static getPosts() {
    return fetch(`${this.POST_URL}`)
      .then(res => res.json())
      .then(json => json)
  }

}
