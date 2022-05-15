/* COMP 2110 - main.js - Quang Minh Pham - 45546339*/

import { Router } from "./router.js";
import * as views from "./view.js";
import { Model } from "./model.js";
import { Auth } from "./auth.js";

let about = {
  //text display for About page
  content:
    "Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!",
};

let applicantHelp = { content: "Be sure to he honest in your application!" }; //text display for Applicant Help page

const route = new Router(views.errorView);

route.get("/", () => {
  //navigate to home screen
  const job = Model.getJobs().slice(0, 10);
  views.jobListView("content", job);
});

route.get("/jobs", (pathInfo) => {
  //navigate to the particular job being clicked on
  const id = pathInfo.id;
  const job = Model.jobDetailAll(id);
  views.jobView("content", job);
});

route.get("/companies", (pathInfo) => {
  //navigate to the particular company being clicked on
  const id = pathInfo.id;
  const comp = Model.companyDetail(id);
  const compJob = Model.companyJobs(id);
  views.companyView("content", comp, compJob);
});

route.get("/about", () => {
  //navigate to about page
  views.infoView("content", about);
});

route.get("/help", () => {
  //navigate to help page
  views.infoView("content", applicantHelp);
});

route.get("/search", (pathInfo) => {
  //navigate to search page with querying text
  const text = pathInfo.id;
  const job = Model.jobSearch(text);
  views.jobSearchView("content", job);
});

//handling submitted text from the search bar for query
function searchFormHandler() {
  const searchform = document.getElementById("nav-main-search"); //get the search bar component
  searchform.onsubmit = (event) => {
    event.preventDefault();
    const textInput = searchform.elements["search"].value;
    location.href = "/#!/search/" + textInput; //change the current url link
    Model.jobSearch(textInput); //display the job
  };
}

//handling submitted data from the log-in form
function loginFormHandler() {
  if (!Auth.getUser()) {
    // install login handler
    const loginform = document.getElementById("login-form");
    loginform.onsubmit = (event) => {
      event.preventDefault();
      const username = loginform.elements["username"].value;
      const password = loginform.elements["password"].value;
      const authInfo = {
        identifier: username,
        password: password,
      };
      //send authInfo to backend for user authentication
      Auth.login(authInfo);
    };
  }
}

//handling render the login form after logout
function logoutFormHandler() {
  if (Auth.getUser()) {
    //if the user is logged in, proceed
    const logoutform = document.getElementById("logoutbutton");
    if (logoutform) {
      logoutform.onclick = (event) => {
        event.preventDefault();
        const template = Handlebars.compile(`
            <form id="login-form">
            <label for="username"> Username: </label>
            <input name="username" />
            <label for="password"> Password: </label>
            <input name="password" type="password" autocomplete="on" />
            <input
              id="loginbutton"
              type="submit"
              class="search-button"
              aria-label="Search"
              value="Log in"
            />
            </form>
            `);
        const target = document.getElementsByClassName("header-auth")[0];
        target.innerHTML = template(template);
        Auth.userData = null;
      };
    }
  }
}

const bindings = () => {
  //calling each form in the event of being used
  searchFormHandler();
  loginFormHandler();
  logoutFormHandler();
};

export function redraw() {
  route.route();
  bindings();
  var active = 0;
  var elements = document.getElementsByTagName("li");
  var curLink = window.location.href.split("#")[1];

  for (var i = 0; i < 3; i++) {
    var subElements = elements[i].children[0].href.split("#")[1];
    if (subElements === curLink) {
      active = i;
    } else {
      elements[i].className = "";
    }
  }

  elements[active].className = "selected";
}

window.addEventListener("userLogin", redraw);
window.onhashchange = redraw;
window.onload = Model.loadData;
