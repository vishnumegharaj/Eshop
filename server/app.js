require('dotenv').config();


const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const app = express();
const port = 8085;

const User = require('./models/users.models');
const authorize = require('./middleware/auth');

// Middleware
app.use(express.json()); // To parse JSON payloads
app.use(express.urlencoded({ extended: true }));

// Configure CORS to allow requests from http://localhost:3000
// Configure CORS to allow requests from http://localhost:3000 and your production URL
app.use(cors({
    origin: '*', // Allow all origins for testing
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.options('*', cors()); // enable pre-flight across-the-board



const productsrouter = require('./router/products.router');
const userrouter = require('./router/users.router');
const addressrouter = require('./router/address.router');

app.use("/api/products", productsrouter);
app.use("/api/auth", userrouter);
// app.use("/api/address", addressrouter); define this later


// Routes
app.get('/', (req, res) => {
    res.send("this is products page");
});



// Connection to database
const db = require('./config/db.config');
db.mongoose.connect(process.env.mongoURL, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000
    
})
    .then(() => {
        console.log("Connected to the database!");
        console.log()
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.listen(port, () => {
    console.log("server listening on port " + port);
});
