import { Auth } from "./auth.js";
export { Model };
import * as views from "./view.js";
import { redraw } from "./main.js";

const Model = {
  jobs_url: "http://localhost:1337/api/jobs",
  companies_url: "http://localhost:1337/api/companies?populate=jobs",
  jobs_url_date: "http://localhost:1337/api/jobs?sort[0]=publishedAt%3Adesc",

  // Model will hold the data stored in the model

  DATA: {
    allJobs: [],
    allCompanies: [],
  },

  // single job data
  jobData: null,
  compData: null,
  searchedJob: [],

  // fetch job data from backend

  loadData: () => {
    fetch(Model.jobs_url_date)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Model.DATA.allJobs = data.data;
        console.log("jobs loaded:", Model.DATA.allJobs);
        const event = new CustomEvent("modelUpdated");
        window.dispatchEvent(event);
        redraw();
      });
    fetch(Model.companies_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Model.DATA.allCompanies = data.data;
        console.log("companies loaded:", Model.DATA.allCompanies);
        const event = new CustomEvent("modelUpdated");
        window.dispatchEvent(event);
        redraw();
      });
  },

  // returns all jobs
  getJobs: () => {
    return Model.DATA.allJobs;
  },

  // returns a job by id
  jobDetail: (id) => {
    for (let i = 0; i < Model.DATA.allJobs.length; i++) {
      if (Model.DATA.allJobs[i].id == id) {
        return Model.DATA.allJobs[i];
      }
    }
    return null;
  },

  // returns a job by id with relational data
  jobDetailAll: (id) => {
    let filter = "?populate=company&filters[id][$eq]=";
    let url_str = Model.jobs_url + filter + id;
    fetch(url_str)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("getUnit: .then unit before:", Model.unitData)
        Model.jobData = data.data[0];
        // console.log("getUnit: .then unit after:", Model.unitData)
        views.jobView("content", Model.jobData);
        const event = new CustomEvent("modelUpdated");
        window.dispatchEvent(event);
      });
  },

  jobSearch: (text) => {
    let filter = "?populate=company&filters[description][$contains]=";
    let url_str = Model.jobs_url + filter + text;
    fetch(url_str)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("getUnit: .then unit before:", Model.unitData)
        Model.searchedJob = data.data;
        // console.log("getUnit: .then unit after:", Model.unitData)
        views.jobSearchView("content", Model.searchedJob);
        const event = new CustomEvent("modelUpdated");
        window.dispatchEvent(event);
      });
  },

  companyDetail: (id) => {
    for (let i = 0; i < Model.DATA.allCompanies.length; i++) {
      if (Model.DATA.allCompanies[i].id == id) {
        return Model.DATA.allCompanies[i];
      }
    }
    return null;
  },

  companyJobs: (id) => {
    //let compJob = [];
    for (let i = 0; i < Model.DATA.allCompanies.length; i++) {
      if (Model.DATA.allCompanies[i].id == id) {
        return Model.DATA.allCompanies[i].attributes.jobs.data;
      }
    }
    return null;
  },

  companyDetailAll: (id) => {
    let filter = "?populate=jobs&filters[id][$eq]=";
    let url_str = Model.companies_url + filter + id;
    fetch(url_str)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("getUnit: .then unit before:", Model.unitData)
        Model.compData = data.data[0];
        // console.log("getUnit: .then unit after:", Model.unitData)
        views.companyView("content", Model.compData);
        const event = new CustomEvent("modelUpdated");
        window.dispatchEvent(event);
      });
  },

  // addUnit - add a new unit by submitting a request to the server API
  //  formdata is a FormData object containing all fields in the unt object
  // when the request is resolved, creates an "unitAdded" event
};
