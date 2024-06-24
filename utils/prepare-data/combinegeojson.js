const fs = require("fs");

// Read each GeoJSON file
const france = JSON.parse(
  fs.readFileSync("data/maps/gadm41_FRA_2.json", "utf8")
);
const belgium = JSON.parse(
  fs.readFileSync("data/maps/gadm41_BEL_2.json", "utf8")
);
const netherlands = JSON.parse(
  fs.readFileSync("data/maps/gadm41_NLD_2.json", "utf8")
);
const england = JSON.parse(
  fs.readFileSync("data/maps/gadm41_GBR_2.json", "utf8")
);

// Combine features from each country into a single GeoJSON object
const combinedGeoJSON = {
  type: "FeatureCollection",
  features: [
    ...france.features,
    ...belgium.features,
    ...netherlands.features,
    ...england.features,
  ],
};

// Write the combined GeoJSON to a new file
fs.writeFileSync("combined-countries.geojson", JSON.stringify(combinedGeoJSON));
