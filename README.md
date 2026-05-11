# JAMES ABIOLA BISIRIYU
# Server Project

This project is a small Node.js and Express application backed by MongoDB and Mongoose. It includes a simple HTTP API plus a Mongoose CRUD demo for checkpoint-style database exercises.

## What is included

- A minimal Express app with `GET /` and `GET /users` routes.
- A reusable MongoDB connection helper.
- A `Person` Mongoose model with the required checkpoint prototype.
- A controller with create, read, update, and delete helpers.
- A standalone Mongoose demo script that runs one operation at a time.

## Project Structure

```text
server.js
src/
  app.js
  server.js
  controller/
    PersonController.js
  helpers/
    db-config.js
  lib/
    constants.js
    index.js
  models/
    person.js
  scripts/
    mongoose-crud.js
    run-task.js
```

## Requirements

- Node.js
- MongoDB Atlas or another MongoDB instance
- `npm`

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a private `.env` file in the project root.

3. Add your database connection string and optional port:

```env
CONN_STR="your_mongodb_connection_string"
PORT=3000
```

> The current code reads the database URI from `CONN_STR`.

## Running the Server

Start the app with:

```bash
npm start
```

The server loads the MongoDB connection first and then starts listening on the configured port.

## Available Routes

- `GET /` returns a basic JSON health-style message.
- `GET /users` returns a small sample list of users.

## Mongoose CRUD Demo

The checkpoint-style database helpers live in `src/controller/PersonController.js`, and a more complete demo runner lives in `src/scripts/mongoose-crud.js`.

The demo file shows how to:

- create one person with `save()`
- create many people with `Model.create()`
- find people by name with `find()`
- find one person by favorite food with `findOne()`
- find a person by `_id` with `findById()`
- edit a person and save the change
- update a person with `findOneAndUpdate()`
- delete a person by `_id`
- delete many people with a name filter
- chain query helpers with `sort()`, `limit()`, `select()`, and `exec()`

## Running Individual Tasks

The `src/scripts/run-task.js` utility can run one helper at a time:

```bash
node src/scripts/run-task.js list
node src/scripts/run-task.js createAndSavePerson
node src/scripts/run-task.js createManyPeople '[{"name":"John","age":30,"favoriteFoods":["burritos"]}]'
node src/scripts/run-task.js findPeopleByName "Mary"
node src/scripts/run-task.js findOneByFood "burritos"
node src/scripts/run-task.js findPersonById "<personId>"
```

## Notes for the Checkpoint

- The project uses callback-style wrappers so each operation matches the checkpoint expectations.
- The `Person` schema uses basic Mongoose schema types and a required `name` field.
- The source files contain descriptive comments to make the intent of each helper easy to follow.

## Scripts

- `npm start` runs the server.
- `node src/scripts/run-task.js list` shows the available database tasks.

## Troubleshooting

- If the server fails to connect, confirm that `CONN_STR` is present in `.env`.
- If MongoDB refuses the connection, check your Atlas network access and credentials.
- If you want to test a specific database helper, run only one commented block in `src/server.js` or use `src/scripts/run-task.js`.
