import { Router } from "./router.js";
import { infoView, errorView, jobView, jobListView } from "./view.js";

let about = {
  content:
    "Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!",
};

let applicantHelp = { content: "Be sure to he honest in your application!" };

let allJobs = [];

const loadData = () => {
  fetch("/sample-data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allJobs = data.jobs;
      redraw();
    });
};

const route = new Router(errorView);

const jobDetail = (id) => {
  for (let i = 0; i < allJobs.length; i++) {
    if (allJobs[i].id == id) {
      return allJobs[i];
    }
  }
  return null;
};

const getJobs = () => {
  return allJobs;
};

route.get("/", () => {
  const job = getJobs().slice(0, 10);
  jobListView("content", job);
});

route.get("/jobs", (pathInfo) => {
  const id = pathInfo.id;
  const job = jobDetail(id);
  jobView("content", job);
});

route.get("/about", () => {
  infoView("content", about);
});

route.get("/help", () => {
  infoView("content", applicantHelp);
});

function redraw() {
  var active = 0;
  var elements = document.getElementsByTagName("li");
  var curLink = window.location.href.split("#")[1];
  //console.log(elements);
  for (var i = 0; i < document.getElementsByTagName("li").length; i++) {
    var subElements = elements[i].children[0].href.split("#")[1];
    if (subElements === curLink) {
      active = i;
    } else {
      elements[i].className = "";
    }
  }
  elements[active].className = "selected";
  route.route();
}

window.onload = loadData;
window.onhashchange = redraw;
