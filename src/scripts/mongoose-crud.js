/*
  Demo script for Mongoose CRUD operations required by the checkpoint.
  - Connects to the DB using the project's DB wiring
  - Demonstrates: create & save, createMany, find, findOne, findById,
    find-edit-save, findOneAndUpdate, findByIdAndRemove, remove, and query chain
  Comments are included as requested.

  Each helper accepts a callback-style `done(err, data)` argument so the
  project can be exercised exactly the way the checkpoint expects.
*/

const connectDB = require("../helpers/db-config");
const Person = require("../models/person");

// Helper: create and save a single Person using document.save() with a callback
function createAndSavePerson(done) {
  const alice = new Person({
    name: "Alice",
    age: 25,
    favoriteFoods: ["pizza", "salad"],
  });

  // save() returns a promise in current Mongoose versions, so we forward the result to the callback.
  alice
    .save()
    .then((data) => {
      console.log("createAndSavePerson result:", data);
      done(null, data);
    })
    .catch((err) => done(err));
}

// Helper: create many people using Model.create()
function createManyPeople(arrayOfPeople, done) {
  // Model.create() also resolves a promise, which we bridge back to done(err, data).
  Person.create(arrayOfPeople)
    .then((people) => {
      console.log("createManyPeople result count:", people.length);
      done(null, people);
    })
    .catch((err) => done(err));
}

// Find all people with given name using Model.find()
function findPeopleByName(personName, done) {
  Person.find({ name: personName })
    .then((docs) => {
      console.log(`findPeopleByName (${personName}) found:`, docs.length);
      done(null, docs);
    })
    .catch((err) => done(err));
}

// Find one person by a favorite food using Model.findOne()
function findOneByFood(food, done) {
  Person.findOne({ favoriteFoods: food })
    .then((doc) => {
      console.log(`findOneByFood (${food}) result:`, doc ? doc.name : null);
      done(null, doc);
    })
    .catch((err) => done(err));
}

// Find a person by _id using Model.findById()
function findPersonById(personId, done) {
  Person.findById(personId)
    .then((doc) => {
      console.log("findPersonById result:", doc ? doc.name : null);
      done(null, doc);
    })
    .catch((err) => done(err));
}

// Find by id, add 'hamburger' to favoriteFoods, then save()
function findEditThenSave(personId, done) {
  Person.findById(personId)
    .then((person) => {
      if (!person) throw new Error("Person not found");
      person.favoriteFoods.push("hamburger");
      return person.save();
    })
    .then((updatedPerson) => {
      console.log(
        "findEditThenSave updated favoriteFoods:",
        updatedPerson.favoriteFoods,
      );
      done(null, updatedPerson);
    })
    .catch((err) => done(err));
}

// Find one person by name and set age to 20 using findOneAndUpdate()
function findAndUpdate(personName, done) {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { returnDocument: "after" },
  )
    .then((updatedDoc) => {
      console.log("findAndUpdate result:", updatedDoc);
      done(null, updatedDoc);
    })
    .catch((err) => done(err));
}

// Remove a person by _id using findByIdAndRemove()
function removeById(personId, done) {
  Person.findByIdAndDelete(personId)
    .then((removedDoc) => {
      console.log("removeById removed:", removedDoc ? removedDoc._id : null);
      done(null, removedDoc);
    })
    .catch((err) => done(err));
}

// Remove many documents where name is 'Mary' using Model.remove()
function removeManyPeople(done) {
  // deleteMany() is the modern equivalent of the older remove() checkpoint wording.
  Person.deleteMany({ name: "Mary" })
    .then((result) => {
      console.log("removeManyPeople result:", result);
      done(null, result);
    })
    .catch((err) => done(err));
}

// Chain query helpers: find who likes 'burritos', sort, limit, hide age
function queryChain(done) {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age") // hide age field
    .exec()
    .then((data) => {
      console.log("queryChain results:", data.length);
      done(null, data);
    })
    .catch((err) => done(err));
}

// Demo runner: executes the required operations in sequence.
async function runDemo() {
  try {
    // Ensure DB connection (connectDB throws on failure)
    await connectDB();

    // 1) create & save a person (callback style)
    await new Promise((res, rej) =>
      createAndSavePerson((e, d) => (e ? rej(e) : res(d))),
    );

    // 2) create many people
    const people = [
      { name: "John", age: 30, favoriteFoods: ["burritos", "tacos"] },
      { name: "Mary", age: 22, favoriteFoods: ["salad"] },
      { name: "Mary", age: 28, favoriteFoods: ["pasta"] },
    ];
    const many = await new Promise((res, rej) =>
      createManyPeople(people, (e, d) => (e ? rej(e) : res(d))),
    );

    // 3) find by name
    await new Promise((res, rej) =>
      findPeopleByName("Mary", (e, d) => (e ? rej(e) : res(d))),
    );

    // 4) find one by favorite food
    await new Promise((res, rej) =>
      findOneByFood("burritos", (e, d) => (e ? rej(e) : res(d))),
    );

    // 5) find by id (use one of the created docs)
    const firstId = many[0]._id;
    await new Promise((res, rej) =>
      findPersonById(firstId, (e, d) => (e ? rej(e) : res(d))),
    );

    // 6) find, edit then save
    await new Promise((res, rej) =>
      findEditThenSave(firstId, (e, d) => (e ? rej(e) : res(d))),
    );

    // 7) findOneAndUpdate (set age to 20)
    await new Promise((res, rej) =>
      findAndUpdate("John", (e, d) => (e ? rej(e) : res(d))),
    );

    // 8) remove by id
    await new Promise((res, rej) =>
      removeById(firstId, (e, d) => (e ? rej(e) : res(d))),
    );

    // 9) remove many named 'Mary'
    await new Promise((res, rej) =>
      removeManyPeople((e, d) => (e ? rej(e) : res(d))),
    );

    // 10) chain query helpers
    await new Promise((res, rej) =>
      queryChain((e, d) => (e ? rej(e) : res(d))),
    );

    console.log("Demo finished successfully");
    process.exit(0);
  } catch (err) {
    console.error("Demo error:", err);
    process.exit(1);
  }
}

// If this script is run directly, execute the demo
if (require.main === module) {
  runDemo();
}

module.exports = {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};
