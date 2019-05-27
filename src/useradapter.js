export default class UserAdapter {
  static POST_URL = "https://cinematch-jbharwood.herokuapp.com/posts"


  static getPosts() {
    return fetch(`${this.POST_URL}`)
      .then(res => res.json())
      .then(json => json)
  }

}
