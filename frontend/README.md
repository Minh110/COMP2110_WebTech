# COMP2110 Bob's Jobs Frontend

This project implements the front-end code for Bob's Jobs.

Description for each level:

Level 1: Passed all test related to building the HTML and CSS interface. As required from this level, I added a navigation menu and enclosed it in "main-menu" class. Each of the link in the menu display the content as stated from the specification, such as "Be sure to he honest in your application!" for the Applicant Help.

Level 2: All of the requirement related to querying the data from the dummy backend are satisfied. The front end for this level (and the follow levels) is structured as followed:
main.js: contain the main functions to navigate between pages and initiate content render in those pages.
view.js: contain the render function for each need in details. For example: jobListView will render the whole array of jobs that the app query from the backend database, and when click on the link embedded in each of the job entries,
