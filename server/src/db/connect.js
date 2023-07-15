const mongoose = require("mongoose");
// Middleware
const MONGO_URI = 'mongodb+srv://nutritionassistant:nutritionassistant@cluster0.hbtv07f.mongodb.net/nutritionassistant?retryWrites=true&w=majority'
// Connect to MongoDB using the connection string
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

// mongodb://localhost:27017