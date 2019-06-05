let API_URL
if (process.env["NODE_ENV"] === "development") {
  API_URL = "http://localhost:3000"
} else if (process.env["NODE_ENV"] === "production") {
  API_URL = "https://cinematch-api.herokuapp.com"
}

export default API_URL
