/* COMP 2110 - Quang Minh Pham - 45546339*/

import { Auth } from "./auth.js";
export { Model };
import * as views from "./view.js";
import { redraw } from "./main.js";

const Model = {
  jobs_url: "http://localhost:1337/api/jobs",
  companies_url: "http://localhost:1337/api/companies?populate=jobs", //company url with relational attributes
  jobs_url_date: "http://localhost:1337/api/jobs?sort[0]=publishedAt%3Adesc", //job url but with sorted dates

  // Model will hold the data stored in the model

  DATA: {
    allJobs: [],
    allCompanies: [],
  },

  // single job and company data, along with the job being searched (which containing the searching text)
  jobData: null,
  compData: null,
  searchedJob: [],

  // fetch job and company data from backend
  loadData: () => {
    //fetching job data
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
    //fetching company data
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

  // returns a job by id but no relational data
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
        Model.jobData = data.data[0];
        views.jobView("content", Model.jobData);
        const event = new CustomEvent("modelUpdated");
        window.dispatchEvent(event);
      });
  },

  jobSearch: (text) => {
    //return jobs that contain the searching text
    let filter = "?populate=company&filters[description][$contains]=";
    let url_str = Model.jobs_url + filter + text;
    fetch(url_str)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Model.searchedJob = data.data;
        views.jobSearchView("content", Model.searchedJob);
        const event = new CustomEvent("modelUpdated");
        window.dispatchEvent(event);
      });
  },

  companyDetail: (id) => {
    //return the individual company details
    for (let i = 0; i < Model.DATA.allCompanies.length; i++) {
      if (Model.DATA.allCompanies[i].id == id) {
        return Model.DATA.allCompanies[i];
      }
    }
    return null;
  },

  companyJobs: (id) => {
    //return published jobs of the queried company
    for (let i = 0; i < Model.DATA.allCompanies.length; i++) {
      if (Model.DATA.allCompanies[i].id == id) {
        return Model.DATA.allCompanies[i].attributes.jobs.data;
      }
    }
    return null;
  },
};
