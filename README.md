# ImageBoardy McImageBoardFace

Advanced Internet Programming
<i>UTS Spring 2019</i>

#### Table of Contents

- [Video](#video)
- [Before You Run](#before-you-run)
- [How to Run](#how-to-run)
  - [Database (MongoDB)](#database-mongodb)
  - [Rest API](#rest-api)
  - [Front-End](#front-end)
- [Known Issues / How to Fix](#known-issues--how-to-fix)
- [Project Guidelines](#project-guidelines)
  - [Version Control](#version-control)
  - [Coding](#coding)
  - [Project Structure](#project-structure)
- [Major Libraries](#major-libraries)
- [Developers](#developers)

## Video

![](images/video.gif)

## Before you Run

1. Create a `.env` file in the `backend-api` folder
2. Add following keys and their values into the .env file
   ```
   SECRET                  (a random string for jwt token generation)
   MONGO_URI
   TEST_MONGO_URI
   PORT                    (custom port for api)
   AWS_BUCKET_NAME
   AWS_REGION
   AWS_ACCESS_KEY_ID
   AWS_SECRET_ACCESS_KEY
   ```
3. Please ensure that all AWS\_\* keys are correctly filled with a public S3 bucket for image storage as without that the images will not be correctly stored or displayed.

## How to Run

The following commands assume you are already in the project root folder and have already run `npm install` in the frontend and backend-api folders.

### Database (MongoDB)

Optional if running a local database.

```
# create database directory
mkdir database

# run database server
mongod --dbpath ./database
```

### Rest API

_Make sure to run the Database before running the API_

```
cd backend-api
npm start

# call api at link:
# http://localhost:3000
```

### Front-End

```
cd frontend
npm start

# view frontend on browser at link:
# http://localhost:4200
```

## Known Issues / How to Fix

**Failure due to Missing Angular Material Module**

There was an issue all three of us had at different points in time.
When trying to run the program, an error prevented us from doing so claiming that the Angular Material module was missing.

It turned out that we had an incorrect version of Angular Material installed from somewhere other than NPM.
To fix it we reinstalled it from NPM and updated other Angular dependencies to match it and made sure to save the new dependencies.

If this error is encountered (it shouldn't, we fixed it) make sure to update your dependencies.
Run `npm install`, then update the dependencies listed in the error message to the required versions. It should work correctly after this.

## Project Guidelines

#### Version Control

- When developing new feature, always create your own branch. Only merge branch with master when all changes have been completed and tested.
- Make sure to let team members know on the group chat when a branch has been merged and what features have been added.
- Do not commit any files that are auto-generated and do not need to be version controlled (such as node_modules, etc..).
- Make sure commit messages are informative as to what changes were made in the commit.
- Make sure you pull latest changes before merging / pushing your branch.

#### Coding

- Always comment code reasonings and any required knowledge / information to help readers understand the piece of code being described.
- Code blocks should be indented inside the brackets.
- Variable names should start with lowercase characters and follow the camel case convention (ie. newVariableName).
- Class names should start with uppercase and follow camel case convention. Constant variables should be in all capital letters.
- Lines should not be more than 80 characters.
- Variable names should not be single characters (except when these are expressive/meet convention - ie. for loop index = i). They should be descriptive for anyone reading the code to follow.

#### Project Structure

- Application logic should be separated into their own files. For example: routes should be separate from controller logic and separate from database models.

## Major Libraries

**JavaScript Front-end Framework**: Angular<br>
**JavaScript Back-end Framework**: Express.js<br>
**JavaScript Runtime Environment**: Node.js<br>
**Database**: MongoDB

## Developers

12879779 Yat Ho Kwok<br>
12544502 Alex Desmond<br>
12582072 Jaspreet Panesar<br>
