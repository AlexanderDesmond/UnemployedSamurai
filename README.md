# UnemployedSamurai

Advanced Internet Programming
<i>UTS Spring 2019</i>


## How to Run
The following commands assume you are already in the project root folder.
<b>Might not work on Mac; in progress to fix!</b>
### Front-End (Angular)
```
cd Assignment3
npm start

# view frontend on browser at link:
# http://localhost:4200
```

*Make sure to run the Database before running the API*

### Rest API (Expressjs)
```
cd backend-api
npm start

# call api at link:
# http://localhost:3000
```

### Database (MongoDB)
```
# create database directory
mkdir database

# run database server
mongod --dbpath ./database
```


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


## Libraries

**Front-end Framework**: Angular<br>
**Back-end Framework**: Expressjs<br>
**Database**: MongoDB


## Developers

12879779 Yat Ho Kwok<br>
12544502 Alex Desmond<br>
12582072 Jaspreet Panesar<br>

