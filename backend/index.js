const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoDB = require("./db");

// ✅ Connect to MongoDB
mongoDB();

// ✅ Fix CORS issue: Allow requests from your Firebase-hosted frontend
app.use(
  cors({
    origin: ["https://foodiee-bb540.web.app"], // Allow Firebase frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies & authentication headers
  })
);

// ✅ Middleware
app.use(express.json()); // Allow JSON requests

// ✅ API Routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// ✅ Default Route (Test if backend is running)
app.get("/", (req, res) => {
  res.send("Backend is working properly!");
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
