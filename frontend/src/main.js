import { Router } from "./router.js";
import {
  infoView,
  errorView,
  companyView,
  jobView,
  jobListView,
} from "./view.js";

import * as views from "./view.js";
import { Model } from "./model.js";
//import { Auth } from "./auth.js";

let about = {
  content:
    "Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!",
};

let applicantHelp = { content: "Be sure to he honest in your application!" };

//let Model.DATA.allJobs = [];

const route = new Router(views.errorView);

route.get("/", () => {
  const job = Model.getJobs().slice(0, 10);
  views.jobListView("content", job);
});

route.get("/jobs", (pathInfo) => {
  const id = pathInfo.id;
  const job = Model.jobDetailAll(id);
  views.jobView("content", job);
});

route.get("/companies", (pathInfo) => {
  const id = pathInfo.id;
  const comp = Model.companyDetail(id);
  const compJob = Model.companyJobs(id);
  views.companyView("content", comp, compJob);
});

route.get("/about", () => {
  views.infoView("content", about);
});

route.get("/help", () => {
  views.infoView("content", applicantHelp);
});

route.get("/search", (pathInfo) => {
  const text = pathInfo.id;
  const job = Model.jobSearch(text);
  views.jobSearchView("content", job);
});

function searchFormHandler() {
  const searchform = document.getElementById("nav-main-search");
  searchform.onsubmit = (event) => {
    event.preventDefault();
    const textInput = searchform.elements["search"].value;
    location.href = "/#!/search/" + textInput;
    Model.jobSearch(textInput);
  };
}

const bindings = () => {
  searchFormHandler();
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

window.onhashchange = redraw;
window.onload = Model.loadData;
