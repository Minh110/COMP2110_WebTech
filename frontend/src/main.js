import { Router } from "./router.js";
import {
  infoView,
  errorView,
  companyView,
  jobView,
  jobListView,
} from "./view.js";

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

const companyDetail = (id) => {
  for (let i = 0; i < allJobs.length; i++) {
    var detail = allJobs[i].attributes.company.data;
    if (detail.id == id) {
      return detail;
    }
  }
  return null;
};

const companyJobs = (id) => {
  let compJob = [];
  for (let i = 0; i < allJobs.length; i++) {
    var detail = allJobs[i].attributes.company.data;
    if ((detail.id = id)) {
      compJob.push(allJobs[i]);
    }
  }
  return compJob;
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

route.get("/companies", (pathInfo) => {
  const id = pathInfo.id;
  const comp = companyDetail(id);
  const compJob = companyJobs(id);
  companyView("content", comp, compJob);
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

  for (var i = 0; i < 3; i++) {
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
