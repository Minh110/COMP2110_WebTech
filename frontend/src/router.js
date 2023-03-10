/* COMP 2110 - router.js - Quang Minh Pham - 45546339*/
export class Router {
  constructor(errorHandler) {
    this.routes = {};
    this.errorHandler = errorHandler;
    window.onhashchange = () => this.route();
  }

  get(route, callback) {
    this.routes[route] = callback;
  }

  // A simple hash path parser
  //   parse window.location.hash like "#!/jobs/2"
  //   return an object with properties `path` ("/jobs") and `id` (2)
  splitHash() {
    const regex = "#!(/[^/]*)/?(.*)?";
    const match = window.location.hash.match(regex);
    if (match) {
      return {
        path: match[1],
        id: match[2],
      };
    } else {
      return { path: "/", id: "" };
    }
  }

  route() {
    //changing the viewing url from splitHash()
    const pathInfo = this.splitHash();
    if (pathInfo.path) {
      if (pathInfo.path in this.routes) {
        this.routes[pathInfo.path](pathInfo);
      } else {
        this.errorHandler(pathInfo);
      }
    } else {
      if ("" in this.routes) {
        this.routes[""](pathInfo);
      }
    }
  }
}
