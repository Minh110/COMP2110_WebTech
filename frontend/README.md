# COMP2110 Bob's Jobs Frontend

This document is to describe each of the file built for the front-end of Bob's Jobs. For the detail of the functions in each JavaScript file, please check the comment in each of them.

Description for each level:

Level 1: Passed all test related to building the HTML and CSS interface. As required from this level, I added a navigation menu and enclosed it in "main-menu" class. Each of the link in the menu display the content as stated from the specification, such as "Be sure to he honest in your application!" for the Applicant Help.

Level 2: All of the requirement related to querying the data from the dummy backend are satisfied. The front end for this level (and the follow levels) is structured as followed:

- main.js: contain the main functions to navigate between pages and initiate content render in those pages.

- view.js: contain the render function for each need in details. For example: jobListView will render the whole array of jobs that the app query from the backend database, and when click on the link embedded in each of the job entries, jobView will be called to render all of the information for that particular job.

- router.js: to help navigate to the right url and extract id info from that link through splitHash(). For example: the url is "/#!/jobs/12", splitHash() will return the id of 12 so that we can use to query the exact job containing that id.

Level 3: At this level, the web application is required to have a search function and build a backend for data storage. Additional JavaScript files are made:

- model.js: instead of querying the data in main.js in level 2, all of the data query operations are now moved to this file. The 2 main data arrays are allJobs and allCompanies to store all of the jobs and companies from the database respectively.

Level 4: User authentication and a login form are required, along with a function for users to submit their application. In this application, only the authentication and login functions are implemented. Another file is made for this level:

- auth.js: authenticate existing users and store user's data for later use
