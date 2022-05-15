# COMP2110 Bob's Jobs Frontend

This document is to describe each of the files built for the front-end of Bob's Jobs. For the detail of the functions in each JavaScript file, please check the comment in each of them.

Description for each level:

Level 1: Passed all tests related to building the HTML and CSS interface. As required from this level, I added a navigation menu and enclosed it in the "main-menu" class. Each of the links in the menu displays the content as stated in the specification, such as "Be sure to be honest in your application!" for the Applicant Help.

Level 2: All of the requirements related to querying the data from the dummy backend are satisfied. The front end for this level (and the following levels) is structured as followed:

- main.js: contain the main functions to navigate between pages and initiate content render on those pages.

- view.js: contain the render function for each need in detail. For example, jobListView will render the whole array of jobs that the app queries from the backend database, and when clicking on the link embedded in each of the job entries, jobView will be called to render all of the information for that particular job.

- router.js: to help navigate to the right URL and extract id info from that link through splitHash(). For example, if the URL is "/#!/jobs/12", splitHash() will return the id of 12 so that we can use it to query the exact job containing that id.

Level 3: At this level, the web application is required to have a search function and build a backend for data storage. Additional JavaScript files are made:

- model.js: instead of querying the data in main.js in level 2, all of the data query operations are now moved to this file. The 2 main data arrays are allJobs and allCompanies to store all of the jobs and companies from the database respectively.

Level 4: User authentication and a login form are required, along with a function for users to submit their job applications. In this web application, only the authentication and login functions are implemented. Another file is made for this level:

- auth.js: authenticate existing users and store users' data for later use, while also taking the task of rendering the login form depending on whether the user exists or not.
