require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection

const client = new MongoClient(process.env.MONGO_URI);

client
  .connect()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Endpoint
app.get("/api/check", async (req, res) => {
  try {
    // Dummy Query on MongoDB
    const result = await client.db().admin().listDatabases();
    res.status(200).json({ databases: result.databases });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
