import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file
dotenv.config();

const app = express();
// Convert file URL to a path for use with __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(express.json());

// Declare variables for MongoDB collections
let usernameCollection;
let pointsCollection;
// Create a MongoDB client instance using the connection URL from environment variables

const client = new MongoClient(process.env.MONGODB_URL);

// Connect to MongoDB and initialize collections
async function connectToMongo() {
  try {
    await client.connect();
    const db = client.db("Loading");
    usernameCollection = db.collection("username");
    pointsCollection = db.collection("points");
    console.log("Connected to MongoDB and collection is set");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongo().catch(console.error);

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  } else {
    next();
  }
});

// Handle POST requests to add usernames
app.post("/api/username", async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const { username } = req.body;
    if (!username) {
      res.status(400).send({ error: "Username is required" });
      return;
    }
    const existingUser = await usernameCollection.findOne({ username });
    if (existingUser) {
      console.log("Username already exists:", username);
      res.status(400).send({ error: "Username already exists" });
      return;
    }
    const result = await usernameCollection.insertOne({ username });
    console.log("Insert result:", result);
    res.status(201).send({ message: "Username added successfully" });
  } catch (error) {
    console.error("Error adding username:", error);
    res.status(500).send({ error: "Error adding username" });
  }
});

// Handle POST requests to add points
app.post("/api/add-points", async (req, res) => {
  try {
    const { username, points, choice, majorityChoice } = req.body;
    if (!username) {
      res.status(400).send({ error: "Username is required" });
      return;
    }
    if (!choice) {
      console.log("No choice was made");
      return;
    }

    if (!majorityChoice) {
      console.log("No majority choice was made");
      return;
    }
    console.log(`Updating points for ${username} by ${points}`);
    await pointsCollection.updateOne(
      { username },
      { $inc: { points } },
      { upsert: true },
    );
    res.status(200).send({ message: "Points updated successfully" });
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).send({ error: "Error updating points" });
  }
});

// Handle PUT requests to update points
app.put("/api/updatePoints", async (req, res) => {
  const { username, points: newPoints } = req.body;
  console.log("Received update request:", { username, points: newPoints });
  try {
    await pointsCollection.updateOne(
      { username },
      { $set: { points: newPoints } },
    );
    console.log("Points updated successfully");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).send({ error: "Error updating points" });
  }
});

// Handle GET requests to retrieve points
app.get("/api/get-points", async (req, res) => {
  const { username } = req.query;
  console.log(`Received request to get points for username: ${username}`);
  try {
    const user = await pointsCollection.findOne({ username });
    if (!user) {
      console.log(`User not found: ${username}`);
      res.status(404).json({ error: "User not found" });
      return;
    }
    console.log(`User found: ${username} with points: ${user.points}`);
    res.status(200).json({ points: user.points || 0 });
  } catch (error) {
    console.error("Error fetching points:", error);
    res.status(500).json({ error: "Error fetching points" });
  }
});

// Start the server on the port defined in environment or 3000 by default
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on port  http://localhost:${process.env.PORT || 3000}`,
  );
});
