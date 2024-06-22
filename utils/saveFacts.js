/*
    This script is used to save the facts data to the MongoDB database.
    The script uses the mongoose package to connect to MongoDB.
    The script uses the Fact model to insert the data into MongoDB.
    The script uses the config file to get the MongoDB URI.
    The script logs the success or failure of the data insertion.
    The script closes the MongoDB connection after the data insertion.
*/
const mongoose = require("mongoose");
const Fact = require("../models/Fact");
const config = require("./config");

const facts = [
  {
    number: 1,
    title: "Late Bloomer",
    description:
      "Vincent van Gogh only started his painting career at the age of 27.",
  },
  {
    number: 2,
    title: "Short Career",
    description:
      "Despite his late start, Van Gogh was incredibly prolific, creating more than 2,100 artworks, including around 860 oil paintings, in just over a decade.",
  },
  {
    number: 3,
    title: "The Starry Night",
    description:
      "His most famous painting, The Starry Night, depicts the view outside his sanatorium room window at Saint-Rémy-de-Provence in France at night, although it was painted from memory during the day.",
  },
  {
    number: 4,
    title: "Self-Portraits",
    description:
      "Van Gogh painted over 30 self-portraits between 1886 and 1889, using them as a method of introspection.",
  },
  {
    number: 5,
    title: "Ear Incident",
    description:
      "In a well-known incident, Van Gogh cut off part of his own left ear. He did this after a quarrel with fellow artist Paul Gauguin and later presented the ear to a woman at a brothel both artists frequented.",
  },
  {
    number: 6,
    title: "Mental Health",
    description:
      "Van Gogh suffered from severe mental health issues throughout his life, including episodes of psychosis and depression.",
  },
  {
    number: 7,
    title: "Prolific Correspondent",
    description:
      "He was a prolific letter writer, especially to his brother Theo, with whom he shared over 800 letters that provide deep insights into his thoughts and theories on art.",
  },
  {
    number: 8,
    title: "Financial Struggles",
    description:
      "Despite his now legendary status, Van Gogh was not commercially successful during his lifetime and was financially supported by his brother Theo.",
  },
  {
    number: 9,
    title: "Color Vision",
    description:
      "Some scholars believe that Van Gogh might have had color vision impairment, which may have influenced his use of vivid and sometimes clashing colors.",
  },
  {
    number: 10,
    title: "Japanese Influence",
    description:
      "Van Gogh was influenced by Japanese art, and he collected hundreds of Japanese prints. The use of bright colors and bold lines in his work reflects this influence.",
  },
  {
    number: 11,
    title: "Death",
    description:
      "Van Gogh died at the age of 37 from a gunshot wound. It is widely accepted that he shot himself in the chest, although there are theories that the wound was accidental or inflicted by another person.",
  },
  {
    number: 12,
    title: "The Red Vineyard",
    description:
      "The only painting Van Gogh sold during his lifetime was The Red Vineyard, which was bought for 400 francs by the Belgian artist Anna Boch.",
  },
  {
    number: 13,
    title: "Yellow House",
    description:
      "In Arles, Van Gogh rented the Yellow House, where he dreamed of creating a community of artists living and working together.",
  },
  {
    number: 14,
    title: "Sunflowers",
    description:
      "His series of Sunflower paintings are some of his most famous works, intended to decorate Gauguin’s room in the Yellow House.",
  },
  {
    number: 15,
    title: "Impressionism and Beyond",
    description:
      "Though often associated with Post-Impressionism, Van Gogh's style evolved significantly, incorporating elements of Realism, Impressionism, and eventually leading to Expressionism.",
  },
  {
    number: 16,
    title: "Posthumous Fame",
    description:
      "A major turning point in his posthumous fame was the exhibition of 71 of his paintings in Paris in 1901, 11 years after his death.",
  },
  {
    number: 17,
    title: "Museum",
    description:
      "The Van Gogh Museum in Amsterdam, which opened in 1973, holds the largest collection of his paintings and drawings in the world.",
  },
  {
    number: 18,
    title: "Health Issues",
    description:
      "Apart from mental health problems, Van Gogh also suffered from physical ailments, including epilepsy and possibly bipolar disorder.",
  },
  {
    number: 19,
    title: "Poverty",
    description:
      "For much of his life, Van Gogh lived in poverty, often spending money on art supplies instead of food.",
  },
  {
    number: 20,
    title: "Letters to Theo",
    description:
      "His letters to his brother Theo provide a window into his soul and are considered great literature in their own right.",
  },
  {
    number: 21,
    title: "First Major Work",
    description:
      "His first major work was The Potato Eaters (1885), depicting a peasant family eating by lamplight.",
  },
  {
    number: 22,
    title: "Influences",
    description:
      "Van Gogh was influenced by many artists, including Rembrandt, Millet, and Hiroshige.",
  },
  {
    number: 23,
    title: "Auvers-sur-Oise",
    description:
      "He spent the last few months of his life in Auvers-sur-Oise under the care of Dr. Paul Gachet, who specialized in depression.",
  },
  {
    number: 24,
    title: "Dr. Gachet Portrait",
    description:
      "Van Gogh's portrait of Dr. Gachet was sold for $82.5 million in 1990, making it one of the most expensive paintings ever sold at that time.",
  },
  {
    number: 25,
    title: "Church at Auvers",
    description:
      "The Church at Auvers, where he depicted the local church with dramatic and expressive style, is one of his most famous paintings from his final months.",
  },
  {
    number: 26,
    title: "Nocturnal Scenes",
    description:
      "Van Gogh often painted nocturnal scenes, which were unusual at the time, and he wrote that he found the night more alive and richly colored than the day.",
  },
  {
    number: 27,
    title: "Thatched Cottages at Cordeville",
    description:
      "This painting from his last weeks shows his move towards greater abstraction and bold use of color.",
  },
  {
    number: 28,
    title: "Wheatfield with Crows",
    description:
      "This work, often interpreted as an ominous depiction with a sense of doom, is one of his most powerful and is thought to be one of his final paintings.",
  },
  {
    number: 29,
    title: "Unappreciated Genius",
    description:
      "During his lifetime, Van Gogh was considered a madman and a failure, and his genius was only recognized after his death.",
  },
  {
    number: 30,
    title: "Legacy",
    description:
      "Today, Vincent van Gogh is celebrated as a pioneer of modern art and his works are admired for their emotional depth and bold, dramatic expression.",
  },
];

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Save new facts
    await Fact.insertMany(facts);
    console.log("Facts have been saved");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
