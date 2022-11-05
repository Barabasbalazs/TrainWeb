# TrainWeb

This is a webapp related to Trains lines.
It allows everbody to view current and search for Trainlines stored in a remote MongoDB Cluster.
Certain features are restricted to Users only, like : making a reservation for a certain line.
Users can be of two types: admin, or normal user.
The admin can delete Train lines, and add new Train lines.

## How to run the project

Navigate with one terminal to the frontend folder and one to the backend folder.

All npm packages should be installed in both folders: npm install

After this just run the: npm start command in both folders

Frontend should run after this, but the backend still needs a little configuration related to the DB

## DB access

The backend/utils/constants.js file should contain the pw to my MongoDB Cluster, wich obviously 
I did not push to github.

The password should be set with the value provided by me.

## PreRegistered users for test usage:

Everybody is welcome to register on the site with whatever privilege levels, but for easier usage
there are 2 users preregistered.

### Admin user: Balazs, password: 123

### Normal user: Bibi, password: 123


## Technical stack

Frontend: Reactjs with Bootstrap

Backend: Nodejs with Express

DB: MongoDB via Cluster