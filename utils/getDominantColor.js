const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const ColorThief = require("color-thief-node");

// Initialize the object to hold colors by year
let colorsByYear = {
  1881: [],
  1882: [],
  1883: [],
  1884: [],
  1885: [],
  1886: [],
  1887: [],
  1888: [],
  1889: [],
  1890: [],
};

// Function to get the dominant color from an image
async function getDominantColor(imagePath) {
  try {
    return await ColorThief.getColorFromURL(imagePath);
  } catch (error) {
    console.error("Error getting dominant color:", error);
    return null; // Return null if there's an error (e.g., file not found)
  }
}

// Read and process the CSV file
function processPaintings(csvFilePath, imagesFolderPath) {
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      for (let painting of results) {
        const filename = painting.filename; // Adjust if your CSV has a different column name for filenames
        const year = painting.year; // Adjust if your CSV has a different column name for the year
        const imagePath = path.join(imagesFolderPath, filename);

        console.log(imagePath);
        const color = await getDominantColor(imagePath);
        if (color && colorsByYear[year]) {
          // Convert color from RGB array to a hex string if needed
          const colorHex = `#${color.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
          colorsByYear[year].push(colorHex);
        }
      }

      console.log(colorsByYear);
      // Optionally, write the results to a file
      fs.writeFileSync(
        "colors-by-year.json",
        JSON.stringify(colorsByYear, null, 2)
      );
    });
}

// Set the path to your CSV file and your images folder
const csvFilePath = "../data/paintings-data.csv"; // Path to your CSV file
const imagesFolderPath = "../data/paintings"; // Path to your images folder

// Call the function to process the paintings
processPaintings(
  path.join(__dirname, "../data/paintings-data.csv"),
  path.join(__dirname, "../data/paintings")
);
