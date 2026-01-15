// Import Express (ESM)
import express from "express";

// Initialize Express app
const app = express();

// Define port
const PORT = 3000;

// Routes
app.get("/home", (req, res) => {
  res.send("This is home page");
});

app.get("/contactus", (req, res) => {
  res.send("Contact us at contact@contact.com");
});

app.get("/about", (req, res) => {
  res.send("Welcome to the About page!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
