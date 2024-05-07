// server.js
import express from "express";
// import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("static")); // connected the frontend

app.get("/api/photos", async (req, res) => {
    const { solsInput } = req.query; // Retrieve solsInput from query parameters
    if (!solsInput || isNaN(solsInput)) {
        return res.status(400).json({ error: "Invalid solsInput. Please provide a number of sols." });
    }

    try {
        const apiKey = process.env.API_KEY;
        const apiURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solsInput}&api_key=${apiKey}`;
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Failed to fetch data from NASA API");
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching data from NASA API" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
