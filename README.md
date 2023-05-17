# Social Network API-18

## Description

 This is a backend API application for a social network app, where users are created and can share thoughts,  react to other users' thought and create a friend list.  The app is built using Express.js,  Mongoose packages, Javascript.

<[Link to walk-through recording]>

## Table of Contents

- [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Test](#test)
  - [Questions](#questions)

## Installation

  To install this application, you will want to clone the repository to your local machine.  In your terminal, navigate to the root of the repository and install dependencies by running "npm i" in your connection.js, update the connectionString.  Be sure to update your mongoose DB name. In your terminal, run npm start to run your local server.
  
## Usage

In Insomnia (or equivilant tool)  you can set up and run the following API routes, be sure the name of the routes in Insomnia are consistent with your route names. Note that this repo is build with only a thought model and user model and the friend schema and reaction schemas are subdocuments in thier respective models.

- GET /api/user: To get all users
- GET /api/user/:id : To get a single user by ID
- POST /api/user: To create a new user
- PUT /api/user/:id : To update a user by ID
- DELETE /api/user/:id : To delete a user by ID
- GET /api/thought: To get all thoughts
- GET /api/thought/:id : To get a single thought by ID
- POST /api/thought: To create a new thought
- PUT /api/thought/:id : To update a thought by ID
- DELETE /api/thought/:id : To delete a thought by ID
- POST /api/thought/:thoughtId/reactions: To add a reaction to a thought
- DELETE /api/thought/:thoughtId/reactions/:reactionId: To remove a reaction from a thought
- POST /api/user/:userId/friends: To add a friend to a user's friend list
- DELETE /api/user/:userId/friends/:friendId: To remove a friend from a user's friend list

## License

  None

## Contributing

  In Insomnia, or equivilant tool, you can set up and run the following API routes. Be sure the name of the routes in Insomnia are consistent with your routes' name. Note that this repo is built with only a thought model and user model and the friend schema and reaction schemas are subdocuments in thier respective models.
  
## Test

 To test the application you'll want to name sure you npm start to run your server  and navigate to Insomnia and start by creating users and thoughts, as no seed data is provided in this repo.
Using the provide routes as a guide, you can set up Insomnia in a similar fashion to run your desired routes.
  
## Questions

  <vihuynhco@gmail.com>

[Link to walk-through recording]: https://drive.google.com/file/d/1nLmuOqXrnZkneF7qqSs2mMY5PoyLmtjS/view
