import axios from "axios";

const baseUrlPainting = "/api/paintings";
const baseUrlFacts = "/api/facts";
const baseUrlColors = "/api/colors";

export const getLocationsAndCount = () =>
  axios.get(`${baseUrlPainting}/locations`).then((res) => res.data);

export const getYearsAndCount = () =>
  axios.get(`${baseUrlPainting}/years`).then((res) => res.data);

export const getRandomFact = () =>
  axios.get(`${baseUrlFacts}/random`).then((res) => res.data);

export const getColors = () =>
  axios.get(`${baseUrlColors}`).then((res) => res.data);

export const getMapData = () => axios.get("").then((res) => res.data);