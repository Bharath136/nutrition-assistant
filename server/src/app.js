const express = require("express");
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./db/connect');
const models = require("./models/schema");

const port = process.env.PORT || 5100;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// User registration
app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const user = await models.Users.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new models.Users({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });
        const userCreated = await newUser.save();
        console.log(userCreated, 'user created');
        return res.status(201).send('Successfully registered');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
});

// User login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await models.Users.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const jwtToken = jwt.sign({ userId: user._id }, 'mysecretkey2');
    res.json({ user, jwtToken });
});

// Fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await models.Customer.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
});


// Define the nutrition schema
const suggestNutrition = (age, height, weight) => {
    if (age >= 0 && age <= 12) {
        // Children (0-12 years)
        if (weight < height - 100) {
            const calorieIntake = 25 * weight;
            const weightGain = height - weight;
            return {
                suggestion: "Increase calorie intake with a balanced diet including fruits, vegetables, whole grains, lean proteins, and dairy or dairy alternatives.",
                timing: "3 meals and 2 snacks",
                foods: [
                    { name: "Bananas", grams: "100g" },
                    { name: "Carrots", grams: "50g" },
                    { name: "Oats", grams: "30g" },
                    { name: "Chicken breast", grams: "100g" },
                    { name: "Greek yogurt", grams: "150g" },
                ],
                calorieIntake,
                weightGain,
                carbohydrateNeeds: "130-210g",
                proteinNeeds: "13-34g",
                fatPercentage: "30-40%",
            };
        } else {
            const calorieIntake = 20 * weight;
            const weightGain = 0;
            return {
                suggestion: "Maintain a balanced diet with appropriate portion sizes, including fruits, vegetables, whole grains, lean proteins, and dairy or dairy alternatives.",
                timing: "3 meals and 2 snacks",
                foods: [
                    { name: "Apples", grams: "100g" },
                    { name: "Broccoli", grams: "100g" },
                    { name: "Brown rice", grams: "50g" },
                    { name: "Fish", grams: "100g" },
                    { name: "Milk", grams: "200ml" },
                ],
                calorieIntake,
                weightGain,
                carbohydrateNeeds: "130-210g",
                proteinNeeds: "13-34g",
                fatPercentage: "30-40%",
            };
        }
    } else if (age >= 13 && age <= 18) {
        // Teens (13-18 years)
        if (weight < height - 100) {
            const calorieIntake = 20 * weight;
            const weightGain = height - weight;
            return {
                suggestion: "Increase calorie intake to support growth and development. Focus on nutrient-dense foods and regular meals.",
                timing: "3 meals and 2-3 snacks",
                foods: [
                    { name: "Berries", grams: "100g" },
                    { name: "Spinach", grams: "100g" },
                    { name: "Quinoa", grams: "50g" },
                    { name: "Turkey", grams: "100g" },
                    { name: "Cottage cheese", grams: "150g" },
                ],
                calorieIntake,
                weightGain,
                carbohydrateNeeds: "130-210g",
                proteinNeeds: "45-75g",
                fatPercentage: "25-35%",
            };
        } else {
            const calorieIntake = 25 * weight;
            const weightGain = 0;
            return {
                suggestion: "Maintain a balanced diet with appropriate portion sizes to support growth and development. Include fruits, vegetables, whole grains, lean proteins, and dairy or dairy alternatives.",
                timing: "3 meals and 2-3 snacks",
                foods: [
                    { name: "Oranges", grams: "100g" },
                    { name: "Bell peppers", grams: "100g" },
                    { name: "Whole wheat bread", grams: "50g" },
                    { name: "Eggs", grams: "2 large" },
                    { name: "Cheese", grams: "30g" },
                ],
                calorieIntake,
                weightGain,
                carbohydrateNeeds: "130-210g",
                proteinNeeds: "45-75g",
                fatPercentage: "25-35%",
            };
        }
    } else {
        // Adults (18+ years)
        if (weight < height - 100) {
            const calorieIntake = 30 * weight;
            const weightGain = height - weight;
            return {
                suggestion: "Increase calorie intake with a balanced diet including fruits, vegetables, whole grains, lean proteins, and healthy fats. Incorporate regular exercise.",
                timing: "3 meals and 2 snacks",
                foods: [
                    { name: "Avocados", grams: "50g" },
                    { name: "Kale", grams: "100g" },
                    { name: "Quinoa", grams: "50g" },
                    { name: "Salmon", grams: "100g" },
                    { name: "Olive oil", grams: "15ml" },
                ],
                calorieIntake,
                weightGain,
                carbohydrateNeeds: "130-210g",
                proteinNeeds: "46-56g",
                fatPercentage: "20-35%",
            };
        } else if (weight > height - 100) {
            const calorieIntake = 25 * weight;
            const weightGain = 0;
            return {
                suggestion: "Focus on portion control, balanced diet, and regular exercise to support weight loss and maintain a healthy weight.",
                timing: "3 meals and 2 snacks",
                foods: [
                    { name: "Grapefruits", grams: "150g" },
                    { name: "Cauliflower", grams: "100g" },
                    { name: "Lentils", grams: "100g" },
                    { name: "Skinless chicken breast", grams: "100g" },
                    { name: "Almonds", grams: "30g" },
                ],
                calorieIntake,
                weightGain,
                carbohydrateNeeds: "130-210g",
                proteinNeeds: "46-56g",
                fatPercentage: "20-35%",
            };
        } else {
            const calorieIntake = 25 * weight;
            const weightGain = 0;
            return {
                suggestion: "Maintain a balanced diet with appropriate portion sizes, including fruits, vegetables, whole grains, lean proteins, and healthy fats. Incorporate regular exercise.",
                timing: "3 meals and 2 snacks",
                foods: [
                    { name: "Strawberries", grams: "100g" },
                    { name: "Asparagus", grams: "100g" },
                    { name: "Quinoa", grams: "50g" },
                    { name: "Lean beef", grams: "100g" },
                    { name: "Greek yogurt", grams: "150g" },
                ],
                calorieIntake,
                weightGain,
                carbohydrateNeeds: "130-210g",
                proteinNeeds: "46-56g",
                fatPercentage: "20-35%",
            };
        }
    }
};
// API endpoint for suggesting nutrition
app.get('/suggest-nutrition', (req, res) => {
    const { age, height, weight } = req.query;

    // Convert query parameters to numbers
    const parsedAge = parseInt(age);
    const parsedHeight = parseInt(height);
    const parsedWeight = parseInt(weight);

    // Validate the inputs
    if (isNaN(parsedAge) || isNaN(parsedHeight) || isNaN(parsedWeight)) {
        return res.status(400).json({ error: 'Invalid input. Age, height, and weight must be numbers.' });
    }

    // Call the suggestNutrition function
    const suggestedNutrition = suggestNutrition(parsedAge, parsedHeight, parsedWeight);

    // Return the suggested nutrition as a response
    res.json(suggestedNutrition);
});

