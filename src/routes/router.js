export const ROUTER = {
  routes: {},
  init() {
    window.addEventListener("popstate", () => {
      this.render(window.location.pathname);
    });
  },
  add(path, template) {
    this.routes[path] = template;
  },
  load(path) {
    window.history.pushState({}, path, window.location.origin + "/" + path);
    this.render(path);
  },
  render(path) {
    const content = document.getElementById("content");
    content.textContent = "";
    // Normaliza la ruta para ignorar barras, parámetros y queries
    const cleanPath = (path || "").replace(/^\//, "").split(/[/?#]/)[0];
    if (!(cleanPath in this.routes)) {
      const h1 = document.createElement("p");
      h1.classList.add(
        "text-white",
        "text-center",
        "w-full",
        "text-lg",
        "font-bold",
        "mt-20"
      );
      h1.textContent = "404 - La página no existe";
      content.appendChild(h1);
      return;
    }
    const routeContent = this.routes[cleanPath];
    if (typeof routeContent === "function") {
      const result = routeContent();
      if (result instanceof Promise) {
        result.then((node) => node && content.appendChild(node));
      } else if (result) {
        content.appendChild(result);
      }
    } else if (routeContent instanceof HTMLElement) {
      content.appendChild(routeContent);
    } else if (typeof routeContent === "string") {
      content.insertAdjacentHTML("afterbegin", routeContent);
    }
  },
};
