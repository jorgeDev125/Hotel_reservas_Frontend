export class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { ...this.headers },
    }

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}${endpoint}`, options)    
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => console.error("Error:", error));
  }
}