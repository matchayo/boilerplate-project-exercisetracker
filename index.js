const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
require('dotenv').config()

const app = express()
const MONGO_URI = 'mongodb://localhost:27017/ExerciseTracker'
// Connect to Mongoose
console.log("MONGO_URI: " + MONGO_URI);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))  
.catch(error => console.error('Error connecting to MongoDB:', error));

const ExercisesRoute = require('./routes/exercises');
const UsersRoute = require('./routes/users');
const LogsRoute = require('./routes/logs');

const ExerciseSchema = require('./schemas/exercises');
// const UsersRoute = require('./routes/users');
// const LogsRoute = require('./routes/logs');

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use("/api/exercises", ExercisesRoute);
app.use("/api/users", UsersRoute);
app.use("/api/logs", LogsRoute);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
