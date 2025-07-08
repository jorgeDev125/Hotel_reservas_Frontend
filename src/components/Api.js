export class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { ...this.headers },
    };

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${this.baseUrl}${endpoint}`, options);
    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (res.ok) {
      return data;
    } else {
      // Muestra el mensaje de error del servidor si existe
      const errorMsg =
        data && data.message
          ? data.message
          : data.error || "Hubo un error al procesar la solicitud.";
      throw new Error(errorMsg);
    }
  }
}
