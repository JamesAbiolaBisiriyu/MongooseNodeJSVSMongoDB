require("dotenv").config();
const http = require("http");
const app = require("./app");
const httpServer = http.createServer(app);
const connectDB = require("./helpers/db-config");
const { PORT } = require("./lib");
const Person = require("./models/person");
const {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findOneAndUpdate,
  findByIdAndRemove,
  removeManyPeople,
  findBurritos,
} = require("./controller/PersonController");

const startServer = async () => {
  try {
    await connectDB(); // Wait for MongoDB connection first

    // Uncomment exactly one block below to run a single checkpoint task.

    // 0. Create a person with this prototype
    // const person = {
    //   name: "Alice",
    //   age: 25,
    //   favoriteFoods: ["pizza", "salad"],
    // };
    // await new Promise((resolve, reject) => {
    //   // The callback wrapper keeps the controller API consistent with the checkpoint tests.
    //   createAndSavePerson((err, data) => {
    //     if (err) reject(err);
    //     console.log("Created person:", data);
    //     resolve();
    //   });
    // });

    // 1. Create many people
    // const arrayOfPeople = [
    //   { name: "Mary", age: 21, favoriteFoods: ["burrito", "salad"] },
    //   { name: "Wale", age: 30, favoriteFoods: ["pizza", "burger"] },
    //   { name: "Sarah", age: 19, favoriteFoods: ["rice", "beans"] },
    // ];
    // await new Promise((resolve, reject) => {
    //   // Each helper follows a Node-style done(err, data) callback.
    //   createManyPeople(arrayOfPeople, (err, data) => {
    //     if (err) reject(err);
    //     console.log("Created people:", data);
    //     resolve();
    //   });
    // });

    // 2. Find all people by name
    // await new Promise((resolve, reject) => {
    //   findPeopleByName("Mary", (err, data) => {
    //     if (err) reject(err);
    //     console.log("Found by name:", data);
    //     resolve();
    //   });
    // });

    // 3. Find one person by favorite food
    // await new Promise((resolve, reject) => {
    //   findOneByFood("burrito", (err, data) => {
    //     if (err) reject(err);
    //     console.log("Found by food:", data);
    //     resolve();
    //   });
    // });

    // 4. Find person by ID
    // await new Promise((resolve, reject) => {
    //   findPersonById("6a01c34608db7fcbb67e960c", (err, data) => {
    //     if (err) reject(err);
    //     console.log("Found by ID:", data);
    //     resolve();
    //   });
    // });

    // 5. Find, edit, and save (add hamburger to favorites)
    // await new Promise((resolve, reject) => {
    //   findEditThenSave("6a01c34608db7fcbb67e960c", (err, data) => {
    //     if (err) reject(err);
    //     console.log("Updated person:", data);
    //     resolve();
    //   });
    // });

    // 6. Find one and update (set age to 20 by name)
    // await new Promise((resolve, reject) => {
    //   findOneAndUpdate("Mary", (err, data) => {
    //     if (err) reject(err);
    //     console.log("Updated person:", data);
    //     resolve();
    //   });
    // });

    // 7. Delete by ID
    // await new Promise((resolve, reject) => {
    //   findByIdAndRemove("PERSON_ID_HERE", (err, data) => {
    //     if (err) reject(err);
    //     console.log("Deleted person:", data);
    //     resolve();
    //   });
    // });

    // 8. Delete all people named "Mary"
    // await new Promise((resolve, reject) => {
    //   removeManyPeople((err, data) => {
    //     if (err) reject(err);
    //     console.log("Removed people:", data);
    //     resolve();
    //   });
    // });

    // 9. Find people who like burritos, sort by name, limit to 2, hide age
    // await new Promise((resolve, reject) => {
    //   findBurritos((err, data) => {
    //     if (err) reject(err);
    //     console.log("Burritos lovers:", data);
    //     resolve();
    //   });
    // });

    httpServer.listen(PORT, () => {
      console.log(`server is live on port : ${PORT}`);
    });
  } catch (error) {
    ``;
    console.error("Failed to connect to database:", error);
    process.exit(1); // Exit if database connection fails
  }
};
startServer();
