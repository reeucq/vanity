import axios from "axios";

const baseUrlPainting = "/api/paintings";
const baseUrlFacts = "/api/facts";
const baseUrlColors = "/api/colors";
const baseUrlQuotes = "/api/quotes";

export const getPainting = (id) =>
  axios.get(`${baseUrlPainting}/${id}`).then((res) => res.data);

export const generateAIDescription = (id) =>
  axios
    .post(`${baseUrlPainting}/${id}/generate-description`)
    .then((res) => res.data);

export const filterPaintings = (location, year) =>
  axios
    .get(`${baseUrlPainting}/filter?location=${location}&year=${year}`)
    .then((res) => res.data);

export const searchPaintings = (query) =>
  axios.get(`${baseUrlPainting}/search?query=${query}`).then((res) => res.data);

export const getLocationsAndCount = () =>
  axios.get(`${baseUrlPainting}/locations`).then((res) => res.data);

export const getYearsAndCount = () =>
  axios.get(`${baseUrlPainting}/years`).then((res) => res.data);

export const getRandomFact = () =>
  axios.get(`${baseUrlFacts}/random`).then((res) => res.data);

export const getColors = () =>
  axios.get(`${baseUrlColors}`).then((res) => res.data);

export const getRandomQuote = () =>
  axios.get(`${baseUrlQuotes}/random`).then((res) => res.data);

export const getMapData = () =>
  axios
    .get("https://raw.githubusercontent.com/reeucq/vanity/main/data/map.json")
    .then((res) => res.data);
