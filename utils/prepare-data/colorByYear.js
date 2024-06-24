const fs = require("fs");
const path = require("path");

const colorsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/colors-by-year.json"), "utf-8")
);

function hexToRgb(hex) {
  // Convert hex color to RGB
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r, g, b) {
  // Convert RGB to hex color
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function averageColor(colors) {
  const sum = colors.reduce(
    (acc, hex) => {
      const { r, g, b } = hexToRgb(hex);
      acc.r += r;
      acc.g += g;
      acc.b += b;
      return acc;
    },
    { r: 0, g: 0, b: 0 }
  );

  // Calculate average
  const avg = {
    r: Math.round(sum.r / colors.length),
    g: Math.round(sum.g / colors.length),
    b: Math.round(sum.b / colors.length),
  };

  return rgbToHex(avg.r, avg.g, avg.b);
}

// Process colors data to find average colors
const averageColorsByYear = Object.keys(colorsData).reduce((acc, year) => {
  const colors = colorsData[year];
  acc[year] = averageColor(colors);
  return acc;
}, {});

console.log(averageColorsByYear);
