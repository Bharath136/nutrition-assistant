const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    proteins: { type: Number, required: true },
    fats: { type: Number, required: true },
});

const suggestionSchema = new mongoose.Schema({
    userId: {type:String,required: true},
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    suggestion: { type: String, required: true },
    timing: { type: String, required: true },
    foods: [{
      name: { type: String, required: true },
      grams: { type: String, required: true }
    }],
    calorieIntake: { type: Number, required: true },
    weightGain: { type: Number, required: true },
    date: {type: Date, default: new Date()}
  });
  

const Users = mongoose.model('User', userSchema)
const Food = mongoose.model('Food', foodSchema)
const Suggestion = mongoose.model('Suggestion',suggestionSchema)
module.exports = { Users, Food, Suggestion }

