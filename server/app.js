require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8085;

// Import database configuration
const db = require('./config/db.config');

// Import routers
const productsrouter = require('./router/products.router');
const userrouter = require('./router/users.router');
const cartrouter = require('./router/cart.router');

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(
    cors({
        origin: '*', // Change this in production for security
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.options('*', cors()); // Enable pre-flight for all routes

// Routes
app.use("/api/products", productsrouter);
app.use("/api/auth", userrouter);
app.use("/api/cart", cartrouter);

app.get('/', (req, res) => {
    res.send("This is the products page.");
});

// Check if MongoDB URL is defined
if (!process.env.mongoURL) {
    console.error("Error: mongoURL is not defined in .env");
    process.exit(1);
}

// Connect to the database
db.mongoose
    .connect(process.env.mongoURL)
    .then(() => {
        console.log("Connected to the database!");
        // Start server after successful DB connection
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Cannot connect to the database!", err);
        process.exit(1);
    });