// Create a new meal
app.post('/api/meals', (req, res) => {
    const { userId, foodIds, date } = req.body;
    const meal = new models.Meal({
        user: userId,
        foods: foodIds,
        date: date
    });
    meal.save()
        .then(savedMeal => {
            res.json({ message: 'Meal saved successfully', meal: savedMeal });
        })
        .catch(error => {
            res.status(500).json({ error: 'Failed to save meal' });
        });
});


// Define the API endpoint for saving suggestions
app.post('/suggestions', async (req, res) => {
    try {
        //   // Extract the suggestion data from the request body
        const { userId, age, height, weight, suggestions } = req.body;
        const {  suggestion, timing, foods, calorieIntake, weightGain } = suggestions

        console.log(suggestions)
        // Create a new suggestion instance
        const newSuggestion = new models.Suggestion({
            userId,
            age,
            height,
            weight,
            suggestion,
            timing,
            foods,
            calorieIntake,
            weightGain,
            date:new Date()
        });

        // Save the suggestion to the database
        const savedSuggestion = await newSuggestion.save();

        res.status(201).json(savedSuggestion);
    } catch (error) {
        console.error('Failed to save suggestion:', error);
        res.status(500).json({ message: 'Failed to save suggestion' });
    }
});


// Define the API endpoint for retrieving suggestions
app.get('/suggestions', async (req, res) => {
    try {
        // Retrieve all suggestions from the database
        const suggestions = await models.Suggestion.find();

        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        res.status(500).json({ message: 'Failed to fetch suggestions' });
    }
});



// Connect to MongoDB and start the server
// mongoose
//     .connect('mongodb+srv://nutritionassistant:nutritionassistant@cluster0.hbtv07f.mongodb.net/nutritionassistant?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Server running at http://localhost:${port}`);
//         });
//     })
//     .catch(error => {
//         console.log(error);
//         process.exit(1);
//     });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

module.exports = app;
