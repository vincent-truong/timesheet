# timesheet
simple node.js-driven timesheet web app using mongodb
Features include:
-Add tasks to specific calender day (project, task, hours)
-Login and registration (Complete with username/password, duplicate user checks etc)
-Logout feature
-View tasks added per calendar day (albeit all tasks added can be viewed by any user)
-Username session-specific

To Run
1. Clone to computer
2. Install mongodb, and npm if not already 
3. In ../timesheets/ folder create /data directory for mongodb data
4. Still in ../timesheets/ dir, run ".../mongod.exe --dbpath ../timesheets/data" to set path to data folder
4.5 (Optional): Download any mongodb gui tool to view objects
5. In 2nd command line run "mongod.exe"
In command line, run "npm install", then "node app".
7. Navigate to "localhost:3000"
8. Enjoy.
