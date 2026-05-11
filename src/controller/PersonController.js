const Person = require("../models/person");

// Create a single person with the required prototype and persist it with save().
const createAndSavePerson = async (done) => {
  try {
    const person = new Person({
      name: "Alice",
      age: 25,
      favoriteFoods: ["pizza", "salad"],
    });

    const data = await person.save();
    done(null, data);
  } catch (error) {
    done(error);
  }
};

// Create several people with Model.create() using the array passed in from the caller.
const createManyPeople = async (arrayOfPeople, done) => {
  try {
    const data = await Person.create(arrayOfPeople);
    done(null, data);
  } catch (error) {
    done(error);
  }
};

// Find all people with the requested name.
const findPeopleByName = async (name, done) => {
  try {
    const data = await Person.find({ name: name });
    done(null, data);
  } catch (error) {
    done(error);
  }
};

// Find one matching document whose favoriteFoods contains the requested food.
const findOneByFood = async (food, done) => {
  try {
    const data = await Person.findOne({ favoriteFoods: food });
    done(null, data);
  } catch (error) {
    done(error);
  }
};

// Find a single person by _id.
const findPersonById = async (personId, done) => {
  try {
    const data = await Person.findById(personId);
    done(null, data);
  } catch (error) {
    done(error);
  }
};

// Load a person, mutate the favorites list, and persist the change back to MongoDB.
const findEditThenSave = async (personId, done) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push("hamburger");
    person.markModified("favoriteFoods"); // Required if favoriteFoods is Mixed type
    const data = await person.save();
    done(null, data);
  } catch (error) {
    done(error);
  }
};

// Update one person by name and return the updated document.
const findOneAndUpdate = async (personName, done) => {
  try {
    const data = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true },
    );
    done(null, data);
  } catch (error) {
    done(error);
  }
};

// Remove one document by _id.
const findByIdAndRemove = async (personId, done) => {
  try {
    const data = await Person.findByIdAndRemove(personId);
    done(null, data);
  } catch (error) {
    done(error);
  }
};

// Delete every document that matches the name filter.
const removeManyPeople = async (done) => {
  try {
    const data = await Person.remove({ name: "Mary" });
    done(null, data);
  } catch (error) {
    done(error);
  }
};

// Chain query helpers to narrow the result set and trim the returned fields.
const findBurritos = async (done) => {
  try {
    const data = await Person.find({ favoriteFoods: "burritos" })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec();
    done(null, data);
  } catch (error) {
    done(error);
  }
};

module.exports = {
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
};
