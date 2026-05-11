#!/usr/bin/env node
/*
  run-task.js
  Usage:
    node src/scripts/run-task.js list
    node src/scripts/run-task.js createAndSavePerson
    node src/scripts/run-task.js createManyPeople '[{"name":"X","age":30}]'
    node src/scripts/run-task.js findPeopleByName "Mary"
    node src/scripts/run-task.js findOneByFood "burritos"
    node src/scripts/run-task.js findPersonById <id>

  The script connects to the DB and runs a single helper from mongoose-crud.
*/

const connectDB = require("../helpers/db-config");
const tasks = require("./mongoose-crud");

const available = Object.keys(tasks);

async function run() {
  const argv = process.argv.slice(2);
  const cmd = argv[0];

  if (!cmd || cmd === "list") {
    console.log("Available tasks:");
    available.forEach((t) => console.log(" -", t));
    process.exit(0);
  }

  if (!available.includes(cmd)) {
    console.error(`Unknown task: ${cmd}`);
    console.log("Run with `list` to see available tasks");
    process.exit(1);
  }

  // Connect to DB first
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }

  // Prepare argument: parse JSON if looks like JSON, otherwise pass raw
  const rawArg = argv[1];
  let arg;
  if (rawArg) {
    try {
      arg = JSON.parse(rawArg);
    } catch (e) {
      arg = rawArg;
    }
  }

  // Wrap each helper which uses callback-style (done) into Promise
  const fn = tasks[cmd];
  if (typeof fn !== "function") {
    console.error("Task not a function:", cmd);
    process.exit(1);
  }

  try {
    const result = await new Promise((res, rej) => {
      // Call with or without arg depending on function arity
      if (fn.length === 1) {
        // function(done)
        fn((err, data) => (err ? rej(err) : res(data)));
      } else if (fn.length === 2) {
        // function(arg, done)
        fn(arg, (err, data) => (err ? rej(err) : res(data)));
      } else {
        // fallback: call and resolve
        const maybe = fn(arg);
        // if returns promise
        if (maybe && typeof maybe.then === "function")
          maybe.then(res).catch(rej);
        else res(maybe);
      }
    });

    console.log("Task finished. Result:", result);
    process.exit(0);
  } catch (err) {
    console.error("Task error:", err);
    process.exit(1);
  }
}

run();
